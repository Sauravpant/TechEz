import { FiUser, FiClock, FiCalendar, FiCheck, FiX, FiSearch } from "react-icons/fi";

interface Technician {
  id: number;
  name: string;
  age: number;
  experience: string;
  requestedDate: string;
  specialization: string;
  status: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
}

const Technicians: React.FC = () => {
  const technicians: Technician[] = [
    {
      id: 1,
      name: "Swastika Dhakal",
      age: 22,
      experience: "3 years",
      requestedDate: "15 Jun, 2023",
      specialization: "Plumbing",
      status: "pending",
    },
    {
      id: 2,
      name: "Samir Shrestha",
      age: 28,
      experience: "5 years",
      requestedDate: "12 Jun, 2023",
      specialization: "Electrical",
      status: "pending",
    },
    {
      id: 3,
      name: "Saurav Pant",
      age: 25,
      experience: "4 years",
      requestedDate: "10 Jun, 2023",
      specialization: "Carpentry",
      status: "pending",
    },
    {
      id: 4,
      name: "Sneha Dhakal",
      age: 24,
      experience: "2 years",
      requestedDate: "8 Jun, 2023",
      specialization: "Painting",
      status: "pending",
    },
    {
      id: 5,
      name: "Ramesh Kumar",
      age: 30,
      experience: "6 years",
      requestedDate: "5 Jun, 2023",
      specialization: "AC Repair",
      status: "pending",
    },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gray-900 text-gray-100 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold">Technician Verifications</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <FiUser className="inline" /> Admin Dashboard
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search technicians..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Requests" value="24" icon={<FiClock className="text-blue-400" />} trend="↑ 3 this week" />
        <StatCard title="Pending" value="18" icon={<FiClock className="text-yellow-400" />} trend="↑ 2 this week" />
        <StatCard title="Approved" value="5" icon={<FiCheck className="text-green-400" />} trend="→ steady" />
        <StatCard title="Rejected" value="1" icon={<FiX className="text-red-400" />} trend="↓ 1 this week" />
      </div>
      <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 font-medium">
          <div className="col-span-3">Technician</div>
          <div className="col-span-2">Age</div>
          <div className="col-span-2">Experience</div>
          <div className="col-span-2">Specialization</div>
          <div className="col-span-2">Request Date</div>
          <div className="col-span-1">Actions</div>
        </div>
        {technicians.map((tech) => (
          <div key={tech.id} className="grid grid-cols-12 gap-4 p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors">
            <div className="col-span-3 font-medium flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <FiUser className="text-gray-400" />
              </div>
              {tech.name}
            </div>
            <div className="col-span-2 text-gray-300">{tech.age} years</div>
            <div className="col-span-2 text-gray-300">{tech.experience}</div>
            <div className="col-span-2 text-gray-300">{tech.specialization}</div>
            <div className="col-span-2 text-gray-400 flex items-center gap-2">
              <FiCalendar className="inline" /> {tech.requestedDate}
            </div>
            <div className="col-span-1 flex gap-2">
              <button className="p-1.5 bg-green-900 hover:bg-green-800 rounded-md text-green-300">
                <FiCheck />
              </button>
              <button className="p-1.5 bg-red-900 hover:bg-red-800 rounded-md text-red-300">
                <FiX />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6">
        <div className="text-gray-400">Showing 1 to 5 of 24 technicians</div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md">Previous</button>
          {[1, 2, 3, "...", 5].map((item, index) => (
            <button key={index} className={`px-3 py-1.5 rounded-md ${item === 1 ? "bg-blue-600 text-white" : "bg-gray-800 hover:bg-gray-700"}`}>
              {item}
            </button>
          ))}
          <button className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md">Next</button>
        </div>
      </div>
    </div>
  );
};

// Reusable Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <div className="bg-gray-800 p-4 rounded-lg border-l-4 border-blue-500">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-2 bg-gray-700 rounded-lg">{icon}</div>
    </div>
    <p className="text-xs mt-2 text-gray-400">{trend}</p>
  </div>
);

export default Technicians;
