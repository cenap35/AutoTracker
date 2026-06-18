import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ServiceLayout from "../layouts/ServiceLayout";

import ProtectedRoute from "../components/ProtectedRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import ConfirmEmailPage from "../pages/ConfirmEmailPage";

import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import ProductTourPage from "../pages/ProductTourPage";
import FAQPage from "../pages/FAQPage";
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsOfServicePage from "../pages/TermsOfServicePage";

import DashboardPage from "../pages/DashboardPage";
import VehiclesPage from "../pages/VehiclePage";
import VehicleDetailPage from "../pages/VehicleDetailPage";
import MaintenancePage from "../pages/MaintenancePage";
import ReportsPage from "../pages/ReportsPage";
import ReminderPage from "../pages/ReminderPage";
import AccountPage from "../pages/AccountPage";

import ServiceHomePage from "../pages/ServiceHomePage";
import ServiceDashboardPage from "../pages/ServiceDashboardPage";
import ServiceCustomersPage from "../pages/ServiceCustomersPage";
import ServiceCustomerDetailPage from "../pages/ServiceCustomerDetailPage";
import ServiceVehiclesPage from "../pages/ServiceVehiclesPage";
import ServiceVehicleDetailPage from "../pages/ServiceVehicleDetailPage";
import ServiceWorkOrdersPage from "../pages/ServiceWorkOrdersPage";
import ServiceWorkOrderDetailPage from "../pages/ServiceWorkOrderDetailPage";
import ServicePartsPage from "../pages/ServicePartsPage";
import ServiceSettingsPage from "../pages/ServiceSettingsPage";
import ServiceSetupPage from "../pages/ServiceSetupPage";
import ServiceUpgradePage from "../pages/ServiceUpgradePage";
import ServiceNotesPage from "../pages/ServiceNotesPage";

import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/confirm-email" element={<ConfirmEmailPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/product-tour" element={<ProductTourPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles"
          element={
            <ProtectedRoute>
              <VehiclesPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vehicles/:id"
          element={
            <ProtectedRoute>
              <VehicleDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/maintenance"
          element={
            <ProtectedRoute>
              <MaintenancePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <ReminderPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route
        path="/service"
        element={
          <ProtectedRoute>
            <ServiceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ServiceHomePage />} />
        <Route path="dashboard" element={<ServiceDashboardPage />} />
        <Route path="customers" element={<ServiceCustomersPage />} />
        <Route path="customers/:id" element={<ServiceCustomerDetailPage />} />

        <Route path="vehicles" element={<ServiceVehiclesPage />} />
        <Route path="vehicles/:id" element={<ServiceVehicleDetailPage />} />

        <Route path="work-orders" element={<ServiceWorkOrdersPage />} />
        <Route
          path="work-orders/:id"
          element={<ServiceWorkOrderDetailPage />}
        />

        <Route path="parts" element={<ServicePartsPage />} />
        <Route path="settings" element={<ServiceSettingsPage />} />
        <Route path="notes" element={<ServiceNotesPage />} />
      </Route>

      <Route
        path="/service/setup"
        element={
          <ProtectedRoute>
            <ServiceSetupPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/service-upgrade"
        element={
          <ProtectedRoute>
            <ServiceUpgradePage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
