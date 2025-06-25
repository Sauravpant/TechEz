import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Otp from "../pages/SignUp/Otp";
import VerifyEmail from "../pages/SignUp/VerifyEmail";
import RegisterTechnician from "../pages/SignUp/RegsiterTechnician";
import RegisterIndividual from "../pages/SignUp/RegisterIndividual";
import RegisterBusiness from "../pages/SignUp/RegisterBusiness";
import LoginPage from "../pages/Login/Loginpage";
import Page from "../pages/admin/app/page";
import RegistrationPage from "../pages/SignUp/RegistrationPage";
import Notifications from "../pages/admin/pages/Notifications";
import UserLayout from "../components/layout/UserLayout";
import UserHomePage from "../pages/User/UserHomePage";
import Users from "../pages/admin/pages/Users";
import Business from "../pages/admin/pages/Business";
import Technicians from "../pages/admin/pages/Technicians";
import RoleRoute from "./RoleRoute";
import Unauthorized from "../pages/Unauthorized";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHomePage />}></Route>
        </Route>
        <Route path="/unauthorized" element={<Unauthorized />}></Route>
        <Route path="/auth/login" element={<LoginPage />}></Route>
        <Route path="/auth/signup" element={<RegistrationPage />}></Route>
        <Route path="/auth/signup/verify-email" element={<VerifyEmail />} />
        <Route path="/auth/signup/verify-otp" element={<Otp />} />
        <Route path="/auth/signup/individual" element={<RegisterIndividual />}></Route>
        <Route path="/auth/signup/business" element={<RegisterBusiness />}></Route>
        <Route path="/auth/signup/technician" element={<RegisterTechnician />}></Route>
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
            <Route path="business" element={<Business />} />
            <Route path="technicians" element={<Technicians />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
