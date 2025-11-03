import { Category, ICategory } from "../models/category.model";
import { Technician } from "../models/technician.model";
import { IUser } from "../models/user.model";
import { GetAllTechnicians, GetAllTechniciansFilter } from "../types/technician.types";

export const getAllTechnicians = async (filter: GetAllTechniciansFilter): Promise<GetAllTechnicians[]> => {
  //First Check if its in cache
  const limit = filter.limit ?? 10;
  const page = filter.page ?? 1;
  const skip = (page - 1) * limit;
  const filters: any = { "user.isDeactivated": false };

  if (filter.name) {
    filters["user.name"] = { $regex: filter.name, $options: "i" };
  }

  if (filter.category) {
    //Check if that category exists
    const categoryExists = await Category.findOne({ name: filter.category });
    if (!categoryExists) {
      return [];
    }
    filter.category = categoryExists._id.toString();
  }
  if (filter.experience) {
    filters.experience = { $gte: filter.experience };
  }
  if (filter.address) {
    filters["user.address"] = { $regex: filter.address, $options: "i" };
  }
  if (filter.verificationType) {
      filters.verificationType = filter.verificationType;
  }
  const technicians = await Technician.find(filters)
    .populate<{ user: IUser }>("user", "name address isVerified profilePictureUrl")
    .populate<{ category: ICategory }>("category", "name")
    .skip(skip)
    .limit(limit);
  return technicians.map((technicianInfo) => ({
    id: technicianInfo._id.toString(),
    name: technicianInfo.user.name,
    address: technicianInfo.user.address,
    isVerified: technicianInfo.user.isVerified,
    profilePictureUrl: technicianInfo.user.profilePictureUrl,
    experience: technicianInfo.experience,
    category: technicianInfo.category.name,
    bio: technicianInfo.bio,
    description: technicianInfo.description,
    registeredAt: technicianInfo.createdAt,
  }));
};
