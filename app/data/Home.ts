
import {
  Users, Zap, Shield, Calendar, MessageSquare, 
  MapPin, Award,
  Coins, Handshake, Building2, Search, Filter,
} from "lucide-react";

export const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1800&q=80",
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1800&q=80",
  "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=1800&q=80",
  "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1800&q=80",
];

export const SEARCH_CATEGORIES = [
  "All categories", "Conferences", "Summits", "Networking Events",
  "Hackathons", "Workshops", "Startup Events", "Investor Events",
];

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Events", href: "/explore" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "For Organizers", href: "#organizers" },
  { label: "Pricing", href: "#pricing" },
];

export const TICKER_ITEMS = [
  { from: "Sarah M.", role: "Founder", to: "James K.", role2: "Partner at Sequoia" },
  { from: "Alex R.", role: "CTO", to: "Priya S.", role2: "VP Engineering @ Meta" },
  { from: "Tom W.", role: "Recruiter", to: "Dana L.", role2: "Senior Dev" },
  { from: "Lena F.", role: "Investor", to: "Carlos B.", role2: "Fintech Founder" },
  { from: "Marcus T.", role: "Sales Lead", to: "Yui H.", role2: "COO @ Stripe" },
];

export const STATS = [
  { value: "94%", label: "connection acceptance rate" },
  { value: "3.2x", label: "more meetings than unstructured networking" },
  { value: "48h", label: "average time to first message" },
  { value: "120+", label: "enterprise events powered" },
];

export const FEATURES = [
  {
    icon: Shield,
    title: "VIP Access Gate",
    description: "High-value attendees are protected from unsolicited requests. A credit-based access layer ensures every VIP connection is intentional.",
    tag: "Flagship",
  },
  { icon: Coins, title: "Credits Economy", description: "Attendees earn and spend credits to unlock premium interactions. VIPs earn cashback for every connection they accept." },
  { icon: Filter, title: "Attendee Discovery", description: "Filter by industry, role, company, and ticket tier. Find exactly who you need to meet before the event even starts." },
  { icon: MessageSquare, title: "Structured Messaging", description: "Messaging only unlocks after both parties accept. No cold DMs. No spam. Every conversation starts from mutual intent." },
  { icon: Calendar, title: "Meeting Scheduling", description: "Attendees define availability slots. Others book within those windows. Calendar invites generated automatically." },
  { icon: Award, title: "Verified Profiles", description: "LinkedIn, email domain, and organizer-level verification badges. Know exactly who you are speaking to." },
  { icon: MapPin, title: "Networking Map", description: "Interactive visualization grouping attendees by industry and role. Navigate the room before you walk in." },
  { icon: Zap, title: "Smart Icebreakers", description: "AI-generated conversation starters based on shared interests and goals. You both worked in fintech? We will tell you." },
];

export const INTENTIONS = [
  { label: "Hiring", color: "bg-accent-500" },
  { label: "Investment", color: "bg-secondary-500" },
  { label: "Partnership", color: "bg-accent-500" },
  { label: "Mentorship", color: "bg-amber-400" },
  { label: "Sales", color: "bg-violet-500" },
];

export const HOW_IT_WORKS = [
  { step: "01", title: "Organizer creates the event", description: "Set up ticket tiers, import attendees via CSV or webhook, and share networking access links. Done in minutes.", icon: Building2 },
  { step: "02", title: "Attendees build their profile", description: "Name, role, company, networking goals, and availability slots. Verified badges add credibility.", icon: Users },
  { step: "03", title: "Discover and connect", description: "Browse the attendee directory, filter by what matters, and send a connection request with your intent tag.", icon: Search },
  { step: "04", title: "Meet and build relationships", description: "Once connected, messaging opens and meeting slots become bookable. Post-event networking continues for 30 days.", icon: Handshake },
];

export const TESTIMONIALS = [
  { quote: "We ran our summit for three years with generic networking apps. VirtualNet tripled our meeting volume and our sponsors actually got qualified leads for the first time.", name: "Rachel O.", role: "Head of Events, TechSummit Europe" },
  { quote: "The VIP gate was the feature that sold me. I can now attend conferences without being bombarded. I only hear from people I would actually want to meet.", name: "David K.", role: "Partner, Horizon Ventures" },
  { quote: "Setting up took under two hours. We uploaded our Eventbrite CSV, sent the access links, and on the day attendees were already scheduling meetings with each other.", name: "Ana M.", role: "Conference Director, FinovateEU" },
];

export const PRICING = [
  { name: "Starter", price: "Free", per: "per event", description: "For small gatherings up to 100 attendees.", features: ["Up to 100 attendees", "Basic profiles", "Connection requests", "CSV import"], cta: "Start free", highlight: false },
  { name: "Professional", price: "$299", per: "per event", description: "For serious conferences that want measurable outcomes.", features: ["Up to 1,000 attendees", "VIP Access Gate", "Credits economy", "Verified profiles", "Networking analytics", "Webhook integration"], cta: "Get started", highlight: true },
  { name: "Enterprise", price: "Custom", per: "subscription", description: "For associations and recurring event programmes.", features: ["Unlimited attendees", "Custom branding", "Sponsor lead access", "Post-event networking", "Priority support", "SLA + DPA"], cta: "Talk to sales", highlight: false },
];