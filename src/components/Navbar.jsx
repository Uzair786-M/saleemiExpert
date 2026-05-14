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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const close = () => setMenuOpen(false);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0,
      width: "100%", zIndex: 50,
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      backgroundColor: scrolled ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.25)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      transition: "background-color 0.3s ease",
    }}>
      <div style={{
        width: "100%",
        padding: "16px clamp(1.5rem, 5vw, 6rem)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/" onClick={close} style={{ textDecoration: "none" }}>
          <span style={{ fontSize: "clamp(1.25rem, 2vw, 2rem)", fontWeight: 700, color: "#ffffff", letterSpacing: "0.04em" }}>
            Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
          </span>
        </Link>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: "clamp(1rem, 3vw, 3rem)", listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === "/"}
                  style={({ isActive }) => ({
                    color: isActive ? "#22d3ee" : "#ffffff",
                    textDecoration: "none",
                    fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  })}
                  onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
                  onMouseLeave={e => {
                    if (!e.currentTarget.getAttribute("aria-current"))
                      e.currentTarget.style.color = "#ffffff";
                  }}
                >{label}</NavLink>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            to="/contact"
            onClick={close}
            style={{
              padding: "clamp(8px, 0.8vw, 14px) clamp(16px, 1.5vw, 32px)",
              backgroundColor: "#06b6d4", color: "#ffffff",
              borderRadius: "9999px", fontWeight: 600,
              fontSize: "clamp(0.8rem, 1vw, 1.1rem)",
              textDecoration: "none", transition: "background-color 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
          >Hire Me</Link>

          {isMobile && (
            <button
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", cursor: "pointer", padding: "6px", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px" }}
            >
              {[0, 1, 2].map(i => (
                <span key={i} style={{
                  display: "block", width: "24px", height: "2.5px",
                  backgroundColor: "#ffffff", borderRadius: "2px",
                  transition: "transform 0.3s, opacity 0.3s",
                  transform: menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)"
                    : menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }} />
              ))}
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMobile && (
        <div style={{
          maxHeight: menuOpen ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
          backgroundColor: "rgba(5,8,22,0.97)",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "none",
        }}>
          <ul style={{ listStyle: "none", margin: 0, padding: menuOpen ? "20px 24px 24px" : "0 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink
                  to={to} end={to === "/"} onClick={close}
                  style={({ isActive }) => ({
                    display: "block", padding: "12px 16px", borderRadius: "10px",
                    color: isActive ? "#22d3ee" : "#ffffff", textDecoration: "none",
                    fontSize: "1rem", fontWeight: 500,
                    backgroundColor: isActive ? "rgba(34,211,238,0.08)" : "transparent",
                    transition: "background-color 0.2s, color 0.2s",
                  })}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = "rgba(34,211,238,0.08)"; e.currentTarget.style.color = "#22d3ee"; }}
                  onMouseLeave={e => { if (!e.currentTarget.getAttribute("aria-current")) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#ffffff"; } }}
                >{label}</NavLink>
              </li>
            ))}
            <li style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "8px 0" }} />
            <li>
              <Link to="/contact" onClick={close} style={{
                display: "block", padding: "13px 16px", borderRadius: "10px",
                backgroundColor: "#06b6d4", color: "#ffffff", textDecoration: "none",
                fontSize: "1rem", fontWeight: 700, textAlign: "center", transition: "background-color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
              >Hire Me</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
