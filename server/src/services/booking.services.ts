import { io } from "../app";
import { Booking, IBooking } from "../models/booking.model";
import { Category, ICategory } from "../models/category.model";
import { ITechnician, Technician } from "../models/technician.model";
import { IUser } from "../models/user.model";
import { CreateBookingRequest, RaiseBookingPrice } from "../types/booking.types";
import { AppError } from "../utils/app-error";

const getTechnicianId = async (userId: string): Promise<string> => {
  try {
    const technician = await Technician.findOne({ user: userId });
    if (!technician) {
      throw new AppError(404, "Technician not found");
    }
    return technician._id.toString();
  } catch (err: any) {
    throw new AppError(500, "Internal Server Error");
  }
};

export const createManualBookingRequestService = async (userId: string, data: CreateBookingRequest): Promise<void> => {
  const technicianExists = await Technician.findById(data.technicianId);
  if (!technicianExists) {
    throw new AppError(400, "Technician not found");
  }
  const categoryExists = await Category.findOne({ name: data.category });
  if (!categoryExists) {
    throw new AppError(400, "Category doesnt exist");
  }
  if (technicianExists.category.toString() !== categoryExists._id.toString()) {
    throw new AppError(400, "Technician does not belong to the specified category");
  }
  const booking = await Booking.create({
    user: userId,
    technician: data.technicianId,
    category: categoryExists._id,
    title: data.title,
    description: data.description,
    initialPrice: data.initialPrice,
    location: data.location,
    status: "pending",
    bookingMethod: "manual",
  });

  const populatedBooking = await Booking.findById(booking._id)
    .populate<{ user: IUser }>("user", "_id name email phone profilePictureUrl")
    .populate<{ category: ICategory }>("category", "name");
  // Notify the technician about the new booking request in real-time
  const response = {
    id: populatedBooking._id.toString(),
    user: {
      id: populatedBooking.user._id.toString(),
      name: populatedBooking.user.name,
      email: populatedBooking.user.email,
      phone: populatedBooking.user.phone,
      profilePictureUrl: populatedBooking.user.profilePictureUrl,
    },
    technician: populatedBooking.technician.toString(),
    category: populatedBooking.category.name,
    title: populatedBooking.title,
    description: populatedBooking.description,
    initialPrice: populatedBooking.initialPrice,
    status: populatedBooking.status,
    userAgreement: populatedBooking.userAgreement,
    location: populatedBooking.location,
    bookingMethod: populatedBooking.bookingMethod,
    createdAt: populatedBooking.createdAt,
  };
  io.to(data.technicianId).emit("newBookingRequest", { message: "You have a new booking request", booking: response });
};

