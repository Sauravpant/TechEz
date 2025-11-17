import z from "zod";
import { createBookingRequestSchema, raiseBookingPriceSchema } from "../validators/booking.validators";

export type CreateBookingRequest=z.infer<typeof createBookingRequestSchema>
export type RaiseBookingPrice=z.infer<typeof raiseBookingPriceSchema>