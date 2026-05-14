import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { login, isAuthenticated, isAdmin } = useAuth();
  const navigate  = useNavigate();
  const location  = useLocation();
  const from      = location.state?.from?.pathname || "/admin";

  const [form,     setForm]     = useState({ email: "", password: "" });
  const [status,   setStatus]   = useState("idle"); // idle | loading | error | denied
  const [errorMsg, setErrorMsg] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Already logged in as admin → redirect
  if (isAuthenticated && isAdmin) {
    navigate(from, { replace: true });
    return null;
  }

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) {
      setErrorMsg("Please enter your email and password.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const user = await login(form.email, form.password);
      // Double-check role before redirecting
      if (user.role !== "admin") {
        setStatus("denied");
        setErrorMsg("Your account does not have admin access.");
        return;
      }
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMsg(err.message || "Login failed. Please try again.");
      setStatus("error");
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "12px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const statusColor = status === "denied" ? "#f59e0b" : "#ef4444";
  const statusBg    = status === "denied" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)";
  const statusBorder= status === "denied" ? "rgba(245,158,11,0.25)" : "rgba(239,68,68,0.2)";

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#050816",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}>
      {/* Background glow */}
      <div style={{
        position: "fixed", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "500px", height: "400px",
        backgroundColor: "rgba(6,182,212,0.07)",
        borderRadius: "9999px", filter: "blur(100px)", pointerEvents: "none",
      }} />

      <div style={{ width: "100%", maxWidth: "440px", position: "relative" }}>
        {/* Card */}
        <div style={{
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "24px",
          padding: "clamp(2rem, 4vw, 3rem)",
          backdropFilter: "blur(20px)",
        }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 700, color: "#ffffff" }}>
                Saleemi<span style={{ color: "#22d3ee" }}>Expert</span>
              </span>
            </Link>
            <p style={{ color: "#6b7280", fontSize: "0.8rem", marginTop: "4px" }}>Admin Control Panel</p>

            <div style={{ marginTop: "1.5rem", padding: "10px 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <h2 style={{ color: "#ffffff", fontSize: "1.35rem", fontWeight: 700 }}>
                🔐 Admin Sign In
              </h2>
              <p style={{ color: "#6b7280", fontSize: "0.75rem", marginTop: "4px" }}>
                Only users with admin role can access this panel
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Email */}
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                Email Address
              </label>
              <input
                type="email" name="email"
                placeholder="admin@saleemiexpert.com"
                value={form.email} onChange={handleChange}
                autoComplete="email"
                style={inputStyle}
                onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"}
                onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>

            {/* Password */}
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.875rem", fontWeight: 500, display: "block", marginBottom: "6px" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPass ? "text" : "password"} name="password"
                  placeholder="••••••••"
                  value={form.password} onChange={handleChange}
                  autoComplete="current-password"
                  style={{ ...inputStyle, paddingRight: "50px" }}
                  onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6b7280", cursor: "pointer", fontSize: "1.1rem", padding: "4px" }}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error / Denied message */}
            {(status === "error" || status === "denied") && (
              <div style={{
                padding: "12px 16px",
                backgroundColor: statusBg,
                border: `1px solid ${statusBorder}`,
                borderRadius: "10px",
                color: statusColor,
                fontSize: "0.875rem",
                display: "flex", alignItems: "flex-start", gap: "8px",
              }}>
                <span>{status === "denied" ? "⚠️" : "❌"}</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "loading"}
              style={{
                width: "100%", padding: "14px",
                backgroundColor: status === "loading" ? "#0e7490" : "#06b6d4",
                color: "#ffffff", border: "none", borderRadius: "12px",
                fontWeight: 700, fontSize: "1rem",
                cursor: status === "loading" ? "not-allowed" : "pointer",
                transition: "background-color 0.2s", marginTop: "0.5rem",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
              onMouseEnter={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#22d3ee"; }}
              onMouseLeave={e => { if (status !== "loading") e.currentTarget.style.backgroundColor = "#06b6d4"; }}
            >
              {status === "loading" ? (
                <>
                  <span style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid #fff", borderRadius: "9999px", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                  Verifying...
                </>
              ) : "Sign In →"}
            </button>
          </form>

          {/* Dev hint — remove in production */}
          <div style={{ marginTop: "2rem", padding: "14px 16px", backgroundColor: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.12)", borderRadius: "12px" }}>
            <p style={{ color: "#6b7280", fontSize: "0.75rem", textAlign: "center", marginBottom: "4px" }}>
              Dev credentials (remove in production)
            </p>
            <p style={{ color: "#22d3ee", fontSize: "0.8rem", textAlign: "center" }}>
              admin@saleemiexpert.com &nbsp;/&nbsp; admin123
            </p>
          </div>
        </div>

        {/* Back link */}
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link to="/" style={{ color: "#6b7280", textDecoration: "none", fontSize: "0.875rem", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#22d3ee"}
            onMouseLeave={e => e.currentTarget.style.color = "#6b7280"}
          >← Back to Website</Link>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};
