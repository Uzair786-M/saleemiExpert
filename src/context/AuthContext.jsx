import { createContext, useContext, useState, useEffect } from "react";

// ─────────────────────────────────────────────────────────────
// AUTH CONTEXT
//
// CURRENT: Uses temp hardcoded credentials for development.
//
// WHEN BACKEND IS READY — replace the login() function body with:
//
//   const res = await fetch('/api/auth/login', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ email, password }),
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.message || 'Login failed');
//
//   // Backend must return: { token, user: { email, name, role } }
//   if (data.user.role !== 'admin') throw new Error('Access denied. Admins only.');
//
//   localStorage.setItem('admin_token', data.token);
//   setAdmin(data.user);
//   return data.user;
//
// ALSO update rehydration (useEffect below) to verify token:
//   const res = await fetch('/api/auth/me', {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (res.ok) { const data = await res.json(); setAdmin(data.user); }
//   else { localStorage.removeItem('admin_token'); }
// ─────────────────────────────────────────────────────────────

const AuthContext = createContext(null);

// ── Temp credentials (remove when backend is ready) ──────────
const TEMP_ADMIN = {
  email:    "admin@saleemiexpert.com",
  password: "admin123",
  name:     "Saleemi Admin",
  role:     "admin",   // ← role check happens here
};

export const AuthProvider = ({ children }) => {
  const [admin,   setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on page refresh
  useEffect(() => {
    try {
      const stored = localStorage.getItem("admin_session");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Only restore if role is admin
        if (parsed?.role === "admin") setAdmin(parsed);
        else localStorage.removeItem("admin_session");
      }
    } catch {
      localStorage.removeItem("admin_session");
    } finally {
      setLoading(false);
    }
  }, []);

  // ── login ─────────────────────────────────────────────────
  const login = async (email, password) => {
    // Simulate network delay — remove when using real API
    await new Promise(r => setTimeout(r, 900));

    // TODO: replace below block with real fetch() call (see comment above)
    if (email !== TEMP_ADMIN.email || password !== TEMP_ADMIN.password) {
      throw new Error("Invalid email or password.");
    }

    const userData = {
      email:  TEMP_ADMIN.email,
      name:   TEMP_ADMIN.name,
      role:   TEMP_ADMIN.role,
    };

    // Role guard — only "admin" can proceed
    if (userData.role !== "admin") {
      throw new Error("Access denied. You do not have admin privileges.");
    }

    setAdmin(userData);
    localStorage.setItem("admin_session", JSON.stringify(userData));
    return userData;
  };

  // ── logout ────────────────────────────────────────────────
  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("admin_session");
    // TODO: also call POST /api/auth/logout to invalidate server token
  };

  const isAdmin = admin?.role === "admin";

  return (
    <AuthContext.Provider value={{
      admin,
      login,
      logout,
      loading,
      isAuthenticated: !!admin,
      isAdmin,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};
