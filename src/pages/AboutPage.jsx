import { Link } from "react-router-dom";
import {
  SITE_OWNER,
  SKILLS,
  EXPERIENCE_TIMELINE,
  CERTIFICATIONS,
  SOCIAL_LINKS,
  STATS,
} from "../data/constants";

const inner = { width: "100%", padding: "0 clamp(1.5rem, 5vw, 6rem)" };
const section = (bg) => ({
  width: "100%",
  padding: "6rem 0",
  backgroundColor: bg || "#050816",
});

// ── Skill Bar ─────────────────────────────────────────────────
const SkillBar = ({ name, level }) => (
  <div style={{ marginBottom: "1.25rem" }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "6px",
      }}
    >
      <span
        style={{
          color: "#d1d5db",
          fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
          fontWeight: 500,
        }}
      >
        {name}
      </span>
      <span
        style={{
          color: "#22d3ee",
          fontSize: "clamp(0.8rem, 1vw, 1rem)",
          fontWeight: 700,
        }}
      >
        {level}%
      </span>
    </div>
    <div
      style={{
        height: "8px",
        backgroundColor: "rgba(255,255,255,0.08)",
        borderRadius: "9999px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${level}%`,
          borderRadius: "9999px",
          background: "linear-gradient(90deg, #06b6d4, #22d3ee)",
          transition: "width 1s ease",
        }}
      />
    </div>
  </div>
);

// ── Timeline Item ─────────────────────────────────────────────
const TimelineItem = ({ item, isLast }) => (
  <div style={{ display: "flex", gap: "1.5rem", position: "relative" }}>
    {/* Line + dot */}
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "9999px",
          backgroundColor: "#22d3ee",
          border: "3px solid #050816",
          flexShrink: 0,
          zIndex: 1,
        }}
      />
      {!isLast && (
        <div
          style={{
            width: "2px",
            flex: 1,
            backgroundColor: "rgba(34,211,238,0.2)",
            marginTop: "4px",
          }}
        />
      )}
    </div>
    {/* Content */}
    <div style={{ paddingBottom: isLast ? 0 : "2.5rem", flex: 1 }}>
      <span
        style={{
          color: "#22d3ee",
          fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
          fontWeight: 700,
          letterSpacing: "1px",
        }}
      >
        {item.year}
      </span>
      <h4
        style={{
          color: "#ffffff",
          fontSize: "clamp(1rem, 1.3vw, 1.25rem)",
          fontWeight: 700,
          margin: "4px 0",
        }}
      >
        {item.role}
      </h4>
      <p
        style={{
          color: "#06b6d4",
          fontSize: "clamp(0.8rem, 1vw, 1rem)",
          marginBottom: "8px",
          fontWeight: 500,
        }}
      >
        {item.company}
      </p>
      <p
        style={{
          color: "#9ca3af",
          fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
          lineHeight: 1.7,
        }}
      >
        {item.desc}
      </p>
    </div>
  </div>
);

