// slices/profile.slice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse } from "../types";
import { Event } from "../types";

export interface Profile {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  role: string;
  company?: string;
  industry: string;
  interests: string[];
  networkingGoals: string;
  initials: string;
  color: string;
  avatarUrl?: string;
  tier: 'Regular' | 'Premium' | 'VIP';
  createdAt: string;
  updatedAt: string;
}

export interface ProfileUpdateRequest {
  name?: string;
  email?: string;
  phone?: string;
  bio?: string;
  role?: string;
  company?: string;
  industry?: string;
  interests?: string[];
  networkingGoals?: string;
  avatarUrl?: string;
}

export interface DigitalBusinessCard {
  userId: string;
  name: string;
  role: string;
  company?: string;
  interests: string[];
  tier: string;
  avatarUrl?: string;
  qrCodeData: string;
  shareUrl: string;
}

export interface ProfileWithEvents extends Profile {
  currentEvent?: Pick<Event, '_id' | 'name' | 'slug' | 'startDate' | 'organiserId'>;
  enrolledEvents: Pick<Event, '_id' | 'name' | 'slug' | 'startDate' | 'organiserId'>[];
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "Profile",
    "ProfileBusinessCard",
    "ProfileEvents",
  ],

  endpoints: (builder) => ({
    /**
     * GET /profile
     * Get the current user's profile.
     */
    getProfile: builder.query<
      ApiResponse<ProfileWithEvents>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/profile",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["Profile"],
    }),

    /**
     * GET /profile/:userId
     * Get another user's profile by ID.
     */
    getPublicProfile: builder.query<
      ApiResponse<Profile>,
      { userId: string; eventId?: string }
    >({
      query: ({ userId, eventId }) => ({
        url: `/profile/${userId}`,
        method: "GET",
        params: {
          ...(eventId && { eventId }),
        },
      }),
      providesTags: (result, error, { userId }) => [
        { type: "Profile", id: userId },
      ],
    }),

    /**
     * PATCH /profile
     * Update the current user's profile.
     */
    updateProfile: builder.mutation<
      ApiResponse<Profile>,
      ProfileUpdateRequest
    >({
      query: (body) => ({
        url: "/profile",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Profile", "ProfileBusinessCard"],
    }),

    /**
     * POST /profile/avatar
     * Upload a new avatar image.
     */
    uploadAvatar: builder.mutation<
      ApiResponse<{ avatarUrl: string }>,
      FormData
    >({
      query: (formData) => ({
        url: "/profile/avatar",
        method: "POST",
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      invalidatesTags: ["Profile", "ProfileBusinessCard"],
    }),

    /**
     * GET /profile/business-card
     * Get the digital business card data.
     */
    getBusinessCard: builder.query<
      ApiResponse<DigitalBusinessCard>,
      { userId?: string; eventId?: string }
    >({
      query: (params) => ({
        url: "/profile/business-card",
        method: "GET",
        params: {
          ...(params?.userId && { userId: params.userId }),
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["ProfileBusinessCard"],
    }),

    /**
     * GET /profile/events
     * Get events the user is enrolled in or has attended.
     */
    getUserEvents: builder.query<
      ApiResponse<{ enrolled: Event[]; attended: Event[]; organised: Event[] }>,
      void
    >({
      query: () => ({
        url: "/profile/events",
        method: "GET",
      }),
      providesTags: ["ProfileEvents"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetPublicProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetBusinessCardQuery,
  useGetUserEventsQuery,
} = profileApi;