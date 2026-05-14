import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export const Footer = () => (
  <footer style={{ width: "100%", padding: "2.5rem 0", borderTop: "1px solid rgba(255,255,255,0.1)", backgroundColor: "#050816" }}>
    <div style={{
      width: "100%",
      padding: "0 clamp(1.5rem, 5vw, 6rem)",
      display: "flex", flexWrap: "wrap",
      alignItems: "center", justifyContent: "space-between", gap: "1.5rem",
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <span style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)", fontWeight: 700, color: "#ffffff" }}>
          Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
        </span>
      </Link>

      <ul style={{ display: "flex", gap: "clamp(1rem, 2vw, 2.5rem)", listStyle: "none", flexWrap: "wrap" }}>
        {footerLinks.map(({ label, to }) => (
          <li key={to}>
            <Link to={to} style={{ color: "#9ca3af", textDecoration: "none", fontSize: "clamp(0.875rem, 1vw, 1.1rem)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.color = "#9ca3af"}
            >{label}</Link>
          </li>
        ))}
      </ul>

      <p style={{ color: "#9ca3af", fontSize: "clamp(0.8rem, 1vw, 1rem)" }}>
        © {new Date().getFullYear()} SaleemiExpert. All rights reserved.
      </p>
    </div>
  </footer>
);
