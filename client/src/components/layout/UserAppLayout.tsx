import { Outlet } from "react-router-dom";
import UserNavbar from "@/components/navigation/UserNavbar";
import Footer from "@/components/navigation/Footer";

export default function UserAppLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <UserNavbar />
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