export const AboutPage = () => (
  <div style={{ paddingTop: "6rem" }}>
    {/* ── Hero ───────────────────────────────────────────────── */}
    <section style={{ ...section("#070b1d"), padding: "5rem 0 6rem" }}>
      <div style={inner}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Photo */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              {/* Glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-20px",
                  borderRadius: "9999px",
                  background:
                    "radial-gradient(circle, rgba(6,182,212,0.25) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
              {/* Photo or initials */}
              <div
                style={{
                  position: "relative",
                  width: "clamp(200px, 20vw, 280px)",
                  height: "clamp(200px, 20vw, 280px)",
                  borderRadius: "9999px",
                  background: SITE_OWNER.photo
                    ? `url(${SITE_OWNER.photo}) center/cover`
                    : "linear-gradient(135deg, #0d1224, #0a1628)",
                  border: "3px solid rgba(34,211,238,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 900,
                  color: "#22d3ee",
                  boxShadow: "0 0 60px rgba(6,182,212,0.2)",
                }}
              >
                {!SITE_OWNER.photo && "SE"}
              </div>

              {/* Available badge */}
              {SITE_OWNER.available && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    right: "0",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "9999px",
                      backgroundColor: "#10b981",
                      animation: "ping 1.5s ease-in-out infinite",
                    }}
                  />
                  <span
                    style={{
                      color: "#10b981",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    Available for Work
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <p
              style={{
                color: "#22d3ee",
                textTransform: "uppercase",
                letterSpacing: "4px",
                fontSize: "clamp(0.75rem, 1vw, 0.9rem)",
                marginBottom: "0.75rem",
              }}
            >
              About Me
            </p>
            <h1
              style={{
                color: "#ffffff",
                fontSize: "clamp(2.25rem, 4vw, 4.5rem)",
                fontWeight: 900,
                lineHeight: 1.15,
                marginBottom: "0.5rem",
              }}
            >
              {SITE_OWNER.name}
            </h1>
            <p
              style={{
                color: "#22d3ee",
                fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              {SITE_OWNER.title}
            </p>
            <p
              style={{
                color: "#d1d5db",
                fontSize: "clamp(0.9rem, 1.2vw, 1.15rem)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              {SITE_OWNER.bio}
            </p>
            <p
              style={{
                color: "#9ca3af",
                fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {SITE_OWNER.bio2}
            </p>

            {/* Stats row */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  style={{
                    textAlign: "center",
                    padding: "1rem",
                    borderRadius: "12px",
                    backgroundColor: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <h3
                    style={{
                      color: "#22d3ee",
                      fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                      fontWeight: 900,
                    }}
                  >
                    {s.value}
                  </h3>
                  <p
                    style={{
                      color: "#9ca3af",
                      fontSize: "clamp(0.65rem, 0.9vw, 0.85rem)",
                      marginTop: "2px",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link
                to="/contact"
                style={{
                  padding: "clamp(12px, 1.2vw, 18px) clamp(24px, 2.5vw, 40px)",
                  backgroundColor: "#06b6d4",
                  color: "#ffffff",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#22d3ee")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#06b6d4")
                }
              >
                Hire Me
              </Link>

              <a
                href="/cv.pdf"
                download
                style={{
                  padding: "clamp(12px, 1.2vw, 18px) clamp(24px, 2.5vw, 40px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 700,
                  fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                  transition: "all 0.2s",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#22d3ee";
                  e.currentTarget.style.color = "#22d3ee";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                📄 Download CV
              </a>

              {/* Social links */}
              {Object.entries(SOCIAL_LINKS).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding:
                      "clamp(12px, 1.2vw, 18px) clamp(16px, 1.5vw, 24px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#9ca3af",
                    borderRadius: "10px",
                    textDecoration: "none",
                    fontWeight: 600,
                    fontSize: "clamp(0.8rem, 1vw, 1rem)",
                    transition: "all 0.2s",
                    backgroundColor: "transparent",
                    textTransform: "capitalize",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#22d3ee";
                    e.currentTarget.style.color = "#22d3ee";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "#9ca3af";
                  }}
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ── Skills ─────────────────────────────────────────────── */}
    <section style={section()}>
      <div style={inner}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#22d3ee",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "clamp(0.75rem, 1vw, 1rem)",
              marginBottom: "0.75rem",
            }}
          >
            My Expertise
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              fontWeight: 900,
            }}
          >
            Skills & Proficiency
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gap: "2.5rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {SKILLS.map((group) => (
            <div
              key={group.category}
              style={{
                padding: "clamp(1.5rem, 2vw, 2.5rem)",
                borderRadius: "1.5rem",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <h3
                style={{
                  color: "#22d3ee",
                  fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  marginBottom: "1.5rem",
                }}
              >
                {group.category}
              </h3>
              {group.items.map((skill) => (
                <SkillBar key={skill.name} {...skill} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── Experience Timeline ─────────────────────────────────── */}
    <section style={section("#070b1d")}>
      <div style={inner}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#22d3ee",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "clamp(0.75rem, 1vw, 1rem)",
              marginBottom: "0.75rem",
            }}
          >
            My Journey
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              fontWeight: 900,
            }}
          >
            Experience
          </h2>
        </div>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {EXPERIENCE_TIMELINE.map((item, i) => (
            <TimelineItem
              key={item.year}
              item={item}
              isLast={i === EXPERIENCE_TIMELINE.length - 1}
            />
          ))}
        </div>
      </div>
    </section>

    {/* ── Certifications ─────────────────────────────────────── */}
    <section style={section()}>
      <div style={inner}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p
            style={{
              color: "#22d3ee",
              textTransform: "uppercase",
              letterSpacing: "3px",
              fontSize: "clamp(0.75rem, 1vw, 1rem)",
              marginBottom: "0.75rem",
            }}
          >
            Credentials
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              fontWeight: 900,
            }}
          >
            Certifications
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gap: "1.25rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          }}
        >
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.name}
              style={{
                padding: "1.5rem",
                borderRadius: "1.25rem",
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#22d3ee")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
              }
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(34,211,238,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  flexShrink: 0,
                }}
              >
                🏆
              </div>
              <div>
                <h4
                  style={{
                    color: "#ffffff",
                    fontWeight: 700,
                    fontSize: "clamp(0.875rem, 1.1vw, 1.1rem)",
                  }}
                >
                  {cert.name}
                </h4>
                <p
                  style={{
                    color: "#9ca3af",
                    fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)",
                  }}
                >
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ────────────────────────────────────────────────── */}
    <section style={{ ...section("#070b1d"), textAlign: "center" }}>
      <div style={inner}>
        <h2
          style={{
            color: "#ffffff",
            fontSize: "clamp(2rem, 3.5vw, 4rem)",
            fontWeight: 900,
            marginBottom: "1rem",
          }}
        >
          Ready to Work <span style={{ color: "#22d3ee" }}>Together?</span>
        </h2>
        <p
          style={{
            color: "#9ca3af",
            fontSize: "clamp(1rem, 1.3vw, 1.3rem)",
            marginBottom: "2.5rem",
          }}
        >
          Let's discuss your project and get it done right.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            to="/contact"
            style={{
              padding: "clamp(12px, 1.2vw, 18px) clamp(32px, 3vw, 56px)",
              backgroundColor: "#06b6d4",
              color: "#ffffff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#22d3ee")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#06b6d4")
            }
          >
            Get In Touch →
          </Link>
          <Link
            to="/pricing"
            style={{
              padding: "clamp(12px, 1.2vw, 18px) clamp(32px, 3vw, 56px)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#ffffff",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "clamp(0.875rem, 1.1vw, 1.2rem)",
              transition: "all 0.2s",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#22d3ee";
              e.currentTarget.style.color = "#22d3ee";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.color = "#ffffff";
            }}
          >
            View Pricing
          </Link>
        </div>
      </div>
    </section>

    <style>{`@keyframes ping { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
  </div>
);
