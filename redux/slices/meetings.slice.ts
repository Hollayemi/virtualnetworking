// slices/meetings.slice.ts (optional - for meeting scheduling)
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../types";
import { Event } from "../types";
import { ConnectionUser } from "./connection.slice";

export interface Meeting {
  _id: string;
  event: Pick<Event, '_id' | 'name' | 'slug' | 'startDate' | 'endDate'>;
  organizer: ConnectionUser;
  participant: ConnectionUser;
  topic: string;
  description?: string;
  location: 'virtual' | 'in-person' | 'hybrid';
  meetingLink?: string;
  venue?: string;
  scheduledAt: string;
  durationMinutes: number;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  creditsCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface ScheduleMeetingRequest {
  connectionId: string;
  topic: string;
  description?: string;
  scheduledAt: string;
  durationMinutes: number;
  location: 'virtual' | 'in-person' | 'hybrid';
  venue?: string;
}

export interface MeetingResponse {
  meetingId: string;
  status: 'scheduled';
  creditsSpent: number;
  meetingLink?: string;
}

export const meetingsApi = createApi({
  reducerPath: "meetingsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "Meetings",
    "UpcomingMeetings",
    "MeetingDetail",
    "MeetingStats",
    "WalletBalance"
  ],

  endpoints: (builder) => ({
    /**
     * GET /meetings
     * List all meetings for the authenticated user.
     */
    listMeetings: builder.query<
      ApiResponse<Pagination<Meeting[]>>,
      { eventId?: string; status?: string; page?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "/meetings",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          ...(params?.status && { status: params.status }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["Meetings"],
    }),

    /**
     * GET /meetings/upcoming
     * Get upcoming meetings for the user (dashboard widget).
     */
    getUpcomingMeetings: builder.query<
      ApiResponse<Meeting[]>,
      { eventId?: string; limit?: number }
    >({
      query: (params) => ({
        url: "/meetings/upcoming",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          limit: params?.limit ?? 5,
        },
      }),
      providesTags: ["UpcomingMeetings"],
    }),

    /**
     * POST /meetings/schedule
     * Schedule a meeting with a connection.
     * Costs credits to schedule.
     */
    scheduleMeeting: builder.mutation<
      ApiResponse<MeetingResponse>,
      ScheduleMeetingRequest
    >({
      query: (body) => ({
        url: "/meetings/schedule",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Meetings", "UpcomingMeetings", "MeetingStats", "WalletBalance"],
    }),

    /**
     * PATCH /meetings/:meetingId/confirm
     * Confirm a scheduled meeting.
     */
    confirmMeeting: builder.mutation<
      ApiResponse<{ meetingId: string; status: 'confirmed' }>,
      string
    >({
      query: (meetingId) => ({
        url: `/meetings/${meetingId}/confirm`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, meetingId) => [
        { type: "MeetingDetail", id: meetingId },
        "UpcomingMeetings",
      ],
    }),

    /**
     * PATCH /meetings/:meetingId/cancel
     * Cancel a scheduled meeting.
     */
    cancelMeeting: builder.mutation<
      ApiResponse<{ meetingId: string; status: 'cancelled'; refundCredits: number }>,
      string
    >({
      query: (meetingId) => ({
        url: `/meetings/${meetingId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, meetingId) => [
        { type: "MeetingDetail", id: meetingId },
        "UpcomingMeetings",
        "WalletBalance",
      ],
    }),

    /**
     * GET /meetings/stats
     * Get meeting statistics.
     */
    getMeetingStats: builder.query<
      ApiResponse<{ total: number; upcoming: number; completed: number; cancelled: number }>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/meetings/stats",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["MeetingStats"],
    }),
  }),
});

export const {
  useListMeetingsQuery,
  useGetUpcomingMeetingsQuery,
  useScheduleMeetingMutation,
  useConfirmMeetingMutation,
  useCancelMeetingMutation,
  useGetMeetingStatsQuery,
} = meetingsApi;