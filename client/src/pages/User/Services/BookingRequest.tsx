import { useState } from "react";
import { FaSearch, FaFilter, FaStar, FaMapMarkerAlt, FaUserTie, FaClock, FaCheckCircle } from "react-icons/fa";
import techniciansData from "../../../data/data.json";
import TechnicianCard from "../components/TechnicianCard";
import { useNavigate } from "react-router-dom";

const BrowseTechniciansPage = () => {
  const categories = ["All", "Electrician", "Plumber", "HVAC Technician", "Painter", "Carpenter"];
  const locations = ["All", "Kathmandu", "Lalitpur", "Bhaktapur"];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);
  const navigate= useNavigate();
  const technicians = techniciansData;

  const filteredTechnicians = technicians
    .filter(
      (tech) =>
        (selectedCategory === "All" || tech.serviceType === selectedCategory) &&
        (selectedLocation === "All" || 
          tech.address.toLowerCase().includes(selectedLocation.toLowerCase())) &&
        tech.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "experience") return b.experience - a.experience;
      return 0;
    });

  const handleBookNow = (techId: number) => {
    navigate("/bookings/book-technician")
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
      {/* Premium background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-[120px] opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200 rounded-full filter blur-[120px] opacity-20 animate-float-medium"></div>
        <div className="absolute top-1/3 right-1/4 w-60 h-60 bg-amber-200 rounded-full filter blur-[100px] opacity-15 animate-float-fast"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-500 rounded-full filter blur-[80px] opacity-15"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500 rounded-full filter blur-[80px] opacity-15"></div>

          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 mb-4 relative z-10">
            Discover Skilled Technicians
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto relative z-10">
            Connect with Nepal's top service professionals
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-white/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 -z-0"></div>
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Premium Search Input */}
              <div className="relative flex-grow w-full">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search technicians by name..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all bg-white/95 text-gray-700 placeholder-gray-400 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Premium Category Select */}
              <div className="relative w-full md:w-auto">
                <select
                  className="appearance-none pl-4 pr-10 py-3.5 rounded-xl border border-gray-200/80 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all bg-white/95 text-gray-700 w-full shadow-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Premium Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md w-full md:w-auto ${
                  showFilters
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                    : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 hover:from-blue-200 hover:to-purple-200 shadow-sm"
                }`}
              >
                <FaFilter className={showFilters ? "text-white" : "text-blue-500"} />
                <span>Filters</span>
              </button>
            </div>

            {/* Premium Filter Panel */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 -z-0"></div>
                <div className="relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Sort Options */}
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2 text-lg">
                        <FaStar className="text-amber-400" />
                        <span>Sort Options</span>
                      </h3>
                      <div className="space-y-3">
                        {[
                          {
                            value: "rating",
                            label: "Highest Rating",
                            icon: <FaStar className="text-amber-400" />,
                          },
                          {
                            value: "experience",
                            label: "Most Experienced",
                            icon: <FaClock className="text-blue-400" />,
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setSortBy(option.value)}
                            className={`w-full flex items-center gap-4 px-5 py-3 rounded-xl text-left transition-all ${
                              sortBy === option.value
                                ? "bg-gradient-to-r from-blue-100/80 to-purple-100/80 border border-blue-200 text-blue-600 shadow-sm"
                                : "hover:bg-gray-50/80"
                            }`}
                          >
                            <span className="text-xl">{option.icon}</span>
                            <span className="font-medium">{option.label}</span>
                            {sortBy === option.value && (
                              <span className="ml-auto text-blue-500">
                                <FaCheckCircle />
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Location Filter */}
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2 text-lg">
                        <FaMapMarkerAlt className="text-red-400" />
                        <span>Location</span>
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {locations.map((location) => (
                          <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                              location === selectedLocation
                                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                                : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
                            }`}
                          >
                            {location}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
            <FaUserTie className="text-blue-500" />
            <span>
              {filteredTechnicians.length} {filteredTechnicians.length === 1 ? "Professional" : "Professionals"} Available
              {selectedLocation !== "All" && ` in ${selectedLocation}`}
            </span>
          </h2>
          <div className="text-sm text-gray-600 bg-white/90 px-3 py-1 rounded-full shadow-sm">
            Showing {Math.min(filteredTechnicians.length, 6)} of {technicians.length}
          </div>
        </div>

        {filteredTechnicians.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTechnicians.map((tech) => (
              <TechnicianCard key={tech.id} {...tech} onBookNow={() => handleBookNow(tech.id)} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-pink-100/30 -z-0"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full mb-6 shadow-inner">
                  <FaSearch className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-medium text-gray-700 mb-3">No professionals found</h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search criteria or location filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedLocation("All");
                    setShowFilters(false);
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 flex justify-between items-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-pink-100/50 backdrop-blur-sm">
          <div className="text-sm text-gray-600">28/06/2025</div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all">
              &lt;
            </button>
            <span className="px-3 py-1 bg-white/90 rounded-lg shadow-sm text-sm font-medium">
              1
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/90 shadow-sm hover:shadow-md transition-all">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseTechniciansPage;