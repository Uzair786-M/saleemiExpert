export const PortfolioCard = ({ item }) => (
  <div
    style={{
      position: "relative", display: "flex", flexDirection: "column",
      justifyContent: "flex-end", padding: "clamp(1.25rem, 2vw, 2rem)",
      overflow: "hidden", borderRadius: "1.5rem",
      border: "1px solid rgba(255,255,255,0.1)",
      height: "clamp(16rem, 20vw, 26rem)",
      background: "linear-gradient(135deg, rgba(6,182,212,0.25), rgba(99,102,241,0.1))",
      transition: "transform 0.3s, border-color 0.3s", cursor: "pointer",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)"; }}
    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
  >
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%)" }} />
    <div style={{ position: "relative", zIndex: 1 }}>
      <span style={{ color: "#22d3ee", fontSize: "clamp(0.7rem, 0.9vw, 1rem)", textTransform: "uppercase", letterSpacing: "0.1em", display: "block", marginBottom: "0.5rem" }}>
        {item.category}
      </span>
      <h3 style={{ color: "#ffffff", fontSize: "clamp(1rem, 1.4vw, 1.75rem)", fontWeight: 700, marginBottom: "0.5rem" }}>
        {item.title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.75rem" }}>
        {item.tags.map(tag => (
          <span key={tag} style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.9rem)", padding: "3px 12px", borderRadius: "9999px", backgroundColor: "rgba(255,255,255,0.1)", color: "#d1d5db" }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export const PortfolioGrid = ({ items }) => (
  <div style={{ display: "grid", gap: "clamp(1rem, 2vw, 2rem)", gridTemplateColumns: "repeat(auto-fit, minmax(clamp(240px, 25vw, 380px), 1fr))" }}>
    {items.map(item => <PortfolioCard key={item.id} item={item} />)}
  </div>
);
