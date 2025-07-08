import { FaUserCog, FaCalendarAlt, FaClock, FaCheck, FaTimes } from "react-icons/fa";

interface Booking {
  id: number;
  technicianName: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  initialPrice: number;
  revisedPrice: number | null;
  status: "sent" | "reviewed" | "accepted";
}

interface BookingCardProps {
  booking: Booking;
  onAccept?: (id: number) => void;
  onDecline?: (id: number) => void;
}

const getStatusGradient = (status: string) => {
  switch (status) {
    case "sent":
      return "from-blue-500 to-blue-600";
    case "reviewed":
      return "from-amber-500 to-amber-600";
    case "accepted":
      return "from-green-500 to-green-600";
    default:
      return "from-gray-500 to-gray-600";
  }
};

const BookingCard = ({ booking, onAccept, onDecline }: BookingCardProps) => {
  return (
    <div className="relative h-full rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Gradient Header */}
      <div className={`bg-gradient-to-r ${getStatusGradient(booking.status)} text-white p-5`}>
        <h2 className="text-xl font-bold">{booking.serviceType}</h2>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
            <FaUserCog className="text-white" />
          </div>
          <span>{booking.technicianName}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="bg-white p-5">
        {/* Schedule Info */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mr-3">
              <FaCalendarAlt />
            </div>
            <div>
              <p className="text-sm text-gray-500">Schedule Date</p>
              <p className="font-medium">
                {new Date(booking.scheduledDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 mr-3">
              <FaClock />
            </div>
            <div>
              <p className="text-sm text-gray-500">Time Slot</p>
              <p className="font-medium">{booking.scheduledTime}</p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100">
            <p className="text-sm text-blue-600 mb-1">Your Offer</p>
            <p className="text-xl font-bold text-blue-700">₹{booking.initialPrice.toLocaleString()}</p>
          </div>

          {booking.revisedPrice && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-100">
              <p className="text-sm text-amber-600 mb-1">Technician's Offer</p>
              <p className="text-xl font-bold text-amber-700">₹{booking.revisedPrice.toLocaleString()}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        {booking.status === "reviewed" && onAccept && onDecline && (
          <div className="flex space-x-3">
            <button
              onClick={() => onDecline(booking.id)}
              className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium flex items-center justify-center space-x-2 hover:shadow-md transition-all"
            >
              <FaTimes /> <span>Decline</span>
            </button>
            <button
              onClick={() => onAccept(booking.id)}
              className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-medium flex items-center justify-center space-x-2 hover:shadow-md transition-all"
            >
              <FaCheck /> <span>Accept</span>
            </button>
          </div>
        )}
      </div>

      {/* Status Ribbon */}
      <div className={`absolute top-4 right-0 px-4 py-1 text-xs font-bold text-white bg-gradient-to-r ${getStatusGradient(booking.status)}`}>
        {booking.status.toUpperCase()}
      </div>
    </div>
  );
};

export default BookingCard;
