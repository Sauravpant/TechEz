import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

export function ProtectedRoute({ allowedRole }: { allowedRole: string }) {
  const { isAuthenticated, user, checkingAuth } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (checkingAuth) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Spinner />
          <span className="text-sm">Checking session…</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  if (allowedRole !== user?.role) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
