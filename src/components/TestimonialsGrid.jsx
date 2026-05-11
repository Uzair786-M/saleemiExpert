const StarRating = ({ rating }) => (
  <div style={{ display: "flex", gap: "4px", marginBottom: "1.25rem" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <span key={star} style={{ fontSize: "1.25rem", color: star <= rating ? "#facc15" : "#374151" }}>★</span>
    ))}
  </div>
);

export const TestimonialCard = ({ item }) => (
  <div style={{
    padding: "2rem",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "1.5rem",
    backgroundColor: "rgba(255,255,255,0.05)",
    display: "flex",
    flexDirection: "column",
  }}>
    <StarRating rating={item.rating} />
    <p style={{ color: "#d1d5db", lineHeight: 1.7, flex: 1, marginBottom: "1.5rem" }}>
      "{item.review}"
    </p>
    <div>
      <h4 style={{ color: "#ffffff", fontSize: "1.1rem", fontWeight: 700 }}>{item.name}</h4>
      <p style={{ color: "#9ca3af", fontSize: "0.875rem" }}>{item.title ?? "Verified Client"}</p>
    </div>
  </div>
);

export const TestimonialsGrid = ({ testimonials }) => (
  <div style={{ display: "grid", gap: "2rem", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
    {testimonials.map((item) => (
      <TestimonialCard key={item.id} item={item} />
    ))}
  </div>
);
