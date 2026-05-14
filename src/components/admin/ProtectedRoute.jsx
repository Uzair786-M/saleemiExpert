import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ─────────────────────────────────────────────────────────────
// PROTECTED ROUTE
// Checks two things:
//   1. User is authenticated (logged in)
//   2. User role === "admin"
//
// If either fails → redirect to /admin/login
// The original URL is saved so user lands back after login.
// ─────────────────────────────────────────────────────────────

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();

  // Still rehydrating session from localStorage
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#050816", gap: "1rem",
      }}>
        <div style={{
          width: "48px", height: "48px",
          border: "3px solid rgba(34,211,238,0.15)",
          borderTop: "3px solid #22d3ee",
          borderRadius: "9999px",
          animation: "spin 0.9s linear infinite",
        }} />
        <p style={{ color: "#6b7280", fontSize: "0.9rem" }}>Verifying session...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in at all → login page
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Logged in but not an admin → access denied page
  if (!isAdmin) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        backgroundColor: "#050816", textAlign: "center", padding: "2rem",
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🚫</div>
        <h1 style={{ color: "#ffffff", fontSize: "2rem", fontWeight: 900, marginBottom: "0.75rem" }}>
          Access Denied
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "1rem", marginBottom: "2rem", maxWidth: "24rem" }}>
          Your account does not have admin privileges. Please contact the site owner.
        </p>
        <a href="/" style={{
          padding: "12px 28px", backgroundColor: "#06b6d4", color: "#ffffff",
          borderRadius: "10px", textDecoration: "none", fontWeight: 700,
          transition: "background-color 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
        >← Back to Website</a>
      </div>
    );
  }

  // Authenticated + admin → render the page
  return children;
};
