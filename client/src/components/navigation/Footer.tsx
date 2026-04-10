import { Wrench } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[color:var(--surface)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-sm">
              <Wrench className="h-3.5 w-3.5" />
            </span>
            TechEz
          </Link>
          <div className="text-sm text-muted-foreground">© {new Date().getFullYear()} TechEz. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
