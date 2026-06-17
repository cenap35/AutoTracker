import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import ErrorBoundary from "../components/ErrorBoundary";

function MainLayout() {
  return (
    <div className="app-shell">
      <Navbar />

      <main className="app-main">
        <ScrollToTop />

        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;