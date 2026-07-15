import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse } from "../../types";

/**
 * analytics.slice.ts
 * Same pattern as events.slice.ts.
 */

export interface TierBreakdown {
  label: string;
  sold: number;
  capacity: number;
  color?: string;
}

export interface GoalBreakdown {
  label: string;
  count: number;
}

export interface EventAnalytics {
  eventId: string;
  registrationsSold: number;
  registrationsTotal: number;
  connections: number;
  meetings: number;
  creditRevenue: number;
  registrationsTrend: number[];
  connectionsTrend: number[];
  tierBreakdown: TierBreakdown[];
  topNetworkingGoals: GoalBreakdown[];
}

export const analyticsApi = createApi({
  reducerPath: "analyticsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Analytics"],

  endpoints: (builder) => ({
    /**
     * GET /analytics/events/:eventId
     * Networking outcomes for a single event: registrations, connections,
     * meetings, revenue, trend series, and breakdowns by tier and goal.
     */
    getEventAnalytics: builder.query<
      ApiResponse<EventAnalytics>,
      string
    >({
      query: (eventId) => ({
        url: `/analytics/events/${eventId}`,
        method: "GET",
      }),
      providesTags: (result, error, eventId) => [
        { type: "Analytics", id: eventId },
      ],
    }),
  }),
});

export const {
  useGetEventAnalyticsQuery,
} = analyticsApi;
