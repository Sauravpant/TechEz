import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { User, LayoutDashboard, Settings, LogOut, Wrench, Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Technicians", to: "/technicians" },
];

export default function UserNavbar() {
  const { isAuthenticated, user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border/60 bg-[color:var(--surface)] backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
                <Wrench className="h-5 w-5" />
              </span>
              <span className="text-lg">TechEz</span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  end={i.to === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-foreground bg-muted/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`
                  }
                >
                  {i.label}
                </NavLink>
              ))}
              {isAuthenticated && user?.role === "user" && (
                <NavLink
                  to="/bookings"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "text-foreground bg-muted/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`
                  }
                >
                  Bookings
                </NavLink>
              )}
            </nav>

            <div className="flex items-center gap-2">
              {!isAuthenticated ? (
                <>
                  <Button variant="ghost" onClick={() => navigate("/auth")} className="hidden sm:inline-flex">
                    Sign in
                  </Button>
                  <Button onClick={() => navigate("/auth")} className="shadow-md shadow-primary/20">
                    Get started
                  </Button>
                </>
              ) : (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="h-10 w-10 rounded-full border-2 border-border/60 bg-card/70 backdrop-blur-xl overflow-hidden grid place-items-center transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {user?.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                          {user?.name?.slice(0, 1)?.toUpperCase() ?? "U"}
                        </span>
                      )}
                    </button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      sideOffset={10}
                      align="end"
                      className="min-w-56 rounded-2xl border border-border/60 bg-[color:var(--popover)] backdrop-blur-xl shadow-xl shadow-black/10 p-2 animate-in fade-in-0 zoom-in-95"
                    >
                      <div className="px-3 py-2.5">
                        <div className="text-sm font-semibold">{user?.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{user?.email}</div>
                      </div>
                      <DropdownMenu.Separator className="my-1.5 h-px bg-border/60" />

                      <DropdownMenu.Item asChild>
                        <Link
                          to="/"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-emerald-500" /> Home
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/user/dashboard"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-indigo-500" /> Dashboard
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/user/dashboard/settings"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <Settings className="h-4 w-4 text-cyan-500" /> Settings
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          to="/user/dashboard"
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <User className="h-4 w-4 text-violet-500" /> Account
                        </Link>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="my-1.5 h-px bg-border/60" />
                      <DropdownMenu.Item
                        onSelect={async (e) => {
                          e.preventDefault();
                          await dispatch(logoutUser());
                          navigate("/", { replace: true });
                        }}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-destructive/10 text-destructive outline-none cursor-pointer transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              )}

              <button
                className="md:hidden h-10 w-10 rounded-lg grid place-items-center hover:bg-muted/60 transition-colors"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="h-px w-full bg-gradient-to-r from-indigo-500/0 via-indigo-500/60 to-cyan-500/0"
        initial={{ opacity: 0.4 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      />

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-border/60 bg-[color:var(--surface)] backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((i) => (
                <NavLink
                  key={i.to}
                  to={i.to}
                  end={i.to === "/"}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground bg-muted/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`
                  }
                >
                  {i.label}
                </NavLink>
              ))}
              {isAuthenticated && user?.role === "user" && (
                <NavLink
                  to="/bookings"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? "text-foreground bg-muted/70"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                    }`
                  }
                >
                  Bookings
                </NavLink>
              )}
              {!isAuthenticated && (
                <Button onClick={() => { navigate("/auth"); setMobileOpen(false); }} className="w-full mt-2">
                  Sign in
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
