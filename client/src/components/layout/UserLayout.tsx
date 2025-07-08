import type React from "react";
import UserNavbar from "../navbars/UserNavbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default UserLayout;
