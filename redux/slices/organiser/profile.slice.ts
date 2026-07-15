import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse } from "../../types";

export interface ProfileAttendee {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  company: string;
  industry: string;
  tier: 'Regular' | 'Premium' | 'VIP';
  bio: string;
  interests: string[];
  networkingGoal: string;
  avatarUrl?: string;
  color?: string;
}

export interface ProfileStats {
  connectionsSent: number;
  connectionsAccepted: number;
  acceptanceRate: number;
  meetings: number;
  totalEvents: number;
  events: {
    id: string;
    name: string;
    role: 'attendee' | 'organizer' | 'sponsor';
    date: string;
  }[];
}

export interface UpdateProfileInput {
  name?: string;
  role?: string;
  company?: string;
  industry?: string;
  bio?: string;
  interests?: string[];
  networkingGoal?: string;
  avatarUrl?: string;
}

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Profile", "ProfileStats"],

  endpoints: (builder) => ({
    /**
     * GET /profile
     * Get the current user's profile.
     */
    getProfile: builder.query<ApiResponse<ProfileAttendee>, void>({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    /**
     * GET /profile/:userId
     * Get any user's profile by ID.
     */
    getPublicProfile: builder.query<
      ApiResponse<ProfileAttendee & { isConnected?: boolean }>,
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
     * GET /profile/stats
     * Get user statistics.
     */
    getProfileStats: builder.query<
      ApiResponse<ProfileStats>,
      { userId?: string }
    >({
      query: (params) => ({
        url: "/profile/stats",
        method: "GET",
        params: {
          ...(params?.userId && { userId: params.userId }),
        },
      }),
      providesTags: ["ProfileStats"],
    }),

    /**
     * PATCH /profile
     * Update the current user's profile.
     */
    updateProfile: builder.mutation<
      ApiResponse<ProfileAttendee>,
      UpdateProfileInput
    >({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useGetPublicProfileQuery,
  useGetProfileStatsQuery,
  useUpdateProfileMutation,
} = profileApi;