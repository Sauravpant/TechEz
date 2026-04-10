import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCheckingAuthFalse, setUser } from "@/features/auth/authSlice";
import type { AppDispatch } from "@/store/store";
import { getSessionProfile } from "@/services/authServices";
import AppRoutes from "@/routes/AppRoutes";

export default function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const user = await getSessionProfile();
        dispatch(setUser(user));
      } catch {
        dispatch(setCheckingAuthFalse());
      }
    };
    bootstrap();
  }, [dispatch]);

  return <AppRoutes />;
}

