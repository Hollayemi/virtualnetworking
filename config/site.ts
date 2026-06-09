export const siteConfig = {
  name: "ConnectFlow",
  tagline: "Structured Networking for Premium Events",
  logo: "/images/logo/logo.png",
  description:
    "ConnectFlow is a premium networking infrastructure that transforms conferences, summits, and professional gatherings into structured, monetizable networking environments. Connect with VIP attendees, earn credits through meaningful engagement, and provide organizers with measurable networking outcomes.",
  
  // Core platform value propositions
  valueProps: [
    "Controlled access to VIP and high-value attendees",
    "Credit-based networking economy with cashback rewards",
    "Structured connection requests and meeting scheduling",
    "Verified profiles and smart icebreakers",
    "Post-event networking with paid extensions",
  ],

  // URLs
  url: "https://connectflow.io",
  dashboardUrl: "https://app.connectflow.io",
  
  // Company / Platform info
  platform: {
    founded: 2024,
    type: "B2B SaaS Event Networking Platform",
    targetMarkets: ["Conferences", "Summits", "Professional Associations", "Startup Communities"],
    integrationMethods: ["CSV Upload", "Webhook Integration", "Networking Access Links"],
  },

  // Contact & Support
  contact: {
    sales: "sales@connectflow.io",
    support: "support@connectflow.io",
    partners: "partners@connectflow.io",
    security: "security@connectflow.io",
    phone: "+44 20 1234 5678",
    address: "London, United Kingdom",
    activeHours: "Monday - Friday, 9:00 - 18:00 GMT",
    helpCenter: "/help",
    status: "/status",
  },

  // Navigation
  nav: [
    { label: "Home", href: "/" },
    { label: "For Organizers", href: "/organizers" },
    { label: "For Attendees", href: "/attendees" },
    { label: "For Sponsors", href: "/sponsors" },
    { label: "Pricing", href: "/pricing" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Resources", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],

  // Footer navigation (grouped)
  footerNav: {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
      { label: "Roadmap", href: "/roadmap" },
      { label: "Changelog", href: "/changelog" },
    ],
    solutions: [
      { label: "For Conference Organizers", href: "/solutions/conferences" },
      { label: "For Summit Organizers", href: "/solutions/summits" },
      { label: "For Professional Associations", href: "/solutions/associations" },
      { label: "For Startup Communities", href: "/solutions/startups" },
      { label: "For Sponsors & Exhibitors", href: "/solutions/sponsors" },
    ],
    resources: [
      { label: "Help Center", href: "/help" },
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Webinars", href: "/webinars" },
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/api-docs" },
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },

  // Monetization
  monetization: {
    organizerPlans: ["Per Event", "Monthly Subscription", "Annual Subscription"],
    creditPacks: [
      { credits: 25, price: "$9", pricePerCredit: "$0.36" },
      { credits: 60, price: "$19", pricePerCredit: "$0.32" },
      { credits: 150, price: "$39", pricePerCredit: "$0.26" },
      { credits: 500, price: "$99", pricePerCredit: "$0.20" },
    ],
    vipPass: {
      name: "VIP Networking Pass",
      price: "$49",
      benefits: ["Unlimited connection requests", "Priority messaging", "Premium visibility", "Verified badge"],
    },
    postEventAccess: {
      price: "$19",
      durationDays: 30,
    },
  },

  // Key metrics (from PRD)
  metrics: {
    networking: ["Connection requests", "Accepted connections", "Messages exchanged", "Meetings scheduled"],
    event: ["Registrations", "Attendance engagement"],
    revenue: ["Credit purchases", "VIP pass purchases", "Organizer subscriptions"],
  },

  // Core features (MVP + High-Leverage)
  features: {
    mvp: [
      "Event creation and management",
      "Attendee profiles with networking goals",
      "Attendee discovery with filters",
      "Connection request flow (request → accept → message → schedule)",
      "Connected messaging",
      "Meeting scheduling with calendar invites",
    ],
    highLeverage: [
      "VIP Access Gate - Spend credits to connect with VIPs",
      "Networking Credits Economy - Purchase or earn credits",
      "VIP Cashback Rewards - VIPs earn credits for accepting requests",
      "Verified Profiles - LinkedIn, email domain, or organizer verification",
      "Networking Intention Tags - Hiring, Investment, Partnership, Mentorship, Sales",
      "Networking Availability Slots - Set when you're available to meet",
    ],
    engagement: [
      "Networking Map - Visual attendee grouping by industry or role",
      "Digital Business Cards - Shareable QR code cards",
      "Event Leaderboard - Gamified rankings with credit rewards",
      "Smart Icebreakers - Conversation prompts based on shared interests",
      "Post-Event Networking - Paid extension after event ends",
    ],
  },

  // Integration options
  integrations: {
    methods: [
      { type: "CSV Upload", description: "Upload attendee lists via CSV with name, email, company, role, ticket tier" },
      { type: "Webhook Integration", description: "Automatic attendee data sync from registration platforms" },
      { type: "Networking Access Links", description: "Distribute access links after registration" },
    ],
    platforms: [
      "Eventbrite",
      "Ticket Tailor",
      "Hopin",
      "Zoom Events",
      "Airmeet",
      "Custom registration forms",
    ],
  },

  // User tiers
  userTiers: {
    attendee: ["Regular", "Premium", "VIP"],
    organizer: ["Starter", "Professional", "Enterprise"],
    sponsor: ["Bronze", "Silver", "Gold", "Platinum"],
  },

  // Social links
  socials: {
    linkedin: "https://linkedin.com/company/connectflow",
    twitter: "https://twitter.com/connectflow",
    facebook: "https://facebook.com/connectflow",
    instagram: "https://instagram.com/connectflow",
    youtube: "https://youtube.com/@connectflow",
    github: "https://github.com/connectflow",
  },

  // Legal
  legal: {
    companyName: "ConnectFlow Ltd",
    registrationNumber: "12345678",
    vatNumber: "GB123456789",
    registeredAddress: "London, United Kingdom",
    privacyEmail: "privacy@connectflow.io",
    dpaAvailable: true,
    gdprCompliant: true,
  },

  // SEO & Meta
  seo: {
    defaultOgImage: "/images/og-image.jpg",
    favicon: "/images/logo/logo.png",
    appleTouchIcon: "/images/logo/logo.png",
    themeColor: "#0a2540",
    twitterHandle: "@connectflow",
  },
};