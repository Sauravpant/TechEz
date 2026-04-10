import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import type { AppDispatch, RootState } from "@/store/store";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/features/auth/authSlice";

const links = [
  { label: "Home", to: "/" },
  { label: "Technicians", to: "/technicians" },
  { label: "How it works", to: "/how-it-works" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onLogout = async () => {
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-3">
          <Link to="/" className="font-semibold tracking-tight text-lg">
            <span className="bg-gradient-to-r from-indigo-500 to-cyan-500 bg-clip-text text-transparent">TechEz</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  isActive ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground transition-colors"
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {!isAuthenticated ? (
              <>
                <Button variant="ghost" onClick={() => navigate("/auth/login")}>
                  Sign in
                </Button>
                <Button onClick={() => navigate("/auth/register")}>Create account</Button>
              </>
            ) : (
              <>
                <div className="hidden sm:block text-sm text-muted-foreground">
                  {user?.name} <span className="text-xs">({user?.role})</span>
                </div>
                {user?.role === "user" && (
                  <Button variant="outline" onClick={() => navigate("/user/dashboard")}>
                    Dashboard
                  </Button>
                )}
                {user?.role === "technician" && (
                  <Button variant="outline" onClick={() => navigate("/technician/dashboard")}>
                    Dashboard
                  </Button>
                )}
                {user?.role === "admin" && (
                  <Button variant="outline" onClick={() => navigate("/admin")}>
                    Admin
                  </Button>
                )}
                <Button variant="ghost" onClick={onLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

