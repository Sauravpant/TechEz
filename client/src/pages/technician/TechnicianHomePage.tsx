import React from "react";
import ReviewCard from "./components/ReviewCard";
import { useTheme } from "../../Context/ThemeContext";

interface InfoFieldProps {
  label: string;
  value: string;
  darkMode: boolean;
}

interface StatCardProps {
  label: string;
  value: string;
  darkMode: boolean;
}

const TechnicianHomePage: React.FC = () => {
  const {darkMode} = useTheme();
  return (
    <div className={`overflow-auto h-full transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}>
      <div className="p-4 md:p-6 w-full max-w-[1800px] mx-auto">
        <header className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Technician Dashboard</h1>
            <p className={darkMode ? "text-gray-400" : "text-gray-500"}>Welcome back, Saurav</p>
          </div>
        </header>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div
            className={`rounded-xl p-4 md:p-6 col-span-full lg:col-span-2 transition-all 
            ${darkMode ? "bg-gray-800 border border-gray-700 shadow-lg" : "bg-white border border-gray-200 shadow-lg"}`}
          >
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-auto flex flex-col items-center">
                <div
                  className={`w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  } shadow-md mb-4`}
                >
                  <img
                    src="https://randomuser.me/api/portraits/men/10.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src =
                        "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22128%22%20height%3D%22128%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2264%22%20cy%3D%2264%22%20r%3D%2262%22%20fill%3D%22%234f46e5%22%2F%3E%3Ctext%20x%3D%2264%22%20y%3D%2270%22%20font-size%3D%2248%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3ESD%3C%2Ftext%3E%3C%2Fsvg%3E";
                    }}
                  />
                </div>
                <div className={`text-center ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  <p className="font-medium">Saurav Pant</p>
                  <p className="text-sm">Elite Technician</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 flex-1">
                <InfoField label="Registration Number" value="000000000000001" darkMode={darkMode} />
                <InfoField label="Pan No." value="123456" darkMode={darkMode} />
                <InfoField label="Name" value="Saurav Pant" darkMode={darkMode} />
                <InfoField label="Age" value="20" darkMode={darkMode} />
                <InfoField label="Address" value="Kalanki, Kathmandu" darkMode={darkMode} />
                <InfoField label="Contact No" value="9800000000" darkMode={darkMode} />
                <InfoField label="Date of Joining" value="11 June, 2025" darkMode={darkMode} />
                <InfoField label="Level" value="Elite" darkMode={darkMode} />
              </div>
            </div>

            <div className="mt-6">
              <h3 className={`text-sm font-medium mb-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Pan Card Details</h3>
              <div className={`border rounded-md p-3 w-full sm:w-48 ${darkMode ? "border-gray-700" : "border-gray-200"} shadow-sm`}>
                <div
                  className={`h-32 flex items-center justify-center rounded ${darkMode ? "bg-gray-700 text-gray-500" : "bg-gray-100 text-gray-400"}`}
                >
                  img08926385.png
                </div>
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl p-4 md:p-6 transition-all 
            ${darkMode ? "bg-gray-800 border border-gray-700 shadow-lg" : "bg-white border border-gray-200 shadow-lg"}`}
          >
            <h2 className={`text-lg font-semibold mb-4 ${darkMode ? "text-blue-400" : "text-blue-600"}`}>Professional Details</h2>
            <div className="space-y-4">
              <InfoField label="Specialization" value="Plumber" darkMode={darkMode} />
              <InfoField label="Experience" value="3 yrs" darkMode={darkMode} />

              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-4">
                <StatCard label="Accepted Customers" value="2000" darkMode={darkMode} />
                <StatCard label="Rejected Customers" value="550" darkMode={darkMode} />
                <StatCard label="Average Rating" value="4.9/5" darkMode={darkMode} />
                <StatCard label="Completed (%)" value="91%" darkMode={darkMode} />
              </div>
            </div>
          </div>
          <div
            className={`rounded-xl p-4 md:p-6 col-span-full transition-all 
            ${darkMode ? "bg-gray-800 border border-gray-700 shadow-xl" : "bg-white border border-gray-200 shadow-xl"}`}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h2 className={`text-xl md:text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"} mb-4 md:mb-0`}>Ratings & Reviews</h2>
              <div className={`px-3 py-1 rounded-full ${darkMode ? "bg-gray-700" : "bg-blue-50"} text-blue-500 font-medium shadow-sm`}>
                755 ratings
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="flex items-center">
                <div className={`text-4xl md:text-5xl font-bold mr-4 ${darkMode ? "text-white" : "text-gray-900"}`}>4.9</div>
                <div className="flex flex-col">
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-2xl">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Based on 755 reviews</span>
                </div>
              </div>
              <div className="flex-1 space-y-2 md:space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center">
                    <span className={`w-8 md:w-10 font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{stars} ★</span>
                    <div className={`flex-1 mx-2 h-2 md:h-2.5 rounded-full overflow-hidden ${darkMode ? "bg-gray-700" : "bg-gray-200"} shadow-inner`}>
                      <div
                        className={`h-full ${
                          stars === 5 ? "bg-green-500" : stars >= 4 ? "bg-blue-500" : stars >= 3 ? "bg-yellow-500" : "bg-red-500"
                        }`}
                        style={{ width: `${[82, 12, 4, 1, 1][5 - stars]}%` }}
                      ></div>
                    </div>
                    <span className={`w-8 md:w-10 text-right ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {[653, 63, 32, 28, 24][5 - stars]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 md:space-y-6">
              <ReviewCard darkMode={darkMode} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoField: React.FC<InfoFieldProps> = ({ label, value, darkMode }) => (
  <div className="break-words">
    <p className={`text-xs sm:text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</p>
    <p className={`text-sm sm:text-base font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>{value}</p>
  </div>
);

const StatCard: React.FC<StatCardProps> = ({ label, value, darkMode }) => (
  <div className={`rounded-lg p-2 md:p-3 transition-all ${darkMode ? "bg-gray-700" : "bg-blue-50"} shadow-sm`}>
    <p className={`text-xs ${darkMode ? "text-gray-300" : "text-blue-600"}`}>{label}</p>
    <p className={`font-bold text-sm md:text-base ${darkMode ? "text-white" : "text-gray-800"}`}>{value}</p>
  </div>
);

export default TechnicianHomePage;
