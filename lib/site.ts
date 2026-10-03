export const site = {
  name: "Waleed Ahmad",
  role: "WordPress Developer & UI/UX Designer",
  title: "Waleed Ahmad — WordPress Developer & UI/UX Designer",
  description:
    "Waleed Ahmad is a WordPress developer and UI/UX designer based in Abbottabad, Pakistan — fast, responsive, conversion-focused websites for businesses, agencies and online stores.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  location: "Abbottabad, Pakistan",
  email: "waleedaw778@gmail.com",
  whatsapp: "https://wa.me/923215459190",
  phone: "0321 5459190",
  socials: {
    instagram: "https://www.instagram.com/waleed_webstudio/",
    linkedin: "https://www.linkedin.com/in/waleed-ahmad-b95665268/",
    fiverr: "https://www.fiverr.com/waleed_dev7",
    pinterest: "https://www.pinterest.com/waleedaw778/",
  },
};

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export const stats = [
  { prefix: "", to: 9, suffix: "+", label: "Website projects", note: "Delivered across real industries" },
  { prefix: "", to: 100, suffix: "%", label: "Responsive builds", note: "Mobile, tablet and desktop tested" },
  { prefix: "< ", to: 24, suffix: "h", label: "Reply time", note: "On every new enquiry" },
  { prefix: "", to: 5, suffix: "+", label: "Industries served", note: "Real estate to eCommerce" },
];

export const services = [
  { icon: "layout", title: "Business Websites", text: "Professional multi-page WordPress sites that represent your business properly and rank well." },
  { icon: "cart", title: "WooCommerce Stores", text: "Full online stores — product pages, checkout and payments — built to sell." },
  { icon: "target", title: "Landing Pages", text: "Focused, single-goal pages designed to turn visitors into leads." },
  { icon: "star", title: "Elementor Builds", text: "Fast, flexible builds you can edit yourself after handover." },
  { icon: "pen", title: "UI/UX Design", text: "Clean web and app interfaces, prototyped and ready to hand off to development." },
  { icon: "refresh", title: "Website Redesign", text: "Bring an outdated site up to modern design and performance standards." },
  { icon: "gauge", title: "Speed Optimisation", text: "Caching, image and script clean-up so your site loads fast on any device." },
  { icon: "shield", title: "Maintenance & Support", text: "Updates, backups and quick fixes so your site keeps running smoothly." },
] as const;

export const why = [
  { title: "Strategy before pixels", text: "Every project starts with your goals and audience, not a recycled template." },
  { title: "Modern, considered design", text: "Clean layouts and confident typography that keep a brand looking current." },
  { title: "Built to be fast", text: "Lean code, optimised media and caching so pages load quickly everywhere." },
  { title: "Responsive by default", text: "Tested on desktop, tablet and mobile before anything goes live." },
  { title: "Clear communication", text: "Honest timelines and updates from kickoff to delivery." },
  { title: "Attention to detail", text: "Spacing, alignment and colour consistency are never an afterthought." },
];

export const steps = [
  { tag: "Discover", title: "Understanding the goal", text: "A short conversation to understand your brand, audience and what the project must achieve." },
  { tag: "Plan", title: "Setting the direction", text: "Content, layout and visual approach agreed before any final design work begins." },
  { tag: "Design", title: "Designing the experience", text: "Polished mockups, refined through focused feedback rounds." },
  { tag: "Develop", title: "Building it out", text: "Approved designs become a fully responsive, high-performing WordPress website." },
  { tag: "Deliver", title: "Testing & launch", text: "Final testing, performance checks and a clean handover — with support if you need it." },
];

export const projectTypes = [
  "WordPress Website",
  "WooCommerce Store",
  "Landing Page",
  "UI/UX Design",
  "Website Redesign",
  "Something Else",
];
