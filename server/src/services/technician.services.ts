import { Category, ICategory } from "../models/category.model";
import { ITechnician, Technician } from "../models/technician.model";
import { IUser, User } from "../models/user.model";
import { GetAllTechnicians, GetAllTechniciansFilter, TechnicianDetails, UpdateTechnician } from "../types/technician.types";
import { redisClient } from "../configs/redis";
import { AppError } from "../utils/app-error";
import { Booking } from "../models/booking.model";
import { Review } from "../models/review.model";
import { TechnicianInfo } from "../types/auth.types";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary";

export const getAllTechniciansService = async (filter: GetAllTechniciansFilter): Promise<GetAllTechnicians> => {
  const limit = filter.limit ?? 10;
  const page = filter.page ?? 1;
  const skip = (page - 1) * limit;

  const cacheKey = `technicians:${JSON.stringify({ ...filter, page, limit })}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    const cachedString = typeof cachedData === "string" ? cachedData : cachedData.toString();
    return JSON.parse(cachedString) as GetAllTechnicians;
  }
  const filters: Record<string, any> = {};
  if (filter.category) {
    const categoryExists = await Category.findOne({ name: filter.category });
    if (!categoryExists) return { technicians: [], total: 0, page, limit, totalPages: 0 };
    filters.category = categoryExists._id;
  }

  if (filter.experience) filters.experience = { $gte: filter.experience };
  if (filter.verificationType) filters.verificationType = filter.verificationType;

  const userMatch: Record<string, any> = { isDeactivated: false };
  if (filter.name) userMatch.name = { $regex: filter.name, $options: "i" };
  if (filter.address) userMatch.address = { $regex: filter.address, $options: "i" };
  const technicians = await Technician.find(filters)
    .populate<{ user: IUser }>({
      path: "user",
      match: userMatch,
      select: "name address isVerified profilePictureUrl",
    })
    .populate<{ category: ICategory }>("category", "name")
    .skip(skip)
    .limit(limit)
    .lean();
  const total = await Technician.countDocuments(filters);
  const totalPages = Math.ceil(total / limit);
  const result = technicians.map((t) => ({
    id: t._id.toString(),
    name: t.user.name,
    address: t.user.address,
    isVerified: t.user.isVerified,
    profilePictureUrl: t.user.profilePictureUrl,
    experience: t.experience,
    category: t.category?.name,
    bio: t.bio,
    description: t.description,
    registeredAt: t.createdAt,
  }));

  const response: GetAllTechnicians = {
    technicians: result,
    total,
    page,
    limit,
    totalPages,
  };
  //Set the data in  redis cache for 5 minutes for subsequent requests
  await redisClient.set(cacheKey, JSON.stringify(response), { EX: 300 });

  return response;
};

export const getTechnicianByIdService = async (id: string): Promise<TechnicianDetails> => {
  const cacheKey = `technician:${id}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    const cachedResponse = typeof cachedData === "string" ? cachedData : cachedData.toString();
    return JSON.parse(cachedResponse) as TechnicianDetails;
  }
  const technician = await Technician.findById(id)
    .populate<{ user: IUser }>({
      path: "user",
      select: "name address isVerified profilePictureUrl",
    })
    .populate<{ category: ICategory }>("category", "name")
    .lean();

  if (!technician) throw new AppError(404, "Technician not found");

  const totalBookings = await Booking.countDocuments({
    technician: technician._id,
    status: "completed",
  });
  const reviewsData = await Review.aggregate([
    { $match: { technician: technician._id } },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "userInfo",
      },
    },
    { $unwind: "$userInfo" },
    {
      $group: {
        _id: "$technician",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
        reviews: {
          $push: {
            id: "$_id",
            rating: "$rating",
            comment: "$comment",
            createdAt: "$createdAt",
            user: {
              id: "$userInfo._id",
              name: "$userInfo.name",
              profilePictureUrl: "$userInfo.profilePictureUrl",
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        averageRating: { $ifNull: [{ $round: ["$averageRating", 1] }, 0] },
        totalReviews: { $ifNull: ["$totalReviews", 0] },
        reviews: { $ifNull: ["$reviews", []] },
      },
    },
  ]);

  const reviewSummary = reviewsData[0] ?? {
    averageRating: 0,
    totalReviews: 0,
    reviews: [],
  };
  console.log(reviewsData[0]);

  const response: TechnicianDetails = {
    id: technician._id.toString(),
    name: technician.user.name,
    address: technician.user.address,
    isVerified: technician.user.isVerified,
    profilePictureUrl: technician.user.profilePictureUrl,
    experience: technician.experience,
    category: technician.category?.name,
    bio: technician.bio,
    description: technician.description,
    registeredAt: technician.createdAt,
    totalBookings,
    averageRating: reviewSummary.averageRating,
    totalReviews: reviewSummary.totalReviews,
    reviews: reviewSummary.reviews,
  };

  //Set the data in  redis cache for 3 minutes for subsequent requests
  await redisClient.set(cacheKey, JSON.stringify(response), { EX: 180 });
  return response;
};

