import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard",   to: "/admin",              icon: "📊" },
  { label: "Messages",    to: "/admin/messages",     icon: "✉️"  },
  { label: "Testimonials",to: "/admin/testimonials", icon: "⭐" },
  { label: "Portfolio",   to: "/admin/portfolio",    icon: "🗂️"  },
  { label: "Services",    to: "/admin/services",     icon: "⚡" },
  { label: "About Me",    to: "/admin/about",         icon: "👤" },
  { label: "Pricing",     to: "/admin/pricing",       icon: "💰" },
];

const sidebarW = "260px";

export const AdminLayout = ({ children }) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate("/admin/login"); };

  const linkStyle = ({ isActive }) => ({
    display: "flex", alignItems: "center", gap: "0.875rem",
    padding: "12px 20px", borderRadius: "10px",
    textDecoration: "none", fontWeight: 500,
    fontSize: "0.95rem", transition: "all 0.2s",
    backgroundColor: isActive ? "rgba(34,211,238,0.12)" : "transparent",
    color: isActive ? "#22d3ee" : "#9ca3af",
    borderLeft: isActive ? "3px solid #22d3ee" : "3px solid transparent",
  });

  const Sidebar = () => (
    <aside style={{
      width: sidebarW, minHeight: "100vh", flexShrink: 0,
      backgroundColor: "#070b1d",
      borderRight: "1px solid rgba(255,255,255,0.08)",
      display: "flex", flexDirection: "column",
      position: "fixed", top: 0, left: 0, zIndex: 40,
      transition: "transform 0.3s ease",
    }}>
      {/* Logo */}
      <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <span style={{ fontSize: "1.35rem", fontWeight: 700, color: "#ffffff" }}>
          Saleemi<span style={{ color: "#22d3ee" }}>Admin</span>
        </span>
        <p style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "4px" }}>Control Panel</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px" }}>
        {navItems.map(({ label, to, icon }) => (
          <NavLink key={to} to={to} end={to === "/admin"} style={linkStyle}
            onMouseEnter={e => { if (!e.currentTarget.getAttribute("aria-current")) { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#ffffff"; } }}
            onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#9ca3af"; } }}
          >
            <span style={{ fontSize: "1.1rem" }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Admin info + logout */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ padding: "12px 16px", borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.04)", marginBottom: "10px" }}>
          <p style={{ color: "#ffffff", fontWeight: 600, fontSize: "0.9rem" }}>{admin?.name}</p>
          <p style={{ color: "#6b7280", fontSize: "0.75rem" }}>{admin?.email}</p>
        </div>
        <button onClick={handleLogout} style={{
          width: "100%", padding: "10px 16px", borderRadius: "10px",
          backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444",
          border: "1px solid rgba(239,68,68,0.2)", cursor: "pointer",
          fontWeight: 600, fontSize: "0.875rem", transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.2)"; }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.1)"; }}
        >🚪 Logout</button>
      </div>
    </aside>
  );

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#050816" }}>
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Main content */}
      <div style={{ marginLeft: sidebarW, flex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Top bar */}
        <header style={{
          position: "sticky", top: 0, zIndex: 30,
          padding: "16px clamp(1.5rem, 3vw, 3rem)",
          backgroundColor: "rgba(5,8,22,0.9)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <h1 style={{ color: "#ffffff", fontSize: "1.25rem", fontWeight: 700 }}>
              Welcome back, <span style={{ color: "#22d3ee" }}>{admin?.name?.split(" ")[0]}</span>
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.8rem" }}>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
          <NavLink to="/" target="_blank" style={{ color: "#9ca3af", textDecoration: "none", fontSize: "0.875rem", padding: "8px 16px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.color = "#22d3ee"; e.currentTarget.style.borderColor = "#22d3ee"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
          >🌐 View Site</NavLink>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "clamp(1.5rem, 3vw, 3rem)" }}>
          {children}
        </main>
      </div>
    </div>
  );
};
