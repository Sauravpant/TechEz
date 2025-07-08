import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaFileContract, FaHardHat, FaArrowRight, FaRegGem } from "react-icons/fa";
import { RiShieldCheckFill } from "react-icons/ri";

const ServicesPage = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-80 h-80 bg-blue-50 rounded-full blur-[100px] opacity-70"></div>
        <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] opacity-70"></div>
      </div>
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full">
            <RiShieldCheckFill className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">TRUSTED SERVICE PLATFORM</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
            How would you like to <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">connect with experts?</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Select your preferred service method below</p>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div
            onMouseEnter={() => setHoveredCard("post")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/services/post-job")}
            className={`relative bg-gradient-to-br from-white to-indigo-100 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${hoveredCard === "post" ? "ring-2 ring-blue-500/30" : ""}`}
          >
            <div className="absolute top-5 right-5">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                <FaRegGem className="text-xs" /> POPULAR
              </div>
            </div>

            <div className="p-8 h-full flex flex-col">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-xl border border-blue-200/50">
                  <FaFileContract className="text-blue-600 text-2xl" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900">Post a Problem</h3>
                  <p className="text-blue-600 font-medium mt-1">Get multiple offers</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Describe your needs and receive competitive offers from our top-rated professionals.
              </p>
              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Get started <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">50+ available professionals</span>
                </div>
              </div>
            </div>
          </div>
          <div
            onMouseEnter={() => setHoveredCard("tech")}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => navigate("/services/technicians")}
            className={`relative bg-gradient-to-br from-white to-indigo-100 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group ${hoveredCard === "tech" ? "ring-2 ring-indigo-500/30" : ""}`}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-start mb-6">
                <div className="bg-gradient-to-br from-indigo-100 to-indigo-50 p-4 rounded-xl border border-indigo-200/50">
                  <FaHardHat className="text-indigo-600 text-2xl" />
                </div>
                <div className="ml-6">
                  <h3 className="text-2xl font-bold text-gray-900">Browse Experts</h3>
                  <p className="text-indigo-600 font-medium mt-1">Direct booking</p>
                </div>
              </div>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Search our verified professionals by specialty, ratings, and availability to find match your need.
              </p>
              <div className="mt-auto">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-indigo-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Browse now <FaArrowRight className="ml-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <div className="text-sm text-gray-500">100+ professionals</div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-20 border-t border-gray-100">
          <div className="flex flex-wrap justify-center gap-8">
            {["24/7 Support", "Verified Professionals", "Satisfaction Guarantee"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-full">
                  <RiShieldCheckFill className="text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