export const raiseManualBookingPriceService = async (user: string, data: RaiseBookingPrice): Promise<void> => {
  const bookingExists = await Booking.findById(data.bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  const technicianId = await getTechnicianId(user);
  if (bookingExists.technician.toString() !== technicianId) {
    throw new AppError(403, "You are not authorized to raise the price for this booking");
  }
  //Also set user agreement to false when technician raises the price
  const updatedBooking = await Booking.findByIdAndUpdate(
    data.bookingId,
    {
      finalPrice: data.finalPrice,
      userAgreement: false,
    },
    { new: true }
  )
    .populate<{ technician: ITechnician & { user: IUser } }>({
      path: "technician",
      select: "_id user",
      populate: {
        path: "user",
        select: "_id name email phone profilePictureUrl",
      },
    })
    .populate<{ category: ICategory }>("category", "name");
  const booking = {
    id: updatedBooking._id.toString(),
    user: updatedBooking.user.toString(),
    technician: {
      id: updatedBooking.technician._id.toString(),
      name: updatedBooking.technician.user.name,
      email: updatedBooking.technician.user.email,
      phone: updatedBooking.technician.user.phone,
      profilePictureUrl: updatedBooking.technician.user.profilePictureUrl,
    },
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    location: updatedBooking.location,
    finalPrice: updatedBooking.finalPrice,
    status: updatedBooking.status,
    userAgreement: updatedBooking.userAgreement,
    bookingMethod: updatedBooking.bookingMethod,
    createdAt: updatedBooking.createdAt,
  };

  // Notify the user about the price update in real-time
  console.log(booking.user.toString());
  io.to(booking.user.toString()).emit("bookingPriceUpdated", { message: "The booking price has been raised", booking });
};

export const acceptManualBookingService = async (user: string, bookingId: string): Promise<void> => {
  const bookingExists = await Booking.findById(bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  const technicianId = await getTechnicianId(user);
  if (bookingExists.technician.toString() !== technicianId) {
    throw new AppError(403, "You are not authorized to accept this booking");
  }
  //If the technician accepts the booking for initial price, set final price to initial price
  if (!bookingExists.finalPrice) {
    bookingExists.finalPrice = bookingExists.initialPrice;
    await bookingExists.save();
  }
  if (!bookingExists.userAgreement) {
    throw new AppError(400, "User has not agreed to the final price");
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: "accepted",
      userAgreement: true,
    },
    { new: true }
  )
    .populate<{ technician: ITechnician & { user: IUser } }>({
      path: "technician",
      select: "_id user",
      populate: { path: "user", select: "_id name email phone profilePictureUrl" },
    })
    .populate<{ category: ICategory }>("category", "name");
  const booking = {
    id: updatedBooking._id.toString(),
    user: updatedBooking.user.toString(),
    technician: {
      id: updatedBooking.technician._id.toString(),
      name: updatedBooking.technician.user.name,
      email: updatedBooking.technician.user.email,
      phone: updatedBooking.technician.user.phone,
      profilePictureUrl: updatedBooking.technician.user.profilePictureUrl,
    },
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    finalPrice: updatedBooking.finalPrice,
    location: updatedBooking.location,
    status: updatedBooking.status,
    bookingMethod: updatedBooking.bookingMethod,
    createdAt: updatedBooking.createdAt,
  };

  // Notify the user about the booking acceptance in real-time
  io.to(booking.user.toString()).emit("bookingAccepted", { message: "Your booking has been accepted", booking });
};

export const completeManualBookingService = async (user: string, bookingId: string): Promise<void> => {
  const bookingExists = await Booking.findById(bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  const technicianId = await getTechnicianId(user);
  if (bookingExists.technician.toString() !== technicianId) {
    throw new AppError(403, "You are not authorized to mark this booking as completed");
  }
  if (bookingExists.status !== "accepted") {
    throw new AppError(400, "Only accepted bookings can be marked as completed");
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: "completed",
      completedAt: new Date(),
      platformFee: bookingExists.finalPrice * 0.1, //10% platform fee
    },
    { new: true }
  )
    .populate<{ technician: ITechnician & { user: IUser } }>({
      path: "technician",
      select: "_id user",
      populate: { path: "user", select: "_id name email phone profilePictureUrl" },
    })
    .populate<{ category: ICategory }>("category", "name");
  const booking = {
    id: updatedBooking._id.toString(),
    user: updatedBooking.user.toString(),
    technician: {
      id: updatedBooking.technician._id.toString(),
      name: updatedBooking.technician.user.name,
      email: updatedBooking.technician.user.email,
      phone: updatedBooking.technician.user.phone,
      profilePictureUrl: updatedBooking.technician.user.profilePictureUrl,
    },
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    finalPrice: updatedBooking.finalPrice,
    location: updatedBooking.location,
    status: updatedBooking.status,
    bookingMethod: updatedBooking.bookingMethod,
  };

  // Notify the user about the booking completion in real-time
  io.to(booking.user.toString()).emit("bookingCompleted", { message: "Your booking has been completed", booking });
};

export const cancelBookingByTechnicianService = async (user: string, bookingId: string): Promise<void> => {
  const bookingExists = await Booking.findById(bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  const technicianId = await getTechnicianId(user);
  if (bookingExists.technician.toString() !== technicianId) {
    throw new AppError(403, "You are not authorized to cancel this booking");
  }
  if (bookingExists.status === "accepted" || bookingExists.status === "completed") {
    throw new AppError(400, "Accepted or completed bookings cannot be cancelled");
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: "cancelled",
    },
    { new: true }
  )
    .populate<{ technician: ITechnician & { user: IUser } }>({
      path: "technician",
      select: "_id user",
      populate: { path: "user", select: "_id name email phone profilePictureUrl" },
    })
    .populate<{ category: ICategory }>("category", "name");

  const booking = {
    id: updatedBooking._id.toString(),
    user: updatedBooking.user.toString(),
    technician: {
      id: updatedBooking.technician._id.toString(),
      name: updatedBooking.technician.user.name,
      email: updatedBooking.technician.user.email,
      phone: updatedBooking.technician.user.phone,
      profilePictureUrl: updatedBooking.technician.user.profilePictureUrl,
    },
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    finalPrice: updatedBooking.finalPrice,
    location: updatedBooking.location,
    status: updatedBooking.status,
    bookingMethod: updatedBooking.bookingMethod,
  };

  // Notify the user about the booking cancellation in real-time
  io.to(booking.user.toString()).emit("bookingCancelled", { message: "Your booking has been cancelled", booking });
};

export const userAgreementService = async (user: string, bookingId: string): Promise<void> => {
  const bookingExists = await Booking.findById(bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  if (bookingExists.user.toString() !== user) {
    throw new AppError(403, "You are not authorized to agree to this booking");
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      userAgreement: true,
    },
    { new: true }
  )
    .populate<{ user: IUser }>("user", "_id name email phone profilePictureUrl")
    .populate<{ category: ICategory }>("category", "name");
  const booking = {
    id: updatedBooking._id.toString(),
    user: {
      id: updatedBooking.user._id.toString(),
      name: updatedBooking.user.name,
      email: updatedBooking.user.email,
      phone: updatedBooking.user.phone,
      profilePictureUrl: updatedBooking.user.profilePictureUrl,
    },
    technician: updatedBooking.technician._id.toString(),
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    finalPrice: updatedBooking.finalPrice,
    location: updatedBooking.location,
    status: updatedBooking.status,
    bookingMethod: updatedBooking.bookingMethod,
    userAgreement: updatedBooking.userAgreement,
    createdAt: updatedBooking.createdAt,
  };

  // Notify the technician about the user agreement in real-time
  io.to(booking.technician.toString()).emit("userAgreement", { message: "User has agreed to the final price", booking });
};

export const cancelBookingByUserService = async (user: string, bookingId: string): Promise<void> => {
  const bookingExists = await Booking.findById(bookingId);
  if (!bookingExists) {
    throw new AppError(404, "Booking not found");
  }
  if (bookingExists.user.toString() !== user) {
    throw new AppError(403, "You are not authorized to cancel this booking");
  }
  if (bookingExists.status === "accepted" || bookingExists.status === "completed") {
    throw new AppError(400, "Accepted or completed bookings cannot be cancelled");
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    {
      status: "cancelled",
    },
    { new: true }
  )
    .populate<{ user: IUser }>("user", "_id name email phone profilePictureUrl")
    .populate<{ category: ICategory }>("category", "name");

  const booking = {
    id: updatedBooking._id.toString(),
    user: {
      id: updatedBooking.user._id.toString(),
      name: updatedBooking.user.name,
      email: updatedBooking.user.email,
      phone: updatedBooking.user.phone,
      profilePictureUrl: updatedBooking.user.profilePictureUrl,
    },
    technician: updatedBooking.technician._id.toString(),
    category: updatedBooking.category.name,
    title: updatedBooking.title,
    description: updatedBooking.description,
    initialPrice: updatedBooking.initialPrice,
    finalPrice: updatedBooking.finalPrice,
    location: updatedBooking.location,
    status: updatedBooking.status,
    bookingMethod: updatedBooking.bookingMethod,
  };
  // Notify the technician about the booking cancellation in real-time
  io.to(booking.user.id).emit("bookingCancelled", { message: "The booking has been cancelled by the user", booking });
};
