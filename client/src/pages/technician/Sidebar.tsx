import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { FiMenu, FiX, FiUser, FiClock, FiStar, FiSettings, FiHelpCircle, FiPhone, FiMoon, FiSun } from "react-icons/fi";
import { CiLogout, CiMenuBurger } from "react-icons/ci";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../Context/ThemeContext";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  sidebarOpen: boolean;
  to?: string;
  onClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { darkMode, setDarkMode } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <div className={`transition-all duration-300 h-full ${sidebarOpen ? "w-74" : "w-20"} bg-[#4169E1] text-white shadow-xl fixed md:relative z-10`}>
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 absolute -right-12 top-4 bg-blue-600 rounded-md text-white">
        {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>
      <div className="p-4 flex items-center justify-between border-b border-blue-500">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="hidden md:block p-1 rounded-full text-blue-100 hover:bg-blue-500 transition-colors"
        >
          {sidebarOpen ? <CiMenuBurger size={20} /> : <FiMenu size={20} />}
        </button>
      </div>
      <div className="py-6 px-4 border-b border-blue-500">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-blue-700 flex items-center justify-center overflow-hidden border-2 border-white">
              <img
                src="https://randomuser.me/api/portraits/men/10.jpg"
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Ccircle%20cx%3D%2240%22%20cy%3D%2240%22%20r%3D%2238%22%20fill%3D%22%234f46e5%22%2F%3E%3Ctext%20x%3D%2240%22%20y%3D%2245%22%20font-size%3D%2230%22%20text-anchor%3D%22middle%22%20fill%3D%22white%22%3ESD%3C%2Ftext%3E%3C%2Fsvg%3E";
                }}
              />
            </div>
            {!sidebarOpen && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-700"></div>}
          </div>
          {sidebarOpen && (
            <div className="text-center">
              <h3 className="font-medium text-lg">Saurav Pant</h3>
              <p className="text-sm text-blue-200">saurav@gmail.com</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-4">
        <SidebarItem to="/technician/dashboard" icon={<FiUser />} text="Profile" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/technician/dashboard/pending-requests" icon={<FiClock />} text="Pending Request" sidebarOpen={sidebarOpen} />
        <SidebarItem to="/technician/dashboard/history" icon={<FiStar />} text="History" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<FiSettings />} text="Settings" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<FiHelpCircle />} text="Help" sidebarOpen={sidebarOpen} />
        <SidebarItem onClick={handleLogOutClick} icon={<CiLogout />} text="Log Out" sidebarOpen={sidebarOpen} />
        <SidebarItem icon={<FiPhone />} text="Support" sidebarOpen={sidebarOpen} />

        <div
          className="mx-2 mt-4 p-2 rounded-md flex items-center cursor-pointer bg-blue-500 hover:bg-blue-400 transition-colors"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun className="text-yellow-200" /> : <FiMoon className="text-blue-100" />}
          {sidebarOpen && <span className="ml-3 text-white">{darkMode ? "Light Mode" : "Dark Mode"}</span>}
        </div>
      </nav>
    </div>
  );
};

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, sidebarOpen, to, onClick }) => {
  const baseClasses = "flex items-center mx-2 p-3 rounded-md transition-all";

  if (to) {
    return (
      <NavLink
        to={to}
        end
        className={({ isActive }) => `${baseClasses} ${isActive ? "bg-blue-500 text-white" : "text-blue-100 hover:bg-blue-500 hover:bg-opacity-30"}`}
      >
        <span className="text-lg">{icon}</span>
        {sidebarOpen && <span className="ml-3 font-medium">{text}</span>}
      </NavLink>
    );
  }

  return (
    <div onClick={onClick} className={`${baseClasses} cursor-pointer hover:bg-blue-500 hover:bg-opacity-30`}>
      <span className="text-lg">{icon}</span>
      {sidebarOpen && <span className="ml-3 font-medium">{text}</span>}
    </div>
  );
};

export default Sidebar;
