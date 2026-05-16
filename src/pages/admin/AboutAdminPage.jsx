import { useState } from "react";
import { useSiteData } from "../../context/SiteDataContext";

const inputStyle = {
  width: "100%",
  padding: "11px 16px",
  backgroundColor: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "10px",
  color: "#ffffff",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
};
const labelStyle = {
  color: "#9ca3af",
  fontSize: "0.8rem",
  fontWeight: 500,
  display: "block",
  marginBottom: "6px",
};
const sectionCard = {
  padding: "clamp(1.25rem, 2vw, 2rem)",
  borderRadius: "16px",
  backgroundColor: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "2rem",
};
const focus = (e) => (e.currentTarget.style.borderColor = "#22d3ee");
const blur = (e) =>
  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)");

const SaveBtn = ({ onClick, saved }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 28px",
      backgroundColor: saved ? "#10b981" : "#06b6d4",
      color: "#ffffff",
      border: "none",
      borderRadius: "10px",
      fontWeight: 700,
      cursor: "pointer",
      fontSize: "0.875rem",
      transition: "all 0.3s",
    }}
    onMouseEnter={(e) => {
      if (!saved) e.currentTarget.style.backgroundColor = "#22d3ee";
    }}
    onMouseLeave={(e) => {
      if (!saved) e.currentTarget.style.backgroundColor = "#06b6d4";
    }}
  >
    {saved ? "✓ Saved!" : "Save Changes"}
  </button>
);

