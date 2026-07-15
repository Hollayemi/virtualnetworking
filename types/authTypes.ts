// ─── Base Entities ────────────────────────────────────────────────────────────

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  accountType: string;
  activeRole: string;
  preferredLanguage: string;
  timezone: string;
  deletionScheduledFor: string | null;
  roles: {
    attendee: boolean;
    organizer: boolean;
  };
  notifications: {
    connectionRequests: boolean;
    messages: boolean;
    meetingReminders: boolean;
    marketingEmails: boolean;
    eventUpdates: boolean;
    systemAlerts: boolean;
  };
  attendeeProfile?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}


export interface Organiser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  organisationName: string;
  organisationDescription?: string;
  website?: string;
  isVerified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ─── Auth Request Payloads ─────────────────────────────────────────────────────

export interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  role?: string;
  company?: string;
  industry?: string;
  interests?: string[];
  networkingGoals?: string;
  organisationName?: string;
  organisationDescription?: string;
  website?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterOrganiserRequest {
  name: string;
  email: string;
  password: string;
  organisationName: string;
  organisationDescription?: string;
  website?: string;
  phone?: string;
}

// ─── Auth Response Payloads ────────────────────────────────────────────────────

export interface AuthUserResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: User;
  };
}

export interface AuthOrganiserResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    organiser: Organiser;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export interface GetProfileResponse {
  success: boolean;
  message: string;
  data: { user: User };
}

export interface UpdateProfileRequest extends Partial<Omit<RegisterUserRequest, "email" | "password">> {}

export interface UpdateProfileResponse {
  success: boolean;
  message: string;
  data: { user: User };
}

export interface ToggleVipProtectionRequest {
  enabled: boolean;
}

export interface ToggleVipProtectionResponse {
  success: boolean;
  message: string;
  data: { user: User };
}

export interface GetOrganiserProfileResponse {
  success: boolean;
  message: string;
  data: { organiser: Organiser };
}

export interface UpdateOrganiserProfileRequest extends Partial<Omit<RegisterOrganiserRequest, "email" | "password">> {}

export interface UpdateOrganiserProfileResponse {
  success: boolean;
  message: string;
  data: { organiser: Organiser };
}

// ─── Auth State (Redux slice) ─────────────────────────────────────────────────

export type AuthRole = "user" | "organiser" | null;

export interface AuthState {
  token: string | null;
  user: User | null;
  organiser: Organiser | null;
  role: AuthRole;
}

// ─── API Error ────────────────────────────────────────────────────────────────

export interface ApiError {
  success: false;
  message: string;
  timestamp?: string;
}

export interface ValidationApiError extends ApiError {
  type: "validation_error";
  errors: { field: string; message: string }[];
}
