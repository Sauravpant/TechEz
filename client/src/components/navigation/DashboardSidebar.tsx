import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Calendar, Zap, Star, Flag, Settings } from "lucide-react";

export interface DashboardNavItem {
  to: string;
  label: string;
  icon?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  layout: <LayoutDashboard className="h-4 w-4" />,
  calendar: <Calendar className="h-4 w-4" />,
  zap: <Zap className="h-4 w-4" />,
  star: <Star className="h-4 w-4" />,
  flag: <Flag className="h-4 w-4" />,
  settings: <Settings className="h-4 w-4" />,
};

export default function DashboardSidebar({ items }: { items: DashboardNavItem[] }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-[color:var(--surface)] backdrop-blur-xl p-3 shadow-lg sticky top-20">
      <div className="px-3 py-2.5 text-sm font-semibold tracking-tight">Dashboard</div>
      <div className="mt-1 flex flex-col gap-0.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === items[0]?.to}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-indigo-500/20 via-violet-500/10 to-cyan-500/10 text-foreground font-medium shadow-sm"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )
            }
          >
            {item.icon && iconMap[item.icon] && (
              <span className="opacity-70">{iconMap[item.icon]}</span>
            )}
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
