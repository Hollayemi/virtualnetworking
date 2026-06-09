export const siteConfig = {
  name: "virtualNet",
  tagline: "Structured Networking for Premium Events",
  logo: "/images/logo/logo.png",
  description:
    "virtualNet is a premium networking infrastructure that transforms conferences, summits, and professional gatherings into structured, measurable networking environments. VIP access gates, a credit economy, verified profiles, and organizer analytics.",

  url: "https://virtualNet.io",
  dashboardUrl: "https://app.virtualNet.io",

  platform: {
    founded: 2024,
    type: "B2B SaaS Event Networking Platform",
    targetMarkets: ["Conferences", "Summits", "Professional Associations", "Startup Communities"],
    integrationMethods: ["CSV Upload", "Webhook Integration", "Networking Access Links"],
  },

  contact: {
    sales: "sales@virtualNet.io",
    support: "support@virtualNet.io",
    partners: "partners@virtualNet.io",
    security: "security@virtualNet.io",
    phone: "+44 20 1234 5678",
    address: "London, United Kingdom",
    activeHours: "Monday - Friday, 9:00 - 18:00 GMT",
  },

  // Primary nav — kept focused, maps to page anchors
  nav: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "For Organizers", href: "#organizers" },
    { label: "Pricing", href: "#pricing" },
  ],

  footerNav: {
    product: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Integrations", href: "/integrations" },
      { label: "Security", href: "/security" },
      { label: "Changelog", href: "/changelog" },
    ],
    solutions: [
      { label: "For Organizers", href: "/organizers" },
      { label: "For Attendees", href: "/attendees" },
      { label: "For Sponsors", href: "/sponsors" },
      { label: "Conferences", href: "/solutions/conferences" },
      { label: "Summits", href: "/solutions/summits" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },

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
      benefits: [
        "Unlimited connection requests",
        "Priority messaging",
        "Premium visibility",
        "Verified badge",
      ],
    },
    postEventAccess: {
      price: "$19",
      durationDays: 30,
    },
  },

  features: {
    mvp: [
      "Event creation and management",
      "Attendee profiles with networking goals",
      "Attendee discovery with filters",
      "Connection request flow",
      "Connected messaging",
      "Meeting scheduling with calendar invites",
    ],
    highLeverage: [
      "VIP Access Gate",
      "Networking Credits Economy",
      "VIP Cashback Rewards",
      "Verified Profiles",
      "Networking Intention Tags",
      "Networking Availability Slots",
    ],
    engagement: [
      "Networking Map",
      "Digital Business Cards",
      "Event Leaderboard",
      "Smart Icebreakers",
      "Post-Event Networking",
    ],
  },

  integrations: {
    methods: [
      { type: "CSV Upload", description: "Upload attendee lists with name, email, company, role, ticket tier" },
      { type: "Webhook Integration", description: "Automatic attendee data sync from registration platforms" },
      { type: "Networking Access Links", description: "Distribute access links post-registration" },
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

  userTiers: {
    attendee: ["Regular", "Premium", "VIP"],
    organizer: ["Starter", "Professional", "Enterprise"],
    sponsor: ["Bronze", "Silver", "Gold", "Platinum"],
  },

  socials: {
    linkedin: "https://linkedin.com/company/virtualNet",
    twitter: "https://twitter.com/virtualNet",
  },

  legal: {
    companyName: "virtualNet Ltd",
    registrationNumber: "12345678",
    vatNumber: "GB123456789",
    registeredAddress: "London, United Kingdom",
    privacyEmail: "privacy@virtualNet.io",
    dpaAvailable: true,
    gdprCompliant: true,
  },

  seo: {
    defaultOgImage: "/images/og-image.jpg",
    favicon: "/images/logo/logo.png",
    themeColor: "#0D1B2A",
    twitterHandle: "@virtualNet",
  },
};