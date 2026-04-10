import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "@/routes/ProtectedRoutes";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserAppLayout from "@/components/layout/UserAppLayout";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import TechnicianListPage from "@/pages/technicians/TechnicianListPage";
import TechnicianDetailsPage from "@/pages/technicians/TechnicianDetailsPage";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import UserOverviewPage from "@/pages/user/UserOverviewPage";
import BookingsHubPage from "@/pages/user/BookingsHubPage";
import NewBookingPage from "@/pages/user/NewBookingPage";
import BiddingDummyPage from "@/pages/user/BiddingDummyPage";
import UserReviewsPage from "@/pages/user/UserReviewsPage";
import UserReportsPage from "@/pages/user/UserReportsPage";
import NewReportPage from "@/pages/user/NewReportPage";
import UserSettingsPage from "@/pages/user/UserSettingsPage";
import TechnicianOverviewPage from "@/pages/technician/TechnicianOverviewPage";
import TechnicianBookingsPage from "@/pages/technician/TechnicianBookingsPage";
import TechnicianReviewsPage from "@/pages/technician/TechnicianReviewsPage";
import TechnicianReportsPage from "@/pages/technician/TechnicianReportsPage";
import TechnicianSettingsPage from "@/pages/technician/TechnicianSettingsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/user" element={<Navigate to="/" replace />} />
      <Route path="/user/technicians" element={<Navigate to="/technicians" replace />} />
      <Route path="/user/technicians/:technicianId" element={<Navigate to="/technicians/:technicianId" replace />} />

      <Route path="/user/booking" element={<Navigate to="/bookings" replace />} />
      <Route path="/user/dashboard/bookings" element={<Navigate to="/bookings" replace />} />
      <Route path="/user/dashboard/bookings/new" element={<Navigate to="/bookings/manual" replace />} />
      <Route path="/user/dashboard/bidding" element={<Navigate to="/bookings/live" replace />} />

      <Route element={<UserAppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/technicians" element={<TechnicianListPage />} />
        <Route path="/technicians/:technicianId" element={<TechnicianDetailsPage />} />

        <Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/bookings" element={<BookingsHubPage />} />
          <Route path="/bookings/manual" element={<NewBookingPage />} />
          <Route path="/bookings/live" element={<BiddingDummyPage />} />
        </Route>
      </Route>

      <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

      <Route element={<ProtectedRoute allowedRole="user" />}>
        <Route
          path="/user/dashboard"
          element={
            <DashboardLayout
              items={[
                { to: "/user/dashboard", label: "Overview", icon: "layout" },
                { to: "/user/dashboard/reviews", label: "Reviews", icon: "star" },
                { to: "/user/dashboard/reports", label: "Reports", icon: "flag" },
                { to: "/user/dashboard/settings", label: "Settings", icon: "settings" },
              ]}
            />
          }
        >
          <Route index element={<UserOverviewPage />} />
          <Route path="reviews" element={<UserReviewsPage />} />
          <Route path="reports" element={<UserReportsPage />} />
          <Route path="reports/new" element={<NewReportPage />} />
          <Route path="settings" element={<UserSettingsPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRole="technician" />}>
        <Route
          path="/technician/dashboard"
          element={
            <DashboardLayout
              items={[
                { to: "/technician/dashboard", label: "Overview", icon: "layout" },
                { to: "/technician/dashboard/bookings", label: "Bookings", icon: "calendar" },
                { to: "/technician/dashboard/reviews", label: "Reviews", icon: "star" },
                { to: "/technician/dashboard/reports", label: "Reports", icon: "flag" },
                { to: "/technician/dashboard/settings", label: "Settings", icon: "settings" },
              ]}
            />
          }
        >
          <Route index element={<TechnicianOverviewPage />} />
          <Route path="bookings" element={<TechnicianBookingsPage />} />
          <Route path="reviews" element={<TechnicianReviewsPage />} />
          <Route path="reports" element={<TechnicianReportsPage />} />
          <Route path="settings" element={<TechnicianSettingsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
