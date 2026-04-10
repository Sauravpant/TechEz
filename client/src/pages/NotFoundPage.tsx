import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] grid place-items-center px-3 py-10">
      <div className="text-center max-w-md">
        <div className="text-5xl font-semibold tracking-tight">404</div>
        <div className="mt-2 text-muted-foreground">This page doesn’t exist.</div>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/technicians">Browse technicians</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

