// ─────────────────────────────────────────────────────────────────
// API SERVICE LAYER
// Currently uses static data from constants.js.
// To connect your backend, replace the functions below with real
// fetch() / axios calls to your REST or GraphQL endpoints.
//
// Example swap:
//   Before: return TESTIMONIALS;
//   After:  const res = await fetch('/api/testimonials'); return res.json();
// ─────────────────────────────────────────────────────────────────

import {
  SERVICES,
  PORTFOLIO_ITEMS,
  TESTIMONIALS,
  STATS,
} from "../data/constants";

// Simulated network delay (remove when using real API)
const delay = (ms = 0) => new Promise((res) => setTimeout(res, ms));

// ── Services ──────────────────────────────────────────────────────
export const fetchServices = async () => {
  await delay();
  // TODO: return fetch('/api/services').then(r => r.json());
  return SERVICES;
};

export const fetchServiceById = async (id) => {
  await delay();
  return SERVICES.find((s) => s.id === id) ?? null;
};

// ── Portfolio ─────────────────────────────────────────────────────
export const fetchPortfolioItems = async () => {
  await delay();
  // TODO: return fetch('/api/portfolio').then(r => r.json());
  return PORTFOLIO_ITEMS;
};

// ── Testimonials ──────────────────────────────────────────────────
export const fetchTestimonials = async () => {
  await delay();
  // TODO: return fetch('/api/testimonials').then(r => r.json());
  return TESTIMONIALS;
};

// ── Stats ─────────────────────────────────────────────────────────
export const fetchStats = async () => {
  await delay();
  return STATS;
};

// ── Contact Form Submission ────────────────────────────────────────
export const submitContactForm = async (formData) => {
  await delay(800); // simulate network round-trip

  // TODO: replace with your real endpoint:
  // const res = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  // if (!res.ok) throw new Error('Failed to send message');
  // return res.json();

  console.log("Contact form submitted:", formData);
  return { success: true, message: "Message sent successfully!" };
};
