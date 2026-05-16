import { createContext, useContext, useState, useEffect } from "react";
import {
  SERVICES,
  PORTFOLIO_ITEMS,
  TESTIMONIALS,
  SKILLS,
  EXPERIENCE_TIMELINE,
  CERTIFICATIONS,
  PRICING_PACKAGES,
  SITE_OWNER,
} from "../data/constants";

// ─────────────────────────────────────────────────────────────
// SITE DATA CONTEXT
//
// This is the single source of truth for ALL site content.
// Admin panel writes here → public pages read from here.
// Data is persisted in localStorage so changes survive refresh.
//
// WHEN BACKEND IS READY — replace localStorage calls with:
//   GET  /api/services        → initial fetch
//   POST /api/services        → on add
//   PUT  /api/services/:id    → on update
//   DELETE /api/services/:id  → on delete
//   (same pattern for all other data types)
// ─────────────────────────────────────────────────────────────

const SiteDataContext = createContext(null);

// Keys used in localStorage
const KEYS = {
  services:    "se_services",
  portfolio:   "se_portfolio",
  testimonials:"se_testimonials",
  skills:      "se_skills",
  timeline:    "se_timeline",
  certs:       "se_certs",
  pricing:     "se_pricing",
  owner:       "se_owner",
};

// Helper: load from localStorage or fall back to default
const load = (key, fallback) => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

// Helper: save to localStorage
const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch (e) { console.error("Storage error:", e); }
};

export const SiteDataProvider = ({ children }) => {
  // ── State ─────────────────────────────────────────────────
  const [services,     setServices]     = useState(() => load(KEYS.services,     SERVICES));
  const [portfolio,    setPortfolio]    = useState(() => load(KEYS.portfolio,    PORTFOLIO_ITEMS));
  const [testimonials, setTestimonials] = useState(() => load(KEYS.testimonials, TESTIMONIALS));
  const [skills,       setSkills]       = useState(() => load(KEYS.skills,       SKILLS));
  const [timeline,     setTimeline]     = useState(() => load(KEYS.timeline,     EXPERIENCE_TIMELINE));
  const [certs,        setCerts]        = useState(() => load(KEYS.certs,        CERTIFICATIONS));
  const [pricing,      setPricing]      = useState(() => load(KEYS.pricing,      PRICING_PACKAGES));
  const [owner,        setOwner]        = useState(() => load(KEYS.owner,        SITE_OWNER));

  // ── Persist on every change ───────────────────────────────
  useEffect(() => save(KEYS.services,     services),     [services]);
  useEffect(() => save(KEYS.portfolio,    portfolio),    [portfolio]);
  useEffect(() => save(KEYS.testimonials, testimonials), [testimonials]);
  useEffect(() => save(KEYS.skills,       skills),       [skills]);
  useEffect(() => save(KEYS.timeline,     timeline),     [timeline]);
  useEffect(() => save(KEYS.certs,        certs),        [certs]);
  useEffect(() => save(KEYS.pricing,      pricing),      [pricing]);
  useEffect(() => save(KEYS.owner,        owner),        [owner]);

  // ── Generic CRUD factory ──────────────────────────────────
  const makeCRUD = (setter) => ({
    add:    (item)     => setter(prev => [...prev, { ...item, id: Date.now() }]),
    update: (id, data) => setter(prev => prev.map(i => i.id === id ? { ...i, ...data } : i)),
    remove: (id)       => setter(prev => prev.filter(i => i.id !== id)),
    reorder:(items)    => setter(items),
  });

  // ── Owner profile update ──────────────────────────────────
  const updateOwner = (data) => setOwner(prev => ({ ...prev, ...data }));

  // ── Reset to defaults (useful for testing) ────────────────
  const resetAll = () => {
    setServices(SERVICES);           save(KEYS.services,     SERVICES);
    setPortfolio(PORTFOLIO_ITEMS);   save(KEYS.portfolio,    PORTFOLIO_ITEMS);
    setTestimonials(TESTIMONIALS);   save(KEYS.testimonials, TESTIMONIALS);
    setSkills(SKILLS);               save(KEYS.skills,       SKILLS);
    setTimeline(EXPERIENCE_TIMELINE);save(KEYS.timeline,     EXPERIENCE_TIMELINE);
    setCerts(CERTIFICATIONS);        save(KEYS.certs,        CERTIFICATIONS);
    setPricing(PRICING_PACKAGES);    save(KEYS.pricing,      PRICING_PACKAGES);
    setOwner(SITE_OWNER);            save(KEYS.owner,        SITE_OWNER);
  };

  return (
    <SiteDataContext.Provider value={{
      // ── Data ──────────────────────────────────────────────
      services, portfolio, testimonials,
      skills, timeline, certs, pricing, owner,
      // ── CRUD ──────────────────────────────────────────────
      servicesOps:     makeCRUD(setServices),
      portfolioOps:    makeCRUD(setPortfolio),
      testimonialsOps: makeCRUD(setTestimonials),
      certsOps:        makeCRUD(setCerts),
      // ── Special handlers ──────────────────────────────────
      updateOwner,
      updateSkills:    setSkills,
      updateTimeline:  setTimeline,
      updatePricing:   setPricing,
      resetAll,
    }}>
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSiteData must be used inside <SiteDataProvider>");
  return ctx;
};
