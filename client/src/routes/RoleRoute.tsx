import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import type { RoleRouteProps } from "../types/types";

const RoleRoute: React.FC<RoleRouteProps> = ({ allowedRoles }) => {
  const role = useSelector((state: RootState) => state.auth.user?.role);

  if (!role) {
    return <Navigate to="/auth/login" />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
};

export default RoleRoute;
