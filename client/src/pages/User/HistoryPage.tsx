import { useState } from "react";
import toast from "react-hot-toast";
import { FaSearch, FaBolt, FaPaintRoller, FaTools, FaCalendarAlt, FaUserCog, FaStar, FaCheckCircle, FaRegStar, FaRegComment } from "react-icons/fa";
import { MdAir, MdPlumbing } from "react-icons/md";

interface ServiceHistoryItem {
  id: number;
  taskName: string;
  technician: string;
  date: string;
  price: number;
  category: string;
  rating: number;
  completed: boolean;
}

const HistoryPage = () => {
  const [serviceHistory, setServiceHistory] = useState<ServiceHistoryItem[]>([
    {
      id: 1,
      taskName: "Pipe Fixing",
      technician: "Suresh Sharma",
      date: "2025-06-12",
      price: 1500,
      category: "Plumbing",
      rating: 4.5,
      completed: false,
    },
    {
      id: 2,
      taskName: "Electrical Wiring",
      technician: "Rajesh Thapa",
      date: "2025-05-28",
      price: 2500,
      category: "Electrical",
      rating: 4.8,
      completed: true,
    },
    {
      id: 3,
      taskName: "AC Installation",
      technician: "Bikram Rai",
      date: "2025-05-15",
      price: 5000,
      category: "HVAC",
      rating: 4.2,
      completed: true,
    },
    {
      id: 4,
      taskName: "Wall Painting",
      technician: "Anil Gurung",
      date: "2025-04-22",
      price: 3500,
      category: "Painting",
      rating: 4.7,
      completed: true,
    },
    {
      id: 5,
      taskName: "Furniture Repair",
      technician: "Saurav Pant",
      date: "2025-03-18",
      price: 2800,
      category: "Carpentry",
      rating: 4.3,
      completed: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeReviewId, setActiveReviewId] = useState<number | null>(null);
  const [newRatings, setNewRatings] = useState<Record<number, number>>({});
  const [newReviews, setNewReviews] = useState<Record<number, string>>({});

  const handleReviewClick = (serviceId: number) => {
    setActiveReviewId(activeReviewId === serviceId ? null : serviceId);
  };

  const handleRatingChange = (serviceId: number, rating: number) => {
    setNewRatings((prev) => ({ ...prev, [serviceId]: rating }));
  };

  const handleReviewChange = (serviceId: number, text: string) => {
    setNewReviews((prev) => ({ ...prev, [serviceId]: text }));
  };

  const submitReview = (serviceId: number) => {
    const rating = newRatings[serviceId];
    const review = newReviews[serviceId] || "";
    toast.success("Review is submitted");
    console.log("Submitting review for service", serviceId, {
      rating,
      review,
    });

    // Update the service history with the new rating
    setServiceHistory((prev) => prev.map((service) => (service.id === serviceId ? { ...service, rating } : service)));

    // Reset the review state
    setActiveReviewId(null);
    setNewRatings((prev) => {
      const { [serviceId]: _, ...rest } = prev;
      return rest;
    });
    setNewReviews((prev) => {
      const { [serviceId]: _, ...rest } = prev;
      return rest;
    });
  };

  const filteredHistory = serviceHistory.filter(
    (service) =>
      (selectedCategory === "All" || service.category === selectedCategory) &&
      (service.technician.toLowerCase().includes(searchTerm.toLowerCase()) || service.taskName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Plumbing":
        return <MdPlumbing className="text-blue-500 text-2xl" />;
      case "Electrical":
        return <FaBolt className="text-amber-500 text-2xl" />;
      case "HVAC":
        return <MdAir className="text-teal-500 text-2xl" />;
      case "Painting":
        return <FaPaintRoller className="text-purple-500 text-2xl" />;
      default:
        return <FaTools className="text-gray-500 text-2xl" />;
    }
  };

  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/95 via-blue-50/95 to-purple-50/95"></div>
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-[120px] opacity-20 animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-200 rounded-full filter blur-[120px] opacity-20 animate-float-medium"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            Service History
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Review your completed services and technicians</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search services or technicians..."
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-gray-700 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="relative w-full md:w-48">
              <select
                className="appearance-none pl-4 pr-10 py-3 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white text-gray-700 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="HVAC">HVAC</option>
                <option value="Painting">Painting</option>
                <option value="Carpentry">Carpentry</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length > 0 ? (
          <div className="space-y-6">
            {filteredHistory.map((service) => (
              <div
                key={service.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg ${!service.completed ? "opacity-80" : ""}`}
              >
                <div className="p-6">
                  {/* Service Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100">{getCategoryIcon(service.category)}</div>
                      <div>
                        <h2 className="text-xl font-bold text-gray-800">{service.taskName}</h2>
                        <p className="text-gray-600 flex items-center gap-2">
                          <FaUserCog className="text-gray-400" />
                          {service.technician}
                        </p>
                      </div>
                    </div>

                    {service.completed ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <FaCheckCircle className="mr-1" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        In Progress
                      </span>
                    )}
                  </div>

                  {/* Service Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FaCalendarAlt className="text-gray-500" />
                      <span className="font-medium">{formatDate(service.date)}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <FaStar className="text-amber-400" />
                      <span className="font-medium">{service.rating}/5</span>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-lg">
                      <span className="font-bold text-blue-600">NPR {service.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Review Button and Review Box */}
                  {service.completed && (
                    <div className="mt-6">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleReviewClick(service.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all"
                        >
                          <FaRegComment />
                          {activeReviewId === service.id ? "Close Review" : "Rate & Review"}
                        </button>
                      </div>

                      {/* Review Box */}
                      {activeReviewId === service.id && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="mb-4">
                            <p className="text-gray-700 mb-2">Rate this service:</p>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  onClick={() => handleRatingChange(service.id, star)}
                                  className="text-2xl focus:outline-none transition-transform hover:scale-110"
                                >
                                  {star <= (newRatings[service.id] || 0) ? (
                                    <FaStar className="text-amber-400" />
                                  ) : (
                                    <FaRegStar className="text-amber-400" />
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <label htmlFor={`review-${service.id}`} className="block text-gray-700 mb-2">
                              Your review (optional):
                            </label>
                            <textarea
                              id={`review-${service.id}`}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all"
                              placeholder="Share your experience..."
                              value={newReviews[service.id] || ""}
                              onChange={(e) => handleReviewChange(service.id, e.target.value)}
                            ></textarea>
                          </div>

                          <button
                            onClick={() => submitReview(service.id)}
                            disabled={!newRatings[service.id]}
                            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow hover:shadow-md transition-all ${
                              !newRatings[service.id] ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            Submit Review
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-md">
            <div className="mx-auto max-w-md">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
                <FaSearch className="text-3xl text-blue-500" />
              </div>
              <h3 className="text-2xl font-medium text-gray-700 mb-3">No services found</h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory === "All" ? "Your service history will appear here" : `No ${selectedCategory.toLowerCase()} services found`}
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all font-medium">
                Book a Service
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
