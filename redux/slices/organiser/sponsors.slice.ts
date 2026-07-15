import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../../types";

/**
 * sponsors.slice.ts
 * Same pattern as events.slice.ts. `inviteSponsor` is the one mutation —
 * everything else is read-only, matching the events.slice.ts style.
 */

export interface Sponsor {
  id: string;
  name: string;
  tier: "Platinum" | "Gold" | "Silver";
  eventId: string;
  eventName?: string;
  contactEmail: string;
  leadsDelivered: number;
  boothVisits: number;
  status: "Active" | "Pending";
}

export interface InviteSponsorInput {
  name: string;
  email: string;
  eventId: string;
}

export const sponsorsApi = createApi({
  reducerPath: "sponsorsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Sponsors", "SponsorDetail"],

  endpoints: (builder) => ({
    listSponsors: builder.query<
      ApiResponse<Pagination<Sponsor[]>>,
      { eventId?: string; page?: number; pageSize?: number } | void
    >({
      query: (params) => ({
        url: "/sponsors",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["Sponsors"],
    }),

    /**
     * GET /sponsors/:id
     * Lead-conversion detail for a single sponsor.
     */
    getSponsorDetail: builder.query<
      ApiResponse<Sponsor>,
      string
    >({
      query: (id) => ({
        url: `/sponsors/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "SponsorDetail", id },
      ],
    }),

    /**
     * POST /sponsors/invite
     * Invite a new sponsor to an event.
     */
    inviteSponsor: builder.mutation<
      ApiResponse<Sponsor>,
      InviteSponsorInput
    >({
      query: (body) => ({
        url: "/sponsors/invite",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Sponsors"],
    }),
  }),
});

export const {
  useListSponsorsQuery,
  useGetSponsorDetailQuery,
  useInviteSponsorMutation,
} = sponsorsApi;
