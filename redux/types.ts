export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}
export interface Pagination<T> {
  data: T;
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// users
export interface AttendeeProfile {
  _id: string;
  userId: string;
  role: string;
  company: string;
  industry: string;
  interests: string[];
  networkingGoals: string;
  avatarUrl: string;
  isVerified: boolean;
  vipProtectionEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface OrganiserProfile {
  _id: string;
  userId: string;
  organisationName: string;
  organisationDescription?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  accountType: 'attendee' | 'organiser';
  createdAt: string;
  updatedAt: string;
  __v: number;
  attendeeProfile?: AttendeeProfile;
  organiserProfile?: OrganiserProfile;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface EventLocation {
  venue: string;
  address: string;
  city: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface EventOrganiser {
  _id: string;
  name: string;
  organisationName: string;
  logoUrl?: string;
}

export interface Event {
  _id: string;
  slug: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: EventLocation;
  bannerUrl?: string;
  organiserId: EventOrganiser;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  attendeesCount: number;
  isEnrolled?: boolean;
}