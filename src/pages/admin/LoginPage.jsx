import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/admin";

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  // If already logged in redirect to admin
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#050816",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "1.5rem",
    }}>

      {/* Background glow */}
      <div style={{
        position: "fixed", top: "15%", left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "400px",
        backgroundColor: "rgba(6,182,212,0.08)",
        borderRadius: "9999px",
        filter: "blur(120px)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: "420px",
        backgroundColor: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "24px",
        padding: "2.5rem",
        backdropFilter: "blur(20px)",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#ffffff" }}>
              Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
            </div>
          </Link>
          <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "4px" }}>Admin Panel</p>
          <div style={{ marginTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.5rem" }}>
            <h1 style={{ color: "#ffffff", fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>🔐 Sign In</h1>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Email */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: 500, display: "block", marginBottom: "8px" }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@saleemiexpert.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              style={inputStyle}
              onFocus={e => e.target.style.borderColor = "#22d3ee"}
              onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ color: "#9ca3af", fontSize: "0.85rem", fontWeight: 500, display: "block", marginBottom: "8px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                style={{ ...inputStyle, paddingRight: "52px" }}
                onFocus={e => e.target.style.borderColor = "#22d3ee"}
                onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
              />
              <button
                type="button"
                onClick={() => setShowPass(p => !p)}
                style={{
                  position: "absolute", right: "14px", top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  color: "#6b7280", cursor: "pointer", fontSize: "1.1rem",
                }}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div style={{
              padding: "12px 16px",
              backgroundColor: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px",
              color: "#f87171",
              fontSize: "0.875rem",
              display: "flex", gap: "8px", alignItems: "center",
            }}>
              ❌ {error}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              marginTop: "4px",
              backgroundColor: loading ? "#0e7490" : "#06b6d4",
              color: "#ffffff",
              border: "none",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = "#22d3ee"; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = loading ? "#0e7490" : "#06b6d4"; }}
          >
            {loading
              ? <>
                  <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "9999px", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
                  Signing in...
                </>
              : "Sign In →"
            }
          </button>
        </form>

        {/* Credentials hint */}
        <div style={{
          marginTop: "1.75rem",
          padding: "14px",
          backgroundColor: "rgba(34,211,238,0.05)",
          border: "1px solid rgba(34,211,238,0.15)",
          borderRadius: "12px",
          textAlign: "center",
        }}>
          <p style={{ color: "#6b7280", fontSize: "0.75rem", marginBottom: "4px" }}>
            Demo credentials
          </p>
          <p style={{ color: "#22d3ee", fontSize: "0.8rem", fontWeight: 600 }}>
            admin@saleemiexpert.com / admin123
          </p>
        </div>

        {/* Back to site */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/"
            style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
          >
            ← Back to Website
          </Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
