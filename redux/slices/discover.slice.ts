import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../types";
import { Event } from "../types";

export interface DiscoverAttendee {
  _id: string;
  name: string;
  email: string;
  initials: string;
  color?: string;
  role: string;
  company: string;
  industry: string;
  tier: 'Regular' | 'Premium' | 'VIP';
  interests: string[];
  avatarUrl?: string;
  bio?: string;
  matchReason?: string;
  matchScore?: number;
  isConnected?: boolean;
  connectionStatus?: 'none' | 'pending' | 'connected';
  isOrganiser?: boolean;
  eventId?: string;
}

export interface DiscoverFilters {
  search?: string;
  industry?: string;
  role?: string;
  tier?: 'Regular' | 'Premium' | 'VIP' | 'all';
  interest?: string;
  eventId?: string;
  page?: number;
  pageSize?: number;
}

export interface SuggestConnectionResponse {
  userId: string;
  eventId: string;
  connectionId?: string;
  status: 'pending' | 'connected';
  creditsSpent: number;
  message?: string;
}

export const discoverApi = createApi({
  reducerPath: "discoverApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "DiscoverAttendees",
    "SuggestedAttendees",
    "AttendeeDetail",
  ],

  endpoints: (builder) => ({
    /**
     * GET /discover/attendees
     * List attendees for the current event with filtering.
     * Includes connection status for each attendee.
     */
    discoverAttendees: builder.query<
      ApiResponse<Pagination<DiscoverAttendee[]>>,
      DiscoverFilters
    >({
      query: (params) => ({
        url: "/discover/attendees",
        method: "GET",
        params: {
          ...(params.search && { search: params.search }),
          ...(params.industry && params.industry !== 'All industries' && { industry: params.industry }),
          ...(params.role && params.role !== 'All roles' && { role: params.role }),
          ...(params.tier && params.tier !== 'all' && { tier: params.tier }),
          ...(params.interest && { interest: params.interest }),
          ...(params.eventId && { eventId: params.eventId }),
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 20,
        },
      }),
      providesTags: (result) => [
        { type: "DiscoverAttendees" },
        // ...(result?.data?.items?.map((a) => ({ type: "DiscoverAttendees", id: a._id })) || []),
      ],
    }),

    /**
     * GET /discover/suggested
     * AI-suggested attendees based on user's profile and networking goals.
     */
    getSuggestedAttendees: builder.query<
      ApiResponse<DiscoverAttendee[]>,
      { eventId?: string; limit?: number }
    >({
      query: (params) => ({
        url: "/discover/suggested",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          limit: params?.limit ?? 6,
        },
      }),
      providesTags: ["SuggestedAttendees"],
    }),

    /**
     * GET /discover/attendees/:userId
     * Get detailed profile of a specific attendee.
     */
    getAttendeeDetail: builder.query<
      ApiResponse<DiscoverAttendee>,
      { userId: string; eventId?: string }
    >({
      query: ({ userId, eventId }) => ({
        url: `/discover/attendees/${userId}`,
        method: "GET",
        params: {
          ...(eventId && { eventId }),
        },
      }),
      providesTags: (result, error, { userId }) => [
        { type: "AttendeeDetail", id: userId },
      ],
    }),

    /**
     * POST /discover/attendees/:userId/connect
     * Send a connection request to an attendee from discover page.
     * This is the same as sendConnectionRequest but scoped to discover.
     */
    connectFromDiscover: builder.mutation<
      ApiResponse<SuggestConnectionResponse>,
      { userId: string; eventId: string; intent: string; message?: string }
    >({
      query: ({ userId, eventId, intent, message }) => ({
        url: `/discover/attendees/${userId}/connect`,
        method: "POST",
        data: { eventId, intent, message },
      }),
      invalidatesTags: (result, error, { userId }) => [
        { type: "DiscoverAttendees", id: userId },
        "DiscoverAttendees",
        "SuggestedAttendees",
        "ConnectionsList",
        "ConnectionsStats",
        "PendingCount",
      ],
    }),

    /**
     * GET /discover/filters
     * Get available filter options for discover page.
     */
    getDiscoverFilters: builder.query<
      ApiResponse<{
        industries: string[];
        roles: string[];
        tiers: string[];
        interests: string[];
      }>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/discover/filters",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
    }),
  }),
});

export const {
  useDiscoverAttendeesQuery,
  useGetSuggestedAttendeesQuery,
  useGetAttendeeDetailQuery,
  useConnectFromDiscoverMutation,
  useGetDiscoverFiltersQuery,
} = discoverApi;