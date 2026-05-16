import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider }     from "./context/AuthContext";
import { SiteDataProvider } from "./context/SiteDataContext";
import { ProtectedRoute }   from "./components/admin/ProtectedRoute";
import { AdminLayout }      from "./components/admin/AdminLayout";

// Layout
import { Navbar }         from "./components/Navbar";
import { Footer }         from "./components/Footer";
import { ScrollToTop }    from "./components/ScrollToTop";
import { WhatsAppButton } from "./components/WhatsAppButton";

// Public pages
import { HomePage }            from "./pages/HomePage";
import { AboutPage }           from "./pages/AboutPage";
import { ServicesPage }        from "./pages/ServicesPage";
import { PortfolioPage }       from "./pages/PortfolioPage";
import { PortfolioDetailPage } from "./pages/PortfolioDetailPage";
import { PricingPage }         from "./pages/PricingPage";
import { ContactPage }         from "./pages/ContactPage";
import { NotFoundPage }        from "./pages/NotFoundPage";

// Admin pages
import { LoginPage }             from "./pages/admin/LoginPage";
import { DashboardPage }         from "./pages/admin/DashboardPage";
import { MessagesPage }          from "./pages/admin/MessagesPage";
import { TestimonialsAdminPage } from "./pages/admin/TestimonialsAdminPage";
import { PortfolioAdminPage }    from "./pages/admin/PortfolioAdminPage";
import { ServicesAdminPage }     from "./pages/admin/ServicesAdminPage";
import { AboutAdminPage }        from "./pages/admin/AboutAdminPage";
import { PricingAdminPage }      from "./pages/admin/PricingAdminPage";

const PublicLayout = ({ children }) => (
  <div style={{ backgroundColor: "#050816", color: "#ffffff", minHeight: "100vh", width: "100%", overflowX: "hidden", display: "flex", flexDirection: "column" }}>
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

const AdminPage = ({ children }) => (
  <ProtectedRoute>
    <AdminLayout>{children}</AdminLayout>
  </ProtectedRoute>
);

export default function App() {
  return (
    // SiteDataProvider wraps everything so both public + admin share the same data
    <SiteDataProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* ── Public ──────────────────────────────── */}
            <Route path="/"              element={<PublicLayout><HomePage /></PublicLayout>} />
            <Route path="/about"         element={<PublicLayout><AboutPage /></PublicLayout>} />
            <Route path="/services"      element={<PublicLayout><ServicesPage /></PublicLayout>} />
            <Route path="/portfolio"     element={<PublicLayout><PortfolioPage /></PublicLayout>} />
            <Route path="/portfolio/:id" element={<PublicLayout><PortfolioDetailPage /></PublicLayout>} />
            <Route path="/pricing"       element={<PublicLayout><PricingPage /></PublicLayout>} />
            <Route path="/contact"       element={<PublicLayout><ContactPage /></PublicLayout>} />

            {/* ── Admin Login ──────────────────────────── */}
            <Route path="/admin/login" element={<LoginPage />} />

            {/* ── Protected Admin ──────────────────────── */}
            <Route path="/admin"                element={<AdminPage><DashboardPage /></AdminPage>} />
            <Route path="/admin/messages"       element={<AdminPage><MessagesPage /></AdminPage>} />
            <Route path="/admin/testimonials"   element={<AdminPage><TestimonialsAdminPage /></AdminPage>} />
            <Route path="/admin/portfolio"      element={<AdminPage><PortfolioAdminPage /></AdminPage>} />
            <Route path="/admin/services"       element={<AdminPage><ServicesAdminPage /></AdminPage>} />
            <Route path="/admin/about"          element={<AdminPage><AboutAdminPage /></AdminPage>} />
            <Route path="/admin/pricing"        element={<AdminPage><PricingAdminPage /></AdminPage>} />

            {/* ── 404 ─────────────────────────────────── */}
            <Route path="*" element={<PublicLayout><NotFoundPage /></PublicLayout>} />
          </Routes>
        </Router>
      </AuthProvider>
    </SiteDataProvider>
  );
}
