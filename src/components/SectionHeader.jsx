export const SectionHeader = ({ eyebrow, title, subtitle }) => (
  <div style={{ textAlign: "center", marginBottom: "4rem" }}>
    <p style={{ color: "#22d3ee", textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
      {eyebrow}
    </p>
    <h2 style={{ color: "#ffffff", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, marginBottom: "1rem" }}>
      {title}
    </h2>
    {subtitle && (
      <p style={{ color: "#9ca3af", maxWidth: "42rem", margin: "0 auto", lineHeight: 1.7 }}>
        {subtitle}
      </p>
    )}
  </div>
);
