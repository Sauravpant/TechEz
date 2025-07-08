import React from "react";
import { FaStar, FaMapMarkerAlt, FaCheckCircle, FaBolt, FaTools, FaTint } from "react-icons/fa";
import { GiElectricalResistance } from "react-icons/gi";

interface TechnicianCardProps {
  name: string;
  imageUrl?: string;
  rating: number;
  serviceType: string;
  address: string;
  experience: number;
  jobsCompleted: number;
  description?: string;
  onBookNow: () => void;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({
  name,
  imageUrl = "",
  rating,
  serviceType,
  address,
  experience,
  jobsCompleted,
  description = "Expert service with quality guarantee",
  onBookNow = () => console.log("Book Now clicked"),
}) => {
  const serviceIcons: { [key: string]: React.ReactNode } = {
    Electrician: <FaBolt className="text-yellow-400" />,
    Plumber: <FaTint className="text-blue-400" />,
    Technician: <FaTools className="text-gray-400" />,
    default: <GiElectricalResistance className="text-purple-400" />,
  };

  const serviceIcon = serviceIcons[serviceType] || serviceIcons.default;

  return (
    <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-gradient-to-br from-blue-50 via-purple-50 to-gray-50 border border-white/20">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 via-purple-200/10 to-pink-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10 h-full flex flex-col p-1">
        <div className="pt-8 px-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-70 group-hover:opacity-90 blur-md transition-all duration-500"></div>
            <img
              src={imageUrl || `https://source.unsplash.com/random/200x200/?portrait&${Math.random()}`}
              alt={name}
              className="relative w-24 h-24 rounded-full object-cover border-4 border-white z-10"
            />
          </div>
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm">
            <FaCheckCircle className="mr-1" />
            Verified Pro
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{name}</h3>
          <div className="flex items-center text-blue-600 font-medium mb-2">
            {serviceIcon}
            <span className="ml-2">{serviceType}</span>
          </div>
          <p className="text-gray-600 text-center text-sm mb-4 px-4">{description}</p>
        </div>
        <div className="px-6 py-4 grid grid-cols-2 gap-4 bg-white/30 backdrop-blur-sm rounded-lg mx-4 border border-white/20">
          <div className="flex flex-col items-center p-3 bg-white/40 rounded-lg">
            <span className="text-2xl font-bold text-gray-900">{experience}+</span>
            <span className="text-xs text-gray-600 uppercase tracking-wider">Years experience</span>
          </div>
          <div className="flex flex-col items-center p-3 bg-white/40 rounded-lg">
            <span className="text-2xl font-bold text-gray-900">{jobsCompleted}</span>
            <span className="text-xs text-gray-600 uppercase tracking-wider">Tasks completed</span>
          </div>
        </div>
        <div className="px-6 py-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="flex mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar key={i} className={`w-5 h-5 ${i < rating ? "text-amber-400" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <FaMapMarkerAlt className="mr-1 text-blue-400" />
              <span>{address}</span>
            </div>
          </div>
          <button
            onClick={onBookNow}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;
