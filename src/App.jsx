import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";
import { AdminLayout } from "./components/admin/AdminLayout";

// Public pages
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin pages
import { LoginPage } from "./pages/admin/LoginPage";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { MessagesPage } from "./pages/admin/MessagesPage";
import { TestimonialsAdminPage } from "./pages/admin/TestimonialsAdminPage";
import { PortfolioAdminPage } from "./pages/admin/PortfolioAdminPage";
import { ServicesAdminPage } from "./pages/admin/ServicesAdminPage";

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <div style={{ backgroundColor: "#050816", color: "#ffffff", minHeight: "100vh", width: "100%", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

// Admin layout wrapper with protection
const AdminPage = ({ children }) => (
  <ProtectedRoute>
    <AdminLayout>{children}</AdminLayout>
  </ProtectedRoute>
);

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ── Public Routes ─────────────────────────── */}
          <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
          <Route path="/services"  element={<PublicLayout><ServicesPage /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><PortfolioPage /></PublicLayout>} />
          <Route path="/contact"   element={<PublicLayout><ContactPage /></PublicLayout>} />

          {/* ── Admin Login ───────────────────────────── */}
          <Route path="/admin/login" element={<LoginPage />} />

          {/* ── Protected Admin Routes ────────────────── */}
          <Route path="/admin"                element={<AdminPage><DashboardPage /></AdminPage>} />
          <Route path="/admin/messages"       element={<AdminPage><MessagesPage /></AdminPage>} />
          <Route path="/admin/testimonials"   element={<AdminPage><TestimonialsAdminPage /></AdminPage>} />
          <Route path="/admin/portfolio"      element={<AdminPage><PortfolioAdminPage /></AdminPage>} />
          <Route path="/admin/services"       element={<AdminPage><ServicesAdminPage /></AdminPage>} />

          {/* ── 404 ──────────────────────────────────── */}
          <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