export const AboutAdminPage = () => {
  const {
    owner,
    updateOwner,
    skills,
    updateSkills,
    timeline,
    updateTimeline,
    certs,
    certsOps,
  } = useSiteData();

  // ── Profile form ──────────────────────────────────────────
  const [profile, setProfile] = useState({ ...owner });
  const [profSaved, setProfSaved] = useState(false);

  const handleProfile = (e) => {
    setProfile((p) => ({ ...p, [e.target.name]: e.target.value }));
    setProfSaved(false);
  };
  const saveProfile = () => {
    updateOwner(profile);
    setProfSaved(true);
    setTimeout(() => setProfSaved(false), 2500);
  };

  // ── Skills form ───────────────────────────────────────────
  const [localSkills, setLocalSkills] = useState(
    JSON.parse(JSON.stringify(skills)),
  );
  const [skillsSaved, setSkillsSaved] = useState(false);

  const updateSkillItem = (catIdx, skillIdx, field, value) => {
    setLocalSkills((prev) => {
      const next = JSON.parse(JSON.stringify(prev));
      next[catIdx].items[skillIdx][field] =
        field === "level" ? Math.min(100, Math.max(0, Number(value))) : value;
      return next;
    });
    setSkillsSaved(false);
  };
  const addSkill = (catIdx) => {
    setLocalSkills((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      n[catIdx].items.push({ name: "New Skill", level: 80 });
      return n;
    });
  };
  const removeSkill = (catIdx, skillIdx) => {
    setLocalSkills((prev) => {
      const n = JSON.parse(JSON.stringify(prev));
      n[catIdx].items.splice(skillIdx, 1);
      return n;
    });
  };
  const saveSkills = () => {
    updateSkills(localSkills);
    setSkillsSaved(true);
    setTimeout(() => setSkillsSaved(false), 2500);
  };

  // ── Timeline form ─────────────────────────────────────────
  const [localTimeline, setLocalTimeline] = useState([...timeline]);
  const [tlSaved, setTlSaved] = useState(false);
  const emptyTl = { year: "", role: "", company: "", desc: "" };

  const updateTl = (i, field, val) => {
    setLocalTimeline((prev) =>
      prev.map((t, idx) => (idx === i ? { ...t, [field]: val } : t)),
    );
    setTlSaved(false);
  };
  const addTl = () => {
    setLocalTimeline((prev) => [{ ...emptyTl }, ...prev]);
  };
  const removeTl = (i) => {
    setLocalTimeline((prev) => prev.filter((_, idx) => idx !== i));
  };
  const saveTl = () => {
    updateTimeline(localTimeline);
    setTlSaved(true);
    setTimeout(() => setTlSaved(false), 2500);
  };

  // ── Certs ─────────────────────────────────────────────────
  const [certForm, setCertForm] = useState({ name: "", issuer: "", year: "" });
  const [certSaved, setCertSaved] = useState(false);
  const [editCert, setEditCert] = useState(null);

  const saveCert = () => {
    if (!certForm.name.trim()) return;
    if (editCert !== null) {
      certsOps.update(editCert, certForm);
    } else {
      certsOps.add({ ...certForm, id: Date.now() });
    }
    setCertForm({ name: "", issuer: "", year: "" });
    setEditCert(null);
    setCertSaved(true);
    setTimeout(() => setCertSaved(false), 2500);
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
            fontWeight: 900,
            marginBottom: "4px",
          }}
        >
          About Me
        </h2>
        <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>
          Edit your profile, skills, experience and certifications. Changes
          reflect on the site instantly.
        </p>
      </div>

      {/* ── Profile ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          👤 Profile Info
        </h3>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            marginBottom: "1rem",
          }}
        >
          {[
            { name: "name", label: "Display Name" },
            { name: "title", label: "Professional Title" },
            { name: "email", label: "Email Address" },
            { name: "whatsapp", label: "WhatsApp (+92...)" },
            { name: "location", label: "Location" },
          ].map(({ name, label }) => (
            <div key={name}>
              <label style={labelStyle}>{label}</label>
              <input
                name={name}
                value={profile[name] || ""}
                onChange={handleProfile}
                style={inputStyle}
                onFocus={focus}
                onBlur={blur}
              />
            </div>
          ))}
          <div>
            <label style={labelStyle}>Photo URL</label>
            <input
              name="photo"
              value={profile.photo || ""}
              onChange={handleProfile}
              placeholder="/images/profile.jpg or https://..."
              style={inputStyle}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Bio (Paragraph 1)</label>
          <textarea
            name="bio"
            rows="3"
            value={profile.bio || ""}
            onChange={handleProfile}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focus}
            onBlur={blur}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={labelStyle}>Bio (Paragraph 2)</label>
          <textarea
            name="bio2"
            rows="3"
            value={profile.bio2 || ""}
            onChange={handleProfile}
            style={{ ...inputStyle, resize: "none" }}
            onFocus={focus}
            onBlur={blur}
          />
        </div>
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Tagline</label>
          <input
            name="tagline"
            value={profile.tagline || ""}
            onChange={handleProfile}
            style={inputStyle}
            onFocus={focus}
            onBlur={blur}
          />
        </div>
        {/* Available toggle */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "1.5rem",
          }}
        >
          <div
            onClick={() => {
              setProfile((p) => ({ ...p, available: !p.available }));
              setProfSaved(false);
            }}
            style={{
              width: "48px",
              height: "26px",
              borderRadius: "9999px",
              backgroundColor: profile.available
                ? "#10b981"
                : "rgba(255,255,255,0.1)",
              position: "relative",
              cursor: "pointer",
              transition: "background-color 0.3s",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: profile.available ? "24px" : "3px",
                width: "20px",
                height: "20px",
                borderRadius: "9999px",
                backgroundColor: "#ffffff",
                transition: "left 0.3s",
              }}
            />
          </div>
          <span
            style={{
              color: profile.available ? "#10b981" : "#9ca3af",
              fontSize: "0.9rem",
              fontWeight: 600,
            }}
          >
            {profile.available ? "Available for Work" : "Not Available"}
          </span>
        </div>
        <SaveBtn onClick={saveProfile} saved={profSaved} />
      </div>

      {/* ── Skills ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          ⚡ Skills & Proficiency
        </h3>
        {localSkills.map((group, catIdx) => (
          <div key={group.category} style={{ marginBottom: "2rem" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h4
                style={{
                  color: "#22d3ee",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                {group.category}
              </h4>
              <button
                onClick={() => addSkill(catIdx)}
                style={{
                  padding: "5px 14px",
                  backgroundColor: "rgba(34,211,238,0.1)",
                  color: "#22d3ee",
                  border: "1px solid rgba(34,211,238,0.25)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                + Add Skill
              </button>
            </div>
            {group.items.map((skill, skillIdx) => (
              <div
                key={skillIdx}
                style={{
                  display: "grid",
                  gap: "8px",
                  gridTemplateColumns: "1fr 80px 36px",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <input
                  value={skill.name}
                  onChange={(e) =>
                    updateSkillItem(catIdx, skillIdx, "name", e.target.value)
                  }
                  style={{ ...inputStyle, padding: "8px 12px" }}
                  onFocus={focus}
                  onBlur={blur}
                />
                <div style={{ position: "relative" }}>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      updateSkillItem(catIdx, skillIdx, "level", e.target.value)
                    }
                    style={{ ...inputStyle, padding: "8px 12px" }}
                    onFocus={focus}
                    onBlur={blur}
                  />
                </div>
                <button
                  onClick={() => removeSkill(catIdx, skillIdx)}
                  style={{
                    width: "36px",
                    height: "36px",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
        <SaveBtn onClick={saveSkills} saved={skillsSaved} />
      </div>

      {/* ── Experience Timeline ── */}
      <div style={sectionCard}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: "1.1rem" }}>
            📅 Experience Timeline
          </h3>
          <button
            onClick={addTl}
            style={{
              padding: "8px 18px",
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 700,
            }}
          >
            + Add Entry
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            marginBottom: "1.5rem",
          }}
        >
          {localTimeline.map((item, i) => (
            <div
              key={i}
              style={{
                padding: "1.25rem",
                borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.08)",
                backgroundColor: "rgba(255,255,255,0.03)",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gap: "10px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  marginBottom: "10px",
                }}
              >
                {[
                  ["year", "Year (e.g. 2022–2024)"],
                  ["role", "Job Title / Role"],
                  ["company", "Company / Employer"],
                ].map(([field, lbl]) => (
                  <div key={field}>
                    <label style={labelStyle}>{lbl}</label>
                    <input
                      value={item[field]}
                      onChange={(e) => updateTl(i, field, e.target.value)}
                      style={{ ...inputStyle, padding: "8px 12px" }}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label style={labelStyle}>Description</label>
                <textarea
                  rows="2"
                  value={item.desc}
                  onChange={(e) => updateTl(i, "desc", e.target.value)}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
              <button
                onClick={() => removeTl(i)}
                style={{
                  padding: "6px 16px",
                  backgroundColor: "rgba(239,68,68,0.1)",
                  color: "#f87171",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <SaveBtn onClick={saveTl} saved={tlSaved} />
      </div>

      {/* ── Certifications ── */}
      <div style={sectionCard}>
        <h3
          style={{
            color: "#ffffff",
            fontWeight: 700,
            fontSize: "1.1rem",
            marginBottom: "1.5rem",
          }}
        >
          🏆 Certifications
        </h3>

        {/* Add / Edit form */}
        <div
          style={{
            padding: "1.25rem",
            borderRadius: "12px",
            border: "1px solid rgba(34,211,238,0.2)",
            backgroundColor: "rgba(34,211,238,0.03)",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              color: "#22d3ee",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            {editCert !== null ? "Edit Certification" : "Add New Certification"}
          </p>
          <div
            style={{
              display: "grid",
              gap: "10px",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              marginBottom: "1rem",
            }}
          >
            {[
              ["name", "Certification Name *"],
              ["issuer", "Issued By"],
              ["year", "Year"],
            ].map(([field, lbl]) => (
              <div key={field}>
                <label style={labelStyle}>{lbl}</label>
                <input
                  value={certForm[field]}
                  onChange={(e) =>
                    setCertForm((p) => ({ ...p, [field]: e.target.value }))
                  }
                  style={{ ...inputStyle, padding: "8px 12px" }}
                  onFocus={focus}
                  onBlur={blur}
                />
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <SaveBtn onClick={saveCert} saved={certSaved} />
            {editCert !== null && (
              <button
                onClick={() => {
                  setCertForm({ name: "", issuer: "", year: "" });
                  setEditCert(null);
                }}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  color: "#9ca3af",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* List */}
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {certs.map((cert) => (
            <div
              key={cert.id || cert.name}
              style={{
                padding: "1rem 1.25rem",
                borderRadius: "10px",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                  }}
                >
                  {cert.name}
                </p>
                <p style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                  {cert.issuer} · {cert.year}
                </p>
              </div>
              <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                <button
                  onClick={() => {
                    setCertForm({
                      name: cert.name,
                      issuer: cert.issuer,
                      year: cert.year,
                    });
                    setEditCert(cert.id || cert.name);
                  }}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "7px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "rgba(34,211,238,0.1)",
                    color: "#22d3ee",
                    border: "1px solid rgba(34,211,238,0.2)",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => certsOps.remove(cert.id || cert.name)}
                  style={{
                    padding: "5px 12px",
                    borderRadius: "7px",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    backgroundColor: "rgba(239,68,68,0.1)",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.2)",
                  }}
                >
                  Del
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
