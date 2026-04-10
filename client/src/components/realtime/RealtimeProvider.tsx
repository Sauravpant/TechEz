import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import type { RootState } from "@/store/store";
import { connectSocket, disconnectSocket, getSocket } from "@/lib/socket";
import type { TechnicianUser } from "@/types/auth";

function getPayloadMessage(payload: unknown, fallback: string) {
  if (payload && typeof payload === "object" && "message" in payload) {
    const msg = (payload as { message?: unknown }).message;
    if (typeof msg === "string" && msg.trim().length > 0) return msg;
  }
  return fallback;
}

export default function RealtimeProvider({ children }: { children: React.ReactNode }) {
  const qc = useQueryClient();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      disconnectSocket();
      return;
    }

    const socket = connectSocket();

    const joinRooms = () => {
      if (user.role === "user") {
        socket.emit("joinUserRooom", { userId: user.id });
      }
      if (user.role === "technician") {
        const t = user as TechnicianUser;
        if (t.technicianId && t.category) {
          socket.emit("joinTechnicianRoom", { technicianId: t.technicianId, category: t.category });
        }
      }
    };

    socket.on("connect", joinRooms);

    const invalidateBookings = () => {
      qc.invalidateQueries({ queryKey: ["userBookings"] });
      qc.invalidateQueries({ queryKey: ["technicianBookings"] });
    };

    const onNewBookingRequest = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "New booking request"));
      invalidateBookings();
    };
    const onBookingPriceUpdated = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "Booking price updated"));
      invalidateBookings();
    };
    const onUserAgreement = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "User agreed to price"));
      invalidateBookings();
    };
    const onBookingAccepted = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "Booking accepted"));
      invalidateBookings();
    };
    const onBookingCompleted = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "Booking completed"));
      invalidateBookings();
    };
    const onBookingCancelled = (payload: unknown) => {
      toast.message(getPayloadMessage(payload, "Booking cancelled"));
      invalidateBookings();
    };

    socket.on("newBookingRequest", onNewBookingRequest);
    socket.on("bookingPriceUpdated", onBookingPriceUpdated);
    socket.on("userAgreement", onUserAgreement);
    socket.on("bookingAccepted", onBookingAccepted);
    socket.on("bookingCompleted", onBookingCompleted);
    socket.on("bookingCancelled", onBookingCancelled);

    joinRooms();

    return () => {
      const s = getSocket();
      s.off("connect", joinRooms);
      s.off("newBookingRequest", onNewBookingRequest);
      s.off("bookingPriceUpdated", onBookingPriceUpdated);
      s.off("userAgreement", onUserAgreement);
      s.off("bookingAccepted", onBookingAccepted);
      s.off("bookingCompleted", onBookingCompleted);
      s.off("bookingCancelled", onBookingCancelled);
    };
  }, [isAuthenticated, qc, user]);

  return <>{children}</>;
}