export const updateTechnicianProfileService = async (id: string, data: UpdateTechnician): Promise<TechnicianInfo> => {
  const userData: Partial<IUser> = {};
  if (data.name !== undefined) userData.name = data.name;
  if (data.address !== undefined) userData.address = data.address;
  if (data.phone !== undefined) userData.phone = data.phone;

  const technicianData: Partial<ITechnician> = {};
  if (data.experience !== undefined) technicianData.experience = data.experience;
  if (data.category !== undefined) {
    const categoryExists = await Category.findOne({ name: data.category });
    if (!categoryExists) {
      throw new AppError(400, "Invalid category");
    }
    technicianData.category = categoryExists._id;
  }
  if (data.bio !== undefined) technicianData.bio = data.bio;
  if (data.description !== undefined) technicianData.description = data.description;
  const technician = await Technician.findOne({ user: id });
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }
  const [userInfo, technicianInfo] = await Promise.all([
    User.findByIdAndUpdate(id, userData, { new: true }),
    Technician.findByIdAndUpdate(technician._id, technicianData, { new: true }).populate<{ category: ICategory }>("category", "name"),
  ]);

  await redisClient.del(`technician:${id}`);
  for await (const key of redisClient.scanIterator({ MATCH: "technicians:*" })) {
    if (key.length > 0) {
      await redisClient.del(key);
    }
  }
  const user = {
    id: userInfo._id.toString(),
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    profilePictureUrl: userInfo.profilePictureUrl,
    address: userInfo.address,
    role: userInfo.role,
    isVerified: userInfo.isVerified,
    isDeactivated: userInfo.isDeactivated,
    createdAt: userInfo.createdAt,
    updatedAt: userInfo.updatedAt,
  };
  const response: TechnicianInfo = {
    ...user,
    technicianId: technicianInfo?._id.toString(),
    user: technicianInfo.user.toString(),
    category: technicianInfo.category.name,
    experience: technicianInfo.experience,
    bio: technicianInfo.bio,
    description: technicianInfo.description,
    registrationNumber: technicianInfo.registrationNumber,
    documentUrl: technicianInfo.documentUrl,
    status: technicianInfo.status,
  };

  return response;
};

export const uploadVerificationDocumentService = async (userId: string, file: { fileBuffer: Buffer; fileName: string }): Promise<string> => {
  const technician = await Technician.findOne({ user: userId });
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }
  let imageUrl: string = null;
  if (!technician.documentPublicId) {
    const uploadResult = await uploadToCloudinary(file.fileBuffer, file.fileName);
    technician.documentPublicId = uploadResult.public_id;
    technician.documentUrl = uploadResult.secure_url;
    imageUrl = uploadResult.secure_url;
    await technician.save();
  } else {
    await deleteFromCloudinary(technician.documentPublicId);
    const uploadResult = await uploadToCloudinary(file.fileBuffer, file.fileName);
    technician.documentPublicId = uploadResult.public_id;
    technician.documentUrl = uploadResult.secure_url;
    imageUrl = uploadResult.secure_url;
    await technician.save();
  }
  return imageUrl;
};

export const deleteVerificationDocumentService = async (userId: string): Promise<void> => {
  const technician = await Technician.findOne({ user: userId });
  if (!technician) {
    throw new AppError(404, "Technician not found");
  }
  if (technician.documentPublicId) {
    await deleteFromCloudinary(technician.documentPublicId);
    technician.documentPublicId = null;
    technician.documentUrl = null;
    await technician.save();
  }
};
