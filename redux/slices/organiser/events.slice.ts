import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../../types";
import { Event } from "../../types";
import { Attendee } from "./attendees.slice";

export interface IEventLocation {
  type: "physical" | "virtual";
  address?: string;
  city?: string;
  link?: string;
}

export interface EventTierInput {
  label: string;
  description?: string;
  price: number;
  capacity?: number;
  color?: string;
}

export interface EventCustomFieldInput {
  fieldKey: string;
  label: string;
  type: string;
  options?: string[];
  isRequired?: boolean;
  placeholder?: string;
}

export interface CreateEventInput {
  name: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  location: IEventLocation;
  bannerUrl?: string;
  tiers: EventTierInput[];
  customFields?: EventCustomFieldInput[];
}

export const organiserEventsApi = createApi({
  reducerPath: "organiserEventsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Events", "EventDetail", "CurrentEvent"],

  endpoints: (builder) => ({
    /**
     * GET /events
     * List all events the user has access to.
     */
    listEvents: builder.query<
      ApiResponse<Pagination<Event[]>>,
      { status?: string; page?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "/organisers/events",
        method: "GET",
        params: {
          ...(params?.status && { status: params.status }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["Events"],
    }),

    

    /**
     * GET /events/current
     * Get the current/live event for the user.
     * Used to provide event context across the dashboard.
     */
    getCurrentEvent: builder.query<
      ApiResponse<Event>,
      void
    >({
      query: () => ({
        url: "/organisers/events/current",
        method: "GET",
      }),
      providesTags: ["CurrentEvent"],
    }),

    /**
     * GET /events/:slug
     * Get detailed event information.
     */
    getEventDetail: builder.query<
      ApiResponse<Event>,
      string
    >({
      query: (slug) => ({
        url: `/organisers/events/${slug}`,
        method: "GET",
      }),
      providesTags: (result, error, slug) => [
        { type: "EventDetail", id: slug },
      ],
    }),

    /**
     * GET /events/:slug
     * Get detailed event information.
     */
    getEventAttendees: builder.query<ApiResponse<Pagination<Attendee[]>>, { eventId?: string; tier?: string; search?: string; page?: number; pageSize?: number }>({
      query: (query) => ({
        url: `/organisers/events/attendees`,
        method: "GET",
        params: query
      }),
      providesTags: (result, error, query) => [
        { type: "EventDetail", id: query.eventId },
      ],
    }),

    /**
     * POST /events
     * Create a new event. Powers the Create Event page.
     */
    createEvent: builder.mutation<
      ApiResponse<Event>,
      CreateEventInput
    >({
      query: (body) => ({
        url: "/organisers/events",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Events"],
    }),


    /**
     * POST /events/:eventslug/publish
     * Publish a draft event. Powers the Create Event page.
     */

    publishEvent: builder.mutation<ApiResponse<Event>, string>({
      query: (eventSlug) => ({
        url: `/organisers/events/${eventSlug}/publish`,
        method: "PATCH",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useListEventsQuery,
  useGetCurrentEventQuery,
  useGetEventDetailQuery,
  useGetEventAttendeesQuery,
  useCreateEventMutation,
  usePublishEventMutation,
} = organiserEventsApi;
