import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 50,
        backdropFilter: "blur(12px)",
        backgroundColor: scrolled ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }} onClick={() => setMenuOpen(false)}>
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em" }}>
            Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul style={{ display: "flex", gap: "2rem", listStyle: "none", alignItems: "center" }}
          className="hidden md:flex">
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#22d3ee" : "#ffffff",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  transition: "color 0.2s",
                })}
                onMouseEnter={e => { if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.color = "#22d3ee"; }}
                onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) e.currentTarget.style.color = "#ffffff"; }}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Hire Me button */}
          <Link
            to="/contact"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: "8px 20px",
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              borderRadius: "9999px",
              fontWeight: 600,
              fontSize: "0.875rem",
              textDecoration: "none",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
          >
            Hire Me
          </Link>

          {/* Hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "24px",
                  height: "2px",
                  backgroundColor: "#ffffff",
                  marginBottom: i < 2 ? "5px" : 0,
                  borderRadius: "2px",
                  transition: "all 0.3s",
                  transform:
                    menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 1 ? "scaleX(0)"
                    : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="md:hidden"
        style={{
          maxHeight: menuOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          backgroundColor: "rgba(0,0,0,0.9)",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        <ul style={{ listStyle: "none", padding: "16px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {navLinks.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === "/"}
                onClick={() => setMenuOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? "#22d3ee" : "#ffffff",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
