// ─────────────────────────────────────────────
// STATIC DATA — replace these with API calls
// when you integrate your backend/database.
// ─────────────────────────────────────────────

export const SERVICES = [
  {
    id: 1,
    icon: "🌐",
    title: "Website Development",
    shortDesc:
      "Modern responsive websites built with clean UI, performance and scalability in mind.",
    fullDesc:
      "We build fast, modern, and responsive websites tailored to your business needs. From landing pages to full-stack web applications, every project is crafted with clean code, SEO best practices, and scalability in mind.",
    features: [
      "Custom responsive design",
      "SEO-optimized structure",
      "Performance-first architecture",
      "CMS integration (WordPress, Shopify, etc.)",
      "Cross-browser compatibility",
    ],
  },
  {
    id: 2,
    icon: "⚡",
    title: "Digital Solutions",
    shortDesc:
      "Professional digital services focused on business growth and online presence.",
    fullDesc:
      "We provide end-to-end digital solutions including e-commerce setup, product data management, CSV imports/exports, and automation workflows that save your team hours every week.",
    features: [
      "Shopify & WooCommerce setup",
      "Bulk product uploads via CSV",
      "Variant & inventory mapping",
      "Automation workflows",
      "Platform migrations",
    ],
  },
  {
    id: 3,
    icon: "🎨",
    title: "Creative Design",
    shortDesc:
      "Creative UI/UX design solutions with modern layouts and interactive experiences.",
    fullDesc:
      "Our design team creates visually compelling interfaces that convert visitors into customers. We focus on user experience, accessibility, and brand consistency across all touchpoints.",
    features: [
      "UI/UX wireframing & prototyping",
      "Brand identity design",
      "Landing page design",
      "Icon & illustration design",
      "Figma / Adobe XD deliverables",
    ],
  },
  {
    id: 4,
    icon: "📈",
    title: "Business Growth",
    shortDesc:
      "Helping brands improve visibility, engagement and customer experience online.",
    fullDesc:
      "We partner with brands to boost online visibility through targeted strategies, conversion-optimized funnels, and data-driven decisions that translate into measurable growth.",
    features: [
      "Conversion rate optimization",
      "Digital marketing strategy",
      "Analytics & reporting setup",
      "Customer experience audits",
      "Competitive analysis",
    ],
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "5000+ Shopify Products Upload",
    category: "E-commerce",
    description:
      "Managed and uploaded over 5,000 product listings to a Shopify store, including images, variants, pricing, and SEO metadata — all within a tight deadline.",
    tags: ["Shopify", "CSV", "Data Management"],
    color: "from-cyan-500/30 to-blue-500/10",
  },
  {
    id: 2,
    title: "WooCommerce CSV Import System",
    category: "Automation",
    description:
      "Built a streamlined CSV import pipeline for a WooCommerce store, handling complex product attributes, categories, and inventory syncing.",
    tags: ["WooCommerce", "PHP", "Automation"],
    color: "from-purple-500/30 to-cyan-500/10",
  },
  {
    id: 3,
    title: "Variant Mapping Store",
    category: "E-commerce",
    description:
      "Created a custom variant mapping solution for a fashion brand, allowing seamless product customization across sizes, colors, and materials.",
    tags: ["Shopify", "Variant Mapping", "Custom"],
    color: "from-blue-500/30 to-purple-500/10",
  },
  {
    id: 4,
    title: "Bulk Product Automation",
    category: "Automation",
    description:
      "Developed an automated bulk product management system that syncs inventory, updates pricing, and manages listings across multiple platforms simultaneously.",
    tags: ["Python", "API", "Automation"],
    color: "from-teal-500/30 to-cyan-500/10",
  },
  {
    id: 5,
    title: "Custom Shopify Theme",
    category: "Web Development",
    description:
      "Designed and developed a custom Shopify theme from scratch with unique animations, fast load times, and mobile-first design.",
    tags: ["Shopify", "Liquid", "CSS"],
    color: "from-cyan-500/30 to-teal-500/10",
  },
  {
    id: 6,
    title: "Multi-Vendor Marketplace",
    category: "Web Development",
    description:
      "Built a full-featured multi-vendor marketplace platform supporting vendor onboarding, commission management, and order routing.",
    tags: ["WooCommerce", "PHP", "MySQL"],
    color: "from-indigo-500/30 to-blue-500/10",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "John Smith",
    title: "Store Owner, USA",
    rating: 5,
    review:
      "Excellent work on Shopify product uploads. Very professional and fast delivery. Will definitely work again!",
  },
  {
    id: 2,
    name: "Sarah Wilson",
    title: "E-commerce Manager, UK",
    rating: 5,
    review:
      "Amazing communication and perfectly handled CSV variants for our store. Saved us days of manual work.",
  },
  {
    id: 3,
    name: "David Lee",
    title: "Entrepreneur, Canada",
    rating: 5,
    review:
      "Highly recommended for WooCommerce bulk uploads and customization. Delivered beyond expectations.",
  },
  {
    id: 4,
    name: "Emma Johnson",
    title: "Digital Agency Owner, Australia",
    rating: 5,
    review:
      "Outstanding web development skills. The website looks fantastic and loads super fast. Our conversions have improved significantly.",
  },
  {
    id: 5,
    name: "Ahmed Hassan",
    title: "Retail Brand, UAE",
    rating: 5,
    review:
      "Professional, reliable and highly skilled. Managed our entire product catalog migration flawlessly.",
  },
  {
    id: 6,
    name: "Maria Garcia",
    title: "Fashion Boutique, Spain",
    rating: 5,
    review:
      "The variant mapping solution was exactly what we needed. Clean code, great communication, delivered on time.",
  },
];

export const STATS = [
  { value: "100+", label: "Projects Completed" },
  { value: "5+", label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
  { value: "50+", label: "Happy Clients" },
];

export const HERO_CARDS = [
  { label: "Shopify Upload", title: "Professional Solutions" },
  { label: "CSV Management", title: "Creative Digital Services" },
  { label: "WooCommerce", title: "Modern Web Experiences" },
];

export const CONTACT_INFO = [
  {
    icon: "📧",
    label: "Email",
    value: "info@saleemiexpert.com",
    href: "mailto:info@saleemiexpert.com",
  },
  {
    icon: "💬",
    label: "WhatsApp",
    value: "+1 (555) 000-0000",
    href: "https://wa.me/15550000000",
  },
  {
    icon: "📍",
    label: "Location",
    value: "Available Worldwide",
    href: null,
  },
];
