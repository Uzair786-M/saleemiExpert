import { Link } from "react-router-dom";
import { useSiteData } from "../context/SiteDataContext";
import { SOCIAL_LINKS, SOCIAL_META } from "../data/constants";

const inner   = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };
const section = (bg) => ({ width: "100%", padding: "6rem 0", backgroundColor: bg || "#050816" });

const SkillBar = ({ name, level }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
      <span style={{ color: "#d1d5db", fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", fontWeight: 500 }}>{name}</span>
      <span style={{ color: "#22d3ee", fontSize: "clamp(0.8rem, 1vw, 1rem)", fontWeight: 700 }}>{level}%</span>
    </div>
    <div style={{ height: "8px", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: "9999px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${level}%`, borderRadius: "9999px", background: "linear-gradient(90deg, #06b6d4, #22d3ee)", transition: "width 1s ease" }} />
    </div>
  </div>
);

const TimelineItem = ({ item, isLast }) => (
  <div style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
      <div style={{ width: "16px", height: "16px", borderRadius: "9999px", backgroundColor: "#22d3ee", border: "3px solid #050816", flexShrink: 0, zIndex: 1 }} />
      {!isLast && <div style={{ width: "2px", flex: 1, backgroundColor: "rgba(34,211,238,0.2)", marginTop: "4px" }} />}
    </div>
    <div style={{ paddingBottom: isLast ? 0 : "2.5rem", flex: 1 }}>
      <span style={{ color: "#22d3ee", fontSize: "clamp(0.75rem, 1vw, 0.9rem)", fontWeight: 700, letterSpacing: "1px" }}>{item.year}</span>
      <h4 style={{ color: "#ffffff", fontSize: "clamp(1rem, 1.3vw, 1.25rem)", fontWeight: 700, margin: "4px 0" }}>{item.role}</h4>
      <p style={{ color: "#06b6d4", fontSize: "clamp(0.8rem, 1vw, 1rem)", marginBottom: "8px", fontWeight: 500 }}>{item.company}</p>
      <p style={{ color: "#9ca3af", fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", lineHeight: 1.7 }}>{item.desc}</p>
    </div>
  </div>
);

export const AboutPage = () => {
  // ← reads from shared context — updates instantly when admin edits
  const { owner, skills, timeline, certs } = useSiteData();

  return (
    <div style={{ paddingTop: "6rem" }}>

      {/* Hero */}
      <section style={{ ...section("#070b1d"), padding: "5rem 0 6rem" }}>
        <div style={inner}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>

            {/* Avatar */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", inset: "-20px", borderRadius: "9999px", background: "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)", filter: "blur(20px)" }} />
                <div style={{
                  position: "relative", width: "clamp(180px, 18vw, 260px)", height: "clamp(180px, 18vw, 260px)",
                  borderRadius: "9999px",
                  background: owner.photo ? `url(${owner.photo}) center/cover` : "linear-gradient(135deg, #0d1224, #0a1628)",
                  border: "3px solid rgba(34,211,238,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 900, color: "#22d3ee",
                  boxShadow: "0 0 60px rgba(6,182,212,0.2)",
                }}>
                  {!owner.photo && "SE"}
                </div>
                {owner.available && (
                  <div style={{ position: "absolute", bottom: "12px", right: "0", display: "flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "9999px", backgroundColor: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", backdropFilter: "blur(10px)" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "9999px", backgroundColor: "#10b981" }} />
                    <span style={{ color: "#10b981", fontSize: "0.75rem", fontWeight: 700 }}>Available for Work</span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "4px", fontSize: "clamp(0.75rem, 1vw, 0.9rem)", marginBottom: "0.75rem" }}>About Me</p>
              <h1 style={{ color: "#ffffff", fontSize: "clamp(2rem, 4vw, 4rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "0.5rem" }}>{owner.name}</h1>
              <p style={{ color: "#22d3ee", fontSize: "clamp(1rem, 1.4vw, 1.4rem)", fontWeight: 600, marginBottom: "1.5rem" }}>{owner.title}</p>
              <p style={{ color: "#d1d5db", fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)", lineHeight: 1.8, marginBottom: "1rem" }}>{owner.bio}</p>
              <p style={{ color: "#9ca3af", fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)", lineHeight: 1.8, marginBottom: "2rem" }}>{owner.bio2}</p>

              {/* CTA */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
                <Link to="/contact" style={{ padding: "clamp(11px, 1.2vw, 16px) clamp(24px, 2.5vw, 40px)", backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "background-color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
                >Hire Me</Link>
                <a href="/cv.pdf" download style={{ padding: "clamp(11px, 1.2vw, 16px) clamp(24px, 2.5vw, 40px)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "all 0.2s", backgroundColor: "transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}
                >📄 Download CV</a>
              </div>

              {/* Social links */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
                  const meta = SOCIAL_META[platform];
                  return (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                      style={{ padding: "6px 16px", border: `1px solid ${meta?.color}40`, color: meta?.color, borderRadius: "9999px", textDecoration: "none", fontWeight: 600, fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)", transition: "all 0.2s", backgroundColor: `${meta?.color}10`, textTransform: "capitalize" }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${meta?.color}25`; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = `${meta?.color}10`; }}
                    >{meta?.label}</a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section style={section()}>
        <div style={inner}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.75rem" }}>My Expertise</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 4rem)", fontWeight: 900 }}>Skills & Proficiency</h2>
          </div>
          <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {skills.map(group => (
              <div key={group.category} style={{ padding: "clamp(1.5rem, 2vw, 2.5rem)", borderRadius: "1.5rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <h3 style={{ color: "#22d3ee", fontSize: "clamp(0.8rem, 1vw, 1rem)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", marginBottom: "1.5rem" }}>{group.category}</h3>
                {group.items.map(skill => <SkillBar key={skill.name} {...skill} />)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={section("#070b1d")}>
        <div style={inner}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.75rem" }}>My Journey</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 4rem)", fontWeight: 900 }}>Experience</h2>
          </div>
          <div style={{ maxWidth: "800px", margin: "0 auto" }}>
            {timeline.map((item, i) => (
              <TimelineItem key={item.year + i} item={item} isLast={i === timeline.length - 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section style={section()}>
        <div style={inner}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "clamp(0.75rem, 1vw, 1rem)", marginBottom: "0.75rem" }}>Credentials</p>
            <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 4rem)", fontWeight: 900 }}>Certifications</h2>
          </div>
          <div style={{ display: "grid", gap: "1.25rem", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {certs.map((cert, i) => (
              <div key={cert.name + i} style={{ padding: "1.5rem", borderRadius: "1.25rem", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "1rem", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#22d3ee"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}
              >
                <div style={{ width: "48px", height: "48px", borderRadius: "10px", backgroundColor: "rgba(34,211,238,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", flexShrink: 0 }}>🏆</div>
                <div>
                  <h4 style={{ color: "#ffffff", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)" }}>{cert.name}</h4>
                  <p style={{ color: "#9ca3af", fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)" }}>{cert.issuer} · {cert.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ ...section("#070b1d"), textAlign: "center" }}>
        <div style={inner}>
          <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 3.5vw, 4rem)", fontWeight: 900, marginBottom: "1rem" }}>
            Ready to Work <span style={{ color: "#22d3ee" }}>Together?</span>
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "clamp(1rem, 1.3vw, 1.3rem)", marginBottom: "2.5rem" }}>Let's discuss your project and get it done right.</p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "1rem" }}>
            <Link to="/contact" style={{ padding: "clamp(12px, 1.2vw, 18px) clamp(32px, 3vw, 56px)", backgroundColor: "#06b6d4", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "background-color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
            >Get In Touch →</Link>
            <Link to="/pricing" style={{ padding: "clamp(12px, 1.2vw, 18px) clamp(32px, 3vw, 56px)", border: "1px solid rgba(255,255,255,0.2)", color: "#ffffff", borderRadius: "10px", textDecoration: "none", fontWeight: 700, fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)", transition: "all 0.2s", backgroundColor: "transparent" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#22d3ee"; e.currentTarget.style.color = "#22d3ee"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#ffffff"; }}
            >View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
};
