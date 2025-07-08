import { useState } from "react";
import { FiCheck, FiX, FiMapPin, FiCalendar, FiClock, FiEdit2, FiDollarSign } from "react-icons/fi";

interface BookingDetails {
  name: string;
  contactNo: string;
  serviceType: string;
  description: string;
  priceOffered: number;
}

interface Request {
  id: number;
  requestDate: string;
  serviceDate: string;
  customer: string;
  address: string;
  price: number;
  status: "pending" | "accepted" | "declined" | "completed";
  service: string;
  bookingDetails: BookingDetails;
}

interface RequestCardProps {
  request: Request;
  darkMode: boolean;
  onStatusChange: (id: number, newStatus: "accepted" | "declined", price?: number) => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, darkMode, onStatusChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [revisedPrice, setRevisedPrice] = useState(request.price);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(request.status);

  const handleAccept = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStatus("accepted");
      onStatusChange(request.id, "accepted", revisedPrice);
    } finally {
      setIsSubmitting(false);
      setIsExpanded(false);
    }
  };

  const handleDecline = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setCurrentStatus("declined");
      onStatusChange(request.id, "declined");
    } finally {
      setIsSubmitting(false);
      setIsExpanded(false);
    }
  };

  const getStatusBadge = () => {
    const baseClasses = "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all";
    
    switch(currentStatus) {
      case "accepted":
        return (
          <span className={`${baseClasses} ${
            darkMode 
              ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-emerald-100 shadow-emerald-900/50 shadow-inner" 
              : "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-200/50 shadow-inner"
          }`}>
            <FiCheck className="text-sm" /> Accepted
          </span>
        );
      case "declined":
        return (
          <span className={`${baseClasses} ${
            darkMode 
              ? "bg-gradient-to-r from-rose-600 to-pink-700 text-rose-100 shadow-rose-900/50 shadow-inner" 
              : "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-rose-200/50 shadow-inner"
          }`}>
            <FiX className="text-sm" /> Declined
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} ${
            darkMode 
              ? "bg-gradient-to-r from-amber-500/90 to-yellow-600/90 text-amber-100 shadow-amber-900/50 shadow-inner animate-pulse" 
              : "bg-gradient-to-r from-amber-300 to-yellow-400 text-gray-800 shadow-amber-200/50 shadow-inner animate-pulse"
          }`}>
            <div className="w-2 h-2 rounded-full bg-current"></div> Pending
          </span>
        );
    }
  };

  return (
    <div
      className={`group rounded-xl overflow-hidden transition-all duration-300 ${
        darkMode 
          ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700/50 hover:border-gray-600/70" 
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-200/80 hover:border-gray-300/90"
      } shadow-lg hover:shadow-xl`}
    >
      <div className="p-5">
        {/* Status Header */}
        <div className="flex justify-between items-center mb-4">
          {getStatusBadge()}
          <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
            REQ-{request.id.toString().padStart(3, "0")}
          </span>
        </div>

        {/* Customer Info */}
        <div className="mb-5">
          <h3 className={`text-lg font-semibold mb-1.5 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}>
            {request.customer}
          </h3>
          <div className={`flex items-start gap-2 text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}>
            <FiMapPin className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{request.address}</span>
          </div>
        </div>

        {/* Service Details */}
        <div className={`p-4 rounded-lg mb-5 backdrop-blur-sm ${
          darkMode 
            ? "bg-gray-700/30 border border-gray-600/30" 
            : "bg-gray-100/70 border border-gray-200/70"
        }`}>
          <div className="space-y-3">
            <div>
              <p className={`text-xs font-medium mb-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                SERVICE
              </p>
              <p className={`font-medium text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                {request.service}
              </p>
            </div>
            
            <div>
              <p className={`text-xs font-medium mb-1 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}>
                PRICE OFFERED
              </p>
              <p className={`font-medium text-sm ${
                darkMode ? "text-white" : "text-gray-900"
              }`}>
                NPR {request.price.toLocaleString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-gray-500/20">
              <div>
                <p className={`text-xs font-medium mb-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  REQUESTED
                </p>
                <div className="flex items-center gap-2">
                  <FiClock className={darkMode ? "text-gray-500" : "text-gray-500"} />
                  <span className={`font-medium text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {request.requestDate}
                  </span>
                </div>
              </div>

              <div>
                <p className={`text-xs font-medium mb-1 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  SCHEDULED
                </p>
                <div className="flex items-center gap-2">
                  <FiCalendar className={darkMode ? "text-gray-500" : "text-gray-500"} />
                  <span className={`font-medium text-sm ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {request.serviceDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {currentStatus === "pending" ? (
          <div className="flex gap-2.5">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-medium ${
                darkMode
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/40"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40"
              } transform hover:-translate-y-0.5`}
            >
              <FiEdit2 className="text-base" /> Review
            </button>
          </div>
        ) : (
          <div className="text-center py-2">
            <span className={`text-sm italic ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
              {currentStatus === "accepted" ? "Request accepted" : "Request declined"}
            </span>
          </div>
        )}

        {/* Expanded Booking Details */}
        {isExpanded && currentStatus === "pending" && (
          <div className={`mt-5 p-4 rounded-lg backdrop-blur-sm ${
            darkMode 
              ? "bg-gray-700/30 border border-gray-600/30" 
              : "bg-gray-100/70 border border-gray-200/70"
          }`}>
            <h4 className={`font-medium mb-3 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}>
              Booking Details
            </h4>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Name:</span>
                <span className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {request.bookingDetails.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Contact:</span>
                <span className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {request.bookingDetails.contactNo}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Service Type:</span>
                <span className={`font-medium ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {request.bookingDetails.serviceType}
                </span>
              </div>
              <div>
                <p className={darkMode ? "text-gray-400" : "text-gray-600"}>Description:</p>
                <p className={`font-medium mt-1 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}>
                  {request.bookingDetails.description}
                </p>
              </div>
              
              <div className="pt-3 border-t border-dashed border-gray-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className={darkMode ? "text-gray-400" : "text-gray-600"}>Price Offered:</span>
                  <span className={`font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}>
                    NPR {request.bookingDetails.priceOffered.toLocaleString()}
                  </span>
                </div>
                
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiDollarSign className={darkMode ? "text-gray-500" : "text-gray-500"} />
                  </div>
                  <input
                    type="number"
                    value={revisedPrice}
                    onChange={(e) => setRevisedPrice(Number(e.target.value))}
                    className={`w-full pl-8 pr-3 py-2 rounded-lg ${
                      darkMode 
                        ? "bg-gray-800/70 border-gray-700 text-white focus:ring-blue-500/50" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-blue-500/30"
                    } border focus:ring-2 focus:border-transparent`}
                    placeholder="Enter revised price"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2.5 mt-4">
              <button
                onClick={handleDecline}
                disabled={isSubmitting}
                className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-medium ${
                  darkMode
                    ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white shadow-lg shadow-red-900/30 hover:shadow-red-900/40"
                    : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/40"
                } transform hover:-translate-y-0.5 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <FiX className="text-base" /> {isSubmitting ? "Processing..." : "Decline"}
              </button>
              
              <button
                onClick={handleAccept}
                disabled={isSubmitting}
                className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all text-sm font-medium ${
                  darkMode
                    ? "bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white shadow-lg shadow-green-900/30 hover:shadow-green-900/40"
                    : "bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/40"
                } transform hover:-translate-y-0.5 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                <FiCheck className="text-base" /> {isSubmitting ? "Processing..." : "Accept"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;