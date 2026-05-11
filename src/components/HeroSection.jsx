import { Link } from "react-router-dom";
import { STATS, HERO_CARDS } from "../data/constants";

export const HeroSection = () => {
  return (
    <section className="px-6 pb-20 pt-36" style={{ backgroundColor: "#050816" }}>
      <div className="grid items-center gap-12 mx-auto max-w-7xl lg:grid-cols-2">

        {/* Left Content */}
        <div>
          <p
            className="uppercase tracking-[4px] text-sm mb-4"
            style={{ color: "#22d3ee" }}
          >
            Professional Digital Services
          </p>

          <h1
            className="mb-6 text-5xl font-black leading-tight md:text-6xl"
            style={{ color: "#ffffff" }}
          >
            Professional Digital
            <span className="block" style={{ color: "#22d3ee" }}>
              Solutions & Services
            </span>
          </h1>

          <p className="max-w-xl mb-8 text-lg leading-relaxed" style={{ color: "#d1d5db" }}>
            Helping businesses grow with professional web solutions, digital
            services, responsive websites, ecommerce support and modern online
            experiences.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 font-semibold rounded-xl"
              style={{ backgroundColor: "#06b6d4", color: "#ffffff" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#22d3ee"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#06b6d4"}
            >
              Get Started
            </Link>

            <Link
              to="/portfolio"
              className="px-8 py-4 font-semibold rounded-xl"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#ffffff",
                backgroundColor: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "#22d3ee";
                e.currentTarget.style.color = "#22d3ee";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              View Portfolio
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 mt-14 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <h2 className="text-3xl font-bold" style={{ color: "#22d3ee" }}>
                  {stat.value}
                </h2>
                <p className="text-sm" style={{ color: "#9ca3af" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Floating Card */}
        <div className="relative flex justify-center">
          <div
            className="absolute rounded-full w-80 h-80 blur-3xl"
            style={{ backgroundColor: "rgba(6,182,212,0.2)" }}
          />

          <div
            className="relative w-full max-w-md p-8 rounded-3xl shadow-2xl backdrop-blur-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <div className="space-y-6">
              {HERO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="p-5 rounded-2xl"
                  style={{
                    backgroundColor: "#0d1224",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <p className="mb-2 text-sm" style={{ color: "#9ca3af" }}>
                    {card.label}
                  </p>
                  <h3 className="text-xl font-bold" style={{ color: "#ffffff" }}>
                    {card.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
