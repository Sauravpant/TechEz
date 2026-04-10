import { LogOut, Wrench, LayoutDashboard, Settings, User as UserIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { logoutUser } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export default function DashboardTopbar() {
  const { user } = useSelector((s: RootState) => s.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent | Event) => {
    e.preventDefault();
    await dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  const getDashboardPath = () => {
    if (user?.role === "technician") return "/technician/dashboard";
    return "/user/dashboard";
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-[color:var(--surface)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-md shadow-indigo-500/20">
              <Wrench className="h-5 w-5" />
            </span>
            <span className="text-lg">TechEz</span>
          </Link>

          <div className="flex items-center gap-2">
            {user && (
              <div className="flex items-center gap-3 ml-2">
                <div className="hidden sm:block text-right">
                  <div className="text-sm font-medium leading-tight">{user.name}</div>
                  <div className="text-xs text-muted-foreground capitalize">{user.role}</div>
                </div>

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button className="h-10 w-10 rounded-full border-2 border-border/60 bg-card/70 backdrop-blur-xl overflow-hidden grid place-items-center transition-all hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                      {user.profilePictureUrl ? (
                        <img src={user.profilePictureUrl} alt="Profile" className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-sm font-semibold bg-gradient-to-br from-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                          {user.name?.slice(0, 1)?.toUpperCase() ?? "U"}
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
                        <div className="text-sm font-semibold">{user.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{user.email}</div>
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
                          to={getDashboardPath()}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <LayoutDashboard className="h-4 w-4 text-indigo-500" /> Dashboard
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          to={`${getDashboardPath()}/settings`}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <Settings className="h-4 w-4 text-cyan-500" /> Settings
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <Link
                          to={getDashboardPath()}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-muted/70 outline-none transition-colors"
                        >
                          <UserIcon className="h-4 w-4 text-violet-500" /> Account
                        </Link>
                      </DropdownMenu.Item>

                      <DropdownMenu.Separator className="my-1.5 h-px bg-border/60" />
                      <DropdownMenu.Item
                        onSelect={handleLogout}
                        className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-destructive/10 text-destructive outline-none cursor-pointer transition-colors"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
