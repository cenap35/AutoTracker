import { Routes, Route } from "react-router-dom";
import "./styles/global.css";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VehiclesPage from "./pages/VehiclePage";
import VehicleDetailPage from "./pages/VehicleDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import Footer from "./components/Footer";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import MaintenancePage from "./pages/MaintenancePage";
import ReportsPage from "./pages/ReportsPage";
import ConfirmEmailPage from "./pages/ConfirmEmailPage";
import ReminderPage from "./pages/ReminderPage";
import AccountPage from "./pages/AccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorBoundary from "./components/ErrorBoundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProductTourPage from "./pages/ProductTourPage";
import PageBackground from "./components/PageBackground";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import ServiceDashboardPage from "./pages/ServiceDashboardPage";
import ServiceLayout from "./layouts/ServiceLayout";
import ServiceCustomersPage from "./pages/ServiceCustomersPage";
import ServiceVehiclesPage from "./pages/ServiceVehiclesPage";
import ServiceWorkOrdersPage from "./pages/ServiceWorkOrdersPage";
import ServiceCustomerDetailPage from "./pages/ServiceCustomerDetailPage";
import ServiceVehicleDetailPage from "./pages/ServiceVehicleDetailPage";
import ServiceWorkOrderDetailPage from "./pages/ServiceWorkOrderDetailPage";
import ServiceUpgradePage from "./pages/ServiceUpgradePage";
import ServiceSetupPage from "./pages/ServiceSetupPage";
import ServicePartsPage from "./pages/ServicePartsPage";
import ServiceSettingsPage from "./pages/ServiceSettingsPage";

function App() {
  return (
    <PageBackground>
      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <ScrollToTop />

          <ErrorBoundary>
            <Routes>
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

              <Route
                path="/terms-of-service"
                element={<TermsOfServicePage />}
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
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/service"
                element={
                  <ProtectedRoute>
                    <ServiceLayout />
                  </ProtectedRoute>
                }
              >
                <Route path="dashboard" element={<ServiceDashboardPage />} />
                <Route path="customers" element={<ServiceCustomersPage />} />
                <Route path="vehicles" element={<ServiceVehiclesPage />} />
                <Route path="work-orders" element={<ServiceWorkOrdersPage />} />
                <Route
                  path="customers/:id"
                  element={<ServiceCustomerDetailPage />}
                />
                <Route
                  path="vehicles/:id"
                  element={<ServiceVehicleDetailPage />}
                />
                <Route
                  path="work-orders/:id"
                  element={<ServiceWorkOrderDetailPage />}
                />
                <Route path="parts" element={<ServicePartsPage />} />
                <Route path="settings" element={<ServiceSettingsPage />} />
              </Route>

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
                path="/service-upgrade"
                element={
                  <ProtectedRoute>
                    <ServiceUpgradePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/service/setup"
                element={
                  <ProtectedRoute>
                    <ServiceSetupPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ErrorBoundary>
        </main>

        <Footer />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </PageBackground>
  );
}

export default App;
