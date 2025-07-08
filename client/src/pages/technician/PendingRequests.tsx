import { IoTimeOutline } from "react-icons/io5";
import RequestCard from "./components/RequestCard";
import { useTheme } from "../../Context/ThemeContext";

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
  status: string;
  service: string;
  bookingDetails: BookingDetails;
}

const PendingRequests: React.FC = () => {
  const { darkMode } = useTheme();

  const requests: Request[] = [
    {
      id: 1,
      requestDate: "1 Jun, 19:45",
      serviceDate: "3 Jun, 10:00-12:00",
      customer: "Samir Shrestha",
      address: "Balaju Height, Kathmandu",
      price: 2500,
      status: "pending",
      service: "Deep Cleaning",
      bookingDetails: {
        name: "Samir Shrestha",
        contactNo: "9841000001",
        serviceType: "Deep Cleaning",
        description: "Full apartment deep cleaning including kitchen and bathrooms",
        priceOffered: 2500,
      },
    },
    {
      id: 2,
      requestDate: "2 Jun, 14:30",
      serviceDate: "4 Jun, 13:00-14:30",
      customer: "Saurav Pant",
      address: "Kalanki, Kathmandu",
      price: 1800,
      status: "pending",
      service: "Regular Cleaning",
      bookingDetails: {
        name: "Saurav Pant",
        contactNo: "9841000002",
        serviceType: "Regular Cleaning",
        description: "Weekly cleaning service for 2BHK apartment",
        priceOffered: 1800,
      },
    },
    {
      id: 3,
      requestDate: "3 Jun, 09:15",
      serviceDate: "5 Jun, 15:00-18:00",
      customer: "Swastika Dhakal",
      address: "Star Hospital, Lalitpur",
      price: 3500,
      status: "pending",
      service: "Window Cleaning",
      bookingDetails: {
        name: "Swastika Dhakal",
        contactNo: "9841000003",
        serviceType: "Window Cleaning",
        description: "All exterior windows cleaning for 3-story building",
        priceOffered: 3500,
      },
    },
    {
      id: 4,
      requestDate: "4 Jun, 20:10",
      serviceDate: "6 Jun, 11:00-13:30",
      customer: "Sneha Dhakal",
      address: "Balaju Height, Kathmandu",
      price: 2200,
      status: "pending",
      service: "Deep Cleaning",
      bookingDetails: {
        name: "Sneha Dhakal",
        contactNo: "9841000004",
        serviceType: "Deep Cleaning",
        description: "Deep cleaning before moving into new apartment",
        priceOffered: 2200,
      },
    },
  ];

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      {/* Header */}
      <div className="p-6 pb-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Pending Requests</h1>
            <p className={`mt-2 text-sm text-black ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Review and manage incoming service requests</p>
          </div>
          <div
            className={`px-5 py-2.5 rounded-full flex items-center gap-2 ${darkMode ? "bg-gray-800 text-blue-400 border border-gray-700" : "bg-white text-blue-600 border border-gray-200"} font-medium shadow-sm`}
          >
            <IoTimeOutline className="text-lg" />
            <span>{requests.length} pending</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {requests.map((request) => (
            <RequestCard key={request.id} request={request} darkMode={darkMode} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PendingRequests;
