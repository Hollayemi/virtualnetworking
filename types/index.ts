//  Navigation 
export interface NavItem {
  label: string;
  href: string;
}

//  Forms 
export interface AssessmentFormData {
  fullName: string;
  phone: string;
  email: string;
  whoNeedsCare: "myself" | "family" | "friend";
  typeOfCare: "home-care" | "supported-living" | "companionship";
  whenNeeded: "immediately" | "1-2-weeks" | "1-month";
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  typeOfCare: "home-care" | "supported-living" | "companionship" | "";
  message: string;
}

export interface CareerFormData {
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
}

export type FormStatus = "idle" | "loading" | "success" | "error";

//  Content 
export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  rating: number;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

export interface ButtonVariant {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}
