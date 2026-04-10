import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar, { type DashboardNavItem } from "@/components/navigation/DashboardSidebar";
import DashboardTopbar from "@/components/navigation/DashboardTopbar";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function DashboardLayout({ items }: { items: DashboardNavItem[] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-dvh">
      <DashboardTopbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-[color:var(--surface)] backdrop-blur-xl px-4 py-2.5 text-sm font-medium shadow-sm hover:bg-muted/60 transition-colors"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            Menu
          </button>
        </div>

        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mb-4 overflow-hidden"
            >
              <DashboardSidebar items={items} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
          <aside className="hidden lg:block">
            <DashboardSidebar items={items} />
          </aside>
          <section className="min-w-0">
            <Outlet />
          </section>
        </div>
      </div>
    </div>
  );
}
