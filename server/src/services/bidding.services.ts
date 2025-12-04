import { io } from "../app";
import { Bid } from "../models/bid.model";
import { Category } from "../models/category.model";
import { IUser } from "../models/user.model";
import { CreateBid, NewBid } from "../types/bidding.types";
import { AppError } from "../utils/app-error";

const getLiveBidsByCategory = async (categoryName: string) => {
  const category = await Category.findOne({ name: categoryName });
  if (!category) {
    throw new AppError(400, "Invalid category");
  }
  const bids = await Bid.find({ category: category._id, status: "open" }).populate("user", "name email");
};
export const createBidService = async (userId: string, bidInfo: CreateBid) => {
  const category = await Category.findOne({ name: bidInfo.category });
  if (!category) {
    throw new AppError(400, "Invalid category");
  }
  const data = await Bid.create({
    user: userId,
    title: bidInfo.title,
    category: category._id,
    offeredPrice: bidInfo.offeredPrice,
    description: bidInfo.description,
    status: "open",
  });
  const bid = await Bid.findById(data._id).populate<{ user: IUser }>("user", "_ id name email profilePictureUrl");
  const result: NewBid = {
    id: bid._id.toString(),
    user: {
      id: bid.user._id.toString(),
      name: bid.user.name,
      email: bid.user.email,
      profilePictureUrl: bid.user.profilePictureUrl,
    },
    title: bid.title,
    category: bidInfo.category,
    offeredPrice: bid.offeredPrice,
    description: bid.description,
    status: bid.status,
    createdAt: bid.createdAt,
    updatedAt: bid.updatedAt,
  };
  io.to(`bids:${category.name}`).emit("newBid", "A new bid has been created", result);
};
