import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Otp from "../pages/SignUp/Otp";
import VerifyEmail from "../pages/SignUp/VerifyEmail";
import RegisterTechnician from "../pages/SignUp/RegsiterTechnician";
import RegisterIndividual from "../pages/SignUp/RegisterIndividual";
import LoginPage from "../pages/Login/Loginpage";
import Page from "../pages/admin/app/page";
import RegistrationPage from "../pages/SignUp/RegistrationPage";
import Notifications from "../pages/admin/pages/Notifications";
import UserLayout from "../components/layout/UserLayout";
import UserHomePage from "../pages/User/UserHomePage";
import Users from "../pages/admin/pages/Users";
import Technicians from "../pages/admin/pages/Technicians";
import RoleRoute from "./RoleRoute";
import Unauthorized from "../pages/Unauthorized";
import TechnicianLayout from "../components/layout/TechnicianLayout";
import TechnicianHomePage from "../pages/technician/TechnicianHomePage";
import PendingRequests from "../pages/technician/PendingRequests";
import HistoryPage from "../pages/technician/HistoryPage";
import ServicesPage from "../pages/User/Services/Services";
import PostJobPage from "../pages/User/Services/PostBid";
import BrowseTechniciansPage from "../pages/User/Services/BookingRequest";
import UserHistoryPage from "../pages/User/HistoryPage";
import Bookings from "../pages/User/Bookings";
import BookingModel from "../pages/User/BookingRequestPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHomePage />}></Route>
          <Route path="services" element={<ServicesPage />}></Route>

          {/* Protected User routes */}
          <Route element={<RoleRoute allowedRoles="individual" />}>
            <Route path="/services/post-job" element={<PostJobPage />} />
            <Route path="/services/technicians" element={<BrowseTechniciansPage />} />
            <Route path="/history" element={<UserHistoryPage />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="/bookings/book-technician" element={<BookingModel />} />
          </Route>
        </Route>

        {/* Technician Routes */}
        <Route element={<RoleRoute allowedRoles="technician" />}>
          <Route path="/technician/dashboard" element={<TechnicianLayout />}>
            <Route index element={<TechnicianHomePage />}></Route>
            <Route path="pending-requests" element={<PendingRequests />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Route>

        {/* Authentication Routes */}
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/auth/login" element={<LoginPage />}></Route>
        <Route path="/auth/signup" element={<RegistrationPage />}></Route>
        <Route path="/auth/signup/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/signup/verify-otp" element={<Otp />} />
        <Route path="/auth/signup/individual" element={<RegisterIndividual />}></Route>
        <Route path="/auth/signup/technician" element={<RegisterTechnician />}></Route>

        {/* Admin Routes */}
        <Route element={<RoleRoute allowedRoles="admin" />}>
          <Route
            path="/admin/"
            element={
              <div className="dark">
                <Page />
              </div>
            }
          >
            <Route index element={<Notifications />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="users" element={<Users />} />
            <Route path="technicians" element={<Technicians />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
