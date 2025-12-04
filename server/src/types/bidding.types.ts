import z from "zod";
import { createBidSchema } from "../validators/bidding.validators";

export type CreateBid = z.infer<typeof createBidSchema>;

export interface NewBid {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    profilePictureUrl: string | null;
  };
  title: string;
  category: string;
  offeredPrice: number;
  description: string;
  status: "open" | "closed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}
