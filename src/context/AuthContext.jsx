import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

// ── Temp credentials — replace with real API when backend is ready ──
const ADMIN_EMAIL    = "admin@saleemiexpert.com";
const ADMIN_PASSWORD = "admin123";

export const AuthProvider = ({ children }) => {
  const [admin,   setAdmin]   = useState(null);
  const [loading, setLoading] = useState(true);

  // On app start — restore session from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("se_admin");
      if (stored) setAdmin(JSON.parse(stored));
    } catch {
      localStorage.removeItem("se_admin");
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800));

    if (email.trim() !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      throw new Error("Invalid email or password.");
    }

    const user = { email: ADMIN_EMAIL, name: "Saleemi Admin", role: "admin" };
    setAdmin(user);
    localStorage.setItem("se_admin", JSON.stringify(user));
    return user;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem("se_admin");
  };

  return (
    <AuthContext.Provider value={{
      admin,
      loading,
      isAuthenticated: !!admin,
      isAdmin: admin?.role === "admin",
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
