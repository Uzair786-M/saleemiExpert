import { useState } from "react";
import { PORTFOLIO_ITEMS } from "../../data/constants";

const empty = { title: "", category: "E-commerce", description: "", tags: "" };
const CATS  = ["E-commerce", "Automation", "Web Development"];

export const PortfolioAdminPage = () => {
  const [items, setItems]       = useState(PORTFOLIO_ITEMS);
  const [form, setForm]         = useState(empty);
  const [editing, setEditing]   = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError]       = useState("");
  const [filter, setFilter]     = useState("All");

  const inputStyle = { width: "100%", padding: "11px 16px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#ffffff", fontSize: "0.9rem", outline: "none" };

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validate = () => {
    if (!form.title.trim())       return "Title is required.";
    if (!form.description.trim()) return "Description is required.";
    return null;
  };

  const handleSave = () => {
    const err = validate(); if (err) { setError(err); return; }
    setError("");
    const tags = form.tags.split(",").map(t => t.trim()).filter(Boolean);
    if (editing !== null) {
      // TODO: PUT /api/portfolio/:id
      setItems(prev => prev.map(p => p.id === editing ? { ...p, ...form, tags } : p));
    } else {
      // TODO: POST /api/portfolio
      setItems(prev => [...prev, { ...form, id: Date.now(), tags, color: "from-cyan-500/30 to-blue-500/10" }]);
    }
    setForm(empty); setEditing(null); setShowForm(false);
  };

  const handleEdit = (item) => { setForm({ title: item.title, category: item.category, description: item.description, tags: item.tags.join(", ") }); setEditing(item.id); setShowForm(true); setError(""); };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this project?")) return;
    // TODO: DELETE /api/portfolio/:id
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const handleCancel = () => { setForm(empty); setEditing(null); setShowForm(false); setError(""); };

  const filtered = filter === "All" ? items : items.filter(i => i.category === filter);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 900, marginBottom: "4px" }}>Portfolio</h2>
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>{items.length} total projects</p>
        </div>
        <button onClick={() => { setShowForm(true); setEditing(null); setForm(empty); }} style={{ padding: "10px 24px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", fontSize: "0.875rem", transition: "background-color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
        >+ Add Project</button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ padding: "1.75rem", borderRadius: "16px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,211,238,0.3)", marginBottom: "2rem" }}>
          <h3 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "1.25rem" }}>{editing ? "Edit" : "Add"} Project</h3>
          <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "1rem" }}>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Project Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="5000+ Shopify Products Upload" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                {CATS.map(c => <option key={c} value={c} style={{ backgroundColor: "#0d1224" }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Tags (comma separated)</label>
              <input name="tags" value={form.tags} onChange={handleChange} placeholder="Shopify, CSV, Automation" style={inputStyle} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
          </div>
          <div style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#9ca3af", fontSize: "0.8rem", display: "block", marginBottom: "6px" }}>Description *</label>
            <textarea name="description" rows="4" value={form.description} onChange={handleChange} placeholder="Describe the project..." style={{ ...inputStyle, resize: "none" }} onFocus={e => e.currentTarget.style.borderColor = "#22d3ee"} onBlur={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"} />
          </div>
          {error && <p style={{ color: "#f87171", fontSize: "0.8rem", marginBottom: "1rem" }}>⚠️ {error}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={handleSave} style={{ padding: "10px 28px", backgroundColor: "#06b6d4", color: "#ffffff", border: "none", borderRadius: "10px", fontWeight: 700, cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"} onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}>{editing ? "Update" : "Save"}</button>
            <button onClick={handleCancel} style={{ padding: "10px 20px", backgroundColor: "transparent", color: "#9ca3af", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", fontWeight: 600, cursor: "pointer" }}>Cancel</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        {["All", ...CATS].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600, cursor: "pointer", backgroundColor: filter === f ? "#06b6d4" : "transparent", color: filter === f ? "#ffffff" : "#9ca3af", border: filter === f ? "1px solid #06b6d4" : "1px solid rgba(255,255,255,0.1)", transition: "all 0.2s" }}>{f}</button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        {filtered.map(item => (
          <div key={item.id} style={{ padding: "1.5rem", borderRadius: "14px", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
              <span style={{ padding: "3px 12px", borderRadius: "9999px", fontSize: "0.7rem", fontWeight: 600, color: "#22d3ee", backgroundColor: "rgba(34,211,238,0.1)" }}>{item.category}</span>
            </div>
            <h4 style={{ color: "#ffffff", fontWeight: 700, marginBottom: "0.5rem" }}>{item.title}</h4>
            <p style={{ color: "#9ca3af", fontSize: "0.8rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{item.description?.slice(0, 100)}...</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "1rem" }}>
              {item.tags.map(tag => <span key={tag} style={{ padding: "2px 10px", borderRadius: "9999px", fontSize: "0.7rem", backgroundColor: "rgba(255,255,255,0.08)", color: "#9ca3af" }}>{tag}</span>)}
            </div>
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
