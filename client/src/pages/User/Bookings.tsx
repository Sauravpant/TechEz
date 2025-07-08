import { useState } from "react";
import { FaSearch, FaFilter } from "react-icons/fa";
import BookingCard from "./components/BookingCard";

type BookingStatus = "sent" | "reviewed" | "accepted" | "declined";

interface Booking {
  id: number;
  technicianName: string;
  serviceType: string;
  scheduledDate: string;
  scheduledTime: string;
  initialPrice: number;
  revisedPrice: number | null;
  status: BookingStatus;
}

const Bookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      technicianName: "Suresh Sharma",
      serviceType: "Plumbing",
      scheduledDate: "2025-07-15",
      scheduledTime: "10:00 AM - 12:00 PM",
      initialPrice: 11500,
      revisedPrice: null,
      status: "sent",
    },
    {
      id: 2,
      technicianName: "Rajesh Thapa",
      serviceType: "Electrical",
      scheduledDate: "2025-07-16",
      scheduledTime: "2:00 PM - 4:00 PM",
      initialPrice: 12000,
      revisedPrice: 12500,
      status: "reviewed",
    },
    {
      id: 3,
      technicianName: "Bikram Rai",
      serviceType: "HVAC",
      scheduledDate: "2025-07-17",
      scheduledTime: "11:00 AM - 1:00 PM",
      initialPrice: 15000,
      revisedPrice: 14500,
      status: "accepted",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<"all" | BookingStatus>("all");

  const handleAccept = (id: number) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "accepted" } : b)));
  };

  const handleDecline = (id: number) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "declined" } : b)));
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.technicianName.toLowerCase().includes(searchTerm.toLowerCase()) || booking.serviceType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">Service Bookings</h1>
          <p className="text-lg text-gray-600">Manage your requested and confirmed services</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search services or technicians..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200 bg-white shadow-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 appearance-none"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as "all" | BookingStatus)}
            >
              <option value="all">All Status</option>
              <option value="sent">Request Sent</option>
              <option value="reviewed">Offer Received</option>
              <option value="accepted">Confirmed</option>
            </select>
          </div>
        </div>

        {/* Booking Cards Grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onAccept={handleAccept} onDecline={handleDecline} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="mx-auto max-w-md">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                <FaSearch className="text-2xl text-blue-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No bookings found</h3>
              <p className="text-gray-500">{filterStatus === "all" ? "You don't have any active bookings" : `No ${filterStatus} bookings found`}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
