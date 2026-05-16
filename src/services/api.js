// ─────────────────────────────────────────────────────────────
// API SERVICE LAYER
//
// Public pages now read directly from SiteDataContext.
// These functions are kept for backward compatibility and
// for when you connect a real backend.
//
// TO CONNECT BACKEND: replace each function body with a
// real fetch() call to your REST API endpoint.
// ─────────────────────────────────────────────────────────────

// Contact form submission
export const submitContactForm = async (formData) => {
  await new Promise(r => setTimeout(r, 800)); // remove when using real API

  // TODO: replace with:
  // const res = await fetch('/api/contact', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(formData),
  // });
  // if (!res.ok) throw new Error('Failed to send message');
  // return res.json();

  console.log("Contact form submitted:", formData);
  return { success: true };
};
