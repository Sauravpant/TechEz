import { FiCheck, FiX, FiUser, FiMapPin, FiClock, FiChevronDown, FiSearch } from "react-icons/fi";
import { useTheme } from "../../Context/ThemeContext";
interface HistoryItem {
  id: number;
  date: string;
  customer: string;
  address: string;
  service: string;
  status: "accepted" | "rejected" | "cancelled" | "pending";
}

interface StatusBadgeProps {
  status: "accepted" | "rejected" | "cancelled" | "pending";
}

const HistoryPage: React.FC = () => {
  const { darkMode } = useTheme();
  const historyItems: HistoryItem[] = [
    {
      id: 1,
      date: "1 Jun, 19:45",
      customer: "Samir Shrestha",
      address: "Balaju Height, Kathmandu",
      service: "Deep Cleaning",
      status: "accepted",
    },
    {
      id: 2,
      date: "2 Jun, 19:45",
      customer: "Saurav Pant",
      address: "Kalanki, Kathmandu",
      service: "Regular Cleaning",
      status: "rejected",
    },
    {
      id: 3,
      date: "3 Jun, 19:45",
      customer: "Swastika Dhakal",
      address: "Balaju Height, Kathmandu",
      service: "Window Cleaning",
      status: "cancelled",
    },
    {
      id: 4,
      date: "4 Jun, 19:45",
      customer: "Sneha Dhakal",
      address: "Balaju Height, Kathmandu",
      service: "Deep Cleaning",
      status: "accepted",
    },
    {
      id: 5,
      date: "1 Jun, 19:45",
      customer: "Samir Shrestha",
      address: "Balaju Height, Kathmandu",
      service: "Carpet Cleaning",
      status: "pending",
    },
  ];

  const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const config = {
      accepted: {
        icon: <FiCheck />,
        light: "bg-gradient-to-r from-emerald-400 to-teal-500 text-white",
        dark: "bg-gradient-to-r from-emerald-600 to-teal-700 text-emerald-100",
      },
      rejected: {
        icon: <FiX />,
        light: "bg-gradient-to-r from-rose-400 to-pink-500 text-white",
        dark: "bg-gradient-to-r from-rose-600 to-pink-700 text-rose-100",
      },
      cancelled: {
        icon: <FiX />,
        light: "bg-gradient-to-r from-gray-400 to-slate-500 text-white",
        dark: "bg-gradient-to-r from-gray-600 to-slate-700 text-gray-300",
      },
      pending: {
        icon: <div className="w-2 h-2 rounded-full bg-current" />,
        light: "bg-gradient-to-r from-amber-300 to-yellow-400 text-gray-800",
        dark: "bg-gradient-to-r from-amber-500/90 to-yellow-600/90 text-amber-100",
      },
    };

    const statusText: Record<StatusBadgeProps["status"], string> = {
      accepted: "Accepted",
      rejected: "You Rejected",
      cancelled: "User Cancelled",
      pending: "Pending",
    };

    return (
      <div
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
          darkMode ? config[status].dark : config[status].light
        } ${status === "pending" ? "animate-pulse" : ""}`}
      >
        {config[status].icon}
        <span className="ml-1.5">{statusText[status]}</span>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-br from-gray-50 to-blue-50 text-gray-900"
      }`}
    >
      <div className={`px-6 pt-6 pb-4 backdrop-blur-lg border-b ${darkMode ? "bg-gray-900/70 border-gray-700" : "bg-white/70 border-gray-200"}`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1
              className={`text-3xl font-bold bg-gradient-to-r ${
                darkMode ? "from-blue-400 to-purple-400" : "from-blue-600 to-purple-600"
              } bg-clip-text text-transparent`}
            >
              Service History
            </h1>
            <p className={`mt-1 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Track your completed and pending service requests</p>
          </div>
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
            </div>
            <input
              type="text"
              placeholder="Search history..."
              className={`block w-full pl-10 pr-3 py-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 ${
                darkMode
                  ? "bg-gray-800/70 border-gray-700 focus:ring-blue-500/50 text-white placeholder-gray-500"
                  : "bg-white/80 border-gray-200 focus:ring-blue-500 text-gray-900 placeholder-gray-400"
              }`}
            />
          </div>
        </div>
      </div>
      <div
        className={`px-6 py-4 border-b ${
          darkMode
            ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-gray-700"
            : "bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-gray-200"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Filter by status</label>
            <div className="relative">
              <select
                className={`block w-full pl-3 pr-10 py-2.5 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-800/70 border-gray-700 focus:ring-blue-500/50 text-white"
                    : "bg-white/80 border-gray-200 focus:ring-blue-500 text-gray-900"
                }`}
              >
                <option>All Statuses</option>
                <option>Accepted</option>
                <option>Rejected</option>
                <option>Cancelled</option>
                <option>Pending</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              </div>
            </div>
          </div>
          <div className="flex-1">
            <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Date range</label>
            <div className="relative">
              <select
                className={`block w-full pl-3 pr-10 py-2.5 rounded-xl shadow-sm appearance-none focus:outline-none focus:ring-2 ${
                  darkMode
                    ? "bg-gray-800/70 border-gray-700 focus:ring-blue-500/50 text-white"
                    : "bg-white/80 border-gray-200 focus:ring-blue-500 text-gray-900"
                }`}
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 24 hours</option>
                <option>Custom range</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <FiChevronDown className={`h-5 w-5 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glass Card Table */}
      <div className="px-6 py-6">
        <div
          className={`rounded-2xl overflow-hidden shadow-lg ${
            darkMode ? "bg-gray-900/70 border border-gray-700" : "bg-white/80 border border-gray-200"
          }`}
        >
          <table className="min-w-full divide-y divide-gray-200/50">
            <thead className={darkMode ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" : "bg-gradient-to-r from-blue-500/5 to-purple-500/5"}>
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-blue-300" : "text-blue-600"}`}
                >
                  <div className="flex items-center">
                    <FiClock className="mr-2" />
                    Date & Time
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-purple-300" : "text-purple-600"}`}
                >
                  <div className="flex items-center">
                    <FiUser className="mr-2" />
                    Customer
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}
                >
                  <div className="flex items-center">
                    <FiMapPin className="mr-2" />
                    Address
                  </div>
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Service
                </th>
                <th
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-medium uppercase tracking-wider ${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className={`divide-y ${darkMode ? "divide-gray-700/50" : "divide-gray-200/30"}`}>
              {historyItems.map((item) => (
                <tr key={item.id} className={`transition-colors duration-150 ${darkMode ? "hover:bg-gray-800/50" : "hover:bg-white/70"}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`flex items-center ${darkMode ? "text-gray-100" : "text-gray-900"}`}>
                      <FiClock className={`mr-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`} />
                      <span className="font-medium">{item.date}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`font-medium ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{item.customer}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{item.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`${darkMode ? "text-gray-400" : "text-gray-600"}`}>{item.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
