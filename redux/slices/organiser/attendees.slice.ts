import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../../types";
import { User } from "@/types/authTypes";


export interface Attendee {
  _id: string;
  id: string;
  userId: User;
  eventId: string;
  tierId: string;
  tierLabel: string;
  tierPrice: number;
  status: string;
  confirmedAt: string;
  referredBy: string | null;
  registeredAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  connectionsAccepted?: number;
  meetingsCount?: number;
}


export const attendeesApi = createApi({
  reducerPath: "attendeesApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Attendees", "AttendeeDetail"],

  endpoints: (builder) => ({
    listAttendees: builder.query<
      ApiResponse<Pagination<Attendee[]>>,{ eventId?: string; tier?: string; search?: string; page?: number; pageSize?: number }>({
      query: (params) => ({
        url: "/attendees",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          ...(params?.tier && { tier: params.tier }),
          ...(params?.search && { search: params.search }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["Attendees"],
    }),

    getAttendeeDetail: builder.query<
      ApiResponse<Attendee>,
      string
    >({
      query: (id) => ({
        url: `/attendees/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [
        { type: "AttendeeDetail", id },
      ],
    }),
  }),
});

export const {
  useListAttendeesQuery,
  useGetAttendeeDetailQuery,
} = attendeesApi;
