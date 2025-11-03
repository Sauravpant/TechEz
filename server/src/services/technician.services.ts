import { Category, ICategory } from "../models/category.model";
import { Technician } from "../models/technician.model";
import { IUser } from "../models/user.model";
import { GetAllTechnicians, GetAllTechniciansFilter } from "../types/technician.types";
import { redisClient } from "../configs/redis";

export const getAllTechniciansService = async (filter: GetAllTechniciansFilter): Promise<GetAllTechnicians[]> => {
  const limit = filter.limit ?? 10;
  const page = filter.page ?? 1;
  const skip = (page - 1) * limit;

  const cacheKey = `technicians:${JSON.stringify({ ...filter, page, limit })}`;
  const cachedData = await redisClient.get(cacheKey);
  if (cachedData) {
    const cachedString = typeof cachedData === "string" ? cachedData : cachedData.toString();
    return JSON.parse(cachedString) as GetAllTechnicians[];
  }
  const filters: Record<string, any> = {};
  if (filter.category) {
    const categoryExists = await Category.findOne({ name: filter.category });
    if (!categoryExists) return [];
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

  //Set the data in  redis cache for 5 minutes for subsequent requests
  await redisClient.set(cacheKey, JSON.stringify(result), { EX: 300 });

  return result;
};

