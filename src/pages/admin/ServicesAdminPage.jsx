import { useState } from "react";
import { SERVICES } from "../../data/constants";

const empty = { icon: "⚡", title: "", shortDesc: "", fullDesc: "", features: "" };

export const ServicesAdminPage = () => {
  const [items, setItems]       = useState(SERVICES);
  const [form, setForm]         = useState(empty);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]       = useState("");

  const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.9rem", outline: "none" };

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.title.trim())     return "Title is required.";
    if (!form.shortDesc.trim()) return "Short description is required.";
    return null;
  };

  const handleSave = () => {
    const err = validate(); if (err) { setError(err); return; }
    setError("");
    const features = form.features.split("\n").map(f => f.trim()).filter(Boolean);
    if (editing !== null) {
      // TODO: PUT /api/services/:id
      setItems(prev => prev.map(s => s.id === editing ? { ...s, ...form, features } : s));
    } else {
      // TODO: POST /api/services
      setItems(prev => [...prev, { ...form, id: Date.now(), features }]);
    }
    setForm(empty); setEditing(null); setShowForm(false);
  };

  const handleEdit = (item) => { setForm({ icon: item.icon, title: item.title, shortDesc: item.shortDesc, fullDesc: item.fullDesc || "", features: (item.features || []).join("\n") }); setEditing(item.id); setShowForm(true); setError(""); };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this service?")) return;
    // TODO: DELETE /api/services/:id
    setItems(prev => prev.filter(s => s.id !== id));
  };

  const handleCancel = () => { setForm(empty); setEditing(null); setShowForm(false); setError(""); };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Services</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{items.length} services listed</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} style={{ padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", transition: "background-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
        >+ Add Service</button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,211,238,0.3)", marginBottom: "2rem" }}>
          <h3 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.25rem" }}>{editing ? "Edit" : "Add"} Service</h3>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1rem" }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Icon (emoji)</label>
              <input name="icon" value={form.icon} onChange={handleChange} placeholder="⚡" style={{ ...inputStyle, fontSize: "1.5rem" }} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Service Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Website Development" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
          </div>
          <div style={{ display: "grid", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Short Description * (shown on cards)</label>
              <input name="shortDesc" value={form.shortDesc} onChange={handleChange} placeholder="Brief summary..." style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Full Description (shown on Services page)</label>
              <textarea name="fullDesc" rows="3" value={form.fullDesc} onChange={handleChange} placeholder="Detailed description..." style={{ ...inputStyle, resize: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Features (one per line)</label>
              <textarea name="features" rows="4" value={form.features} onChange={handleChange} placeholder={"Custom responsive design\nSEO optimization\nFast performance"} style={{ ...inputStyle, resize: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSave} style={{ padding: "10px 28px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}>{editing ? "Update" : "Save"}</button>
            <button onClick={handleCancel} style={{ padding: "10px 20px", backgroundColor: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {items.map(item => (
          <div key={item.id} style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
              <span style={{ fontSize: "1.75rem" }}>{item.icon}</span>
              <h4 style={{ color: "#ffffff", fontWeight: 700 }}>{item.title}</h4>
            </div>
            <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.shortDesc}</p>
            {item.features && item.features.length > 0 && (
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "4px", marginBottom: "1rem" }}>
                {item.features.slice(0, 3).map(f => <li key={f} style={{ color: "#6b7280", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}><span style={{ color: "#22d3ee" }}>✓</span>{f}</li>)}
                {item.features.length > 3 && <li style={{ color: "#6b7280", fontSize: "0.75rem" }}>+{item.features.length - 3} more</li>}
              </ul>
            )}
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => handleEdit(item)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(34,211,238,0.1)", color: "#22d3ee", border: "1px solid rgba(34,211,238,0.2)", transition: "all 0.2s" }}>Edit</button>
              <button onClick={() => handleDelete(item.id)} style={{ padding: "7px 18px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: "rgba(239,68,68,0.1)", color: "#f87171", border: "1px solid rgba(239,68,68,0.2)", transition: "all 0.2s" }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
