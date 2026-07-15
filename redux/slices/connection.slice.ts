import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../types";
import { Event } from "../types";

export type ConnectionStatus = 'pending' | 'accepted' | 'declined' | 'cancelled';
export type ConnectionIntent = 'Fundraising' | 'Hiring' | 'Partnership' | 'Investment' | 'Mentorship' | 'Sales' | 'Just exploring';

export interface ConnectionUser {
  _id: string;
  name: string;
  email: string;
  initials: string;
  color?: string;
  role: string;
  company: string;
  industry: string;
  tier: 'Regular' | 'Premium' | 'VIP';
  avatarUrl?: string;
}

export interface Connection {
  _id: string;
  from: ConnectionUser;
  to: ConnectionUser;
  event: Pick<Event, '_id' | 'name' | 'slug' | 'startDate' | 'organiserId'>;
  intent: ConnectionIntent;
  status: ConnectionStatus;
  viaCredits?: boolean;
  creditsCost?: number;
  message?: string;
  connectedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ConnectionRequest {
  userId: string;
  eventId: string;
  intent: ConnectionIntent;
  message?: string;
}

export interface ConnectionResponse {
  connectionId: string;
  status: ConnectionStatus;
  creditsSpent: number;
}

export interface AcceptConnectionResponse {
  connectionId: string;
  status: 'accepted';
  creditsEarned: number;
  connectedAt: string;
}

export interface DeclineConnectionResponse {
  connectionId: string;
  status: 'declined';
}

export interface CancelSentRequestResponse {
  connectionId: string;
  status: 'cancelled';
}

export interface ConnectionsStats {
  total: number;
  accepted: number;
  pending: number;
  sent: number;
  acceptanceRate: number;
  byEvent: {
    eventId: string;
    eventName: string;
    count: number;
  }[];
}

export interface ListConnectionsParams {
  eventId?: string;
  status?: ConnectionStatus | 'all';
  tab?: 'connections' | 'received' | 'sent';
  page?: number;
  pageSize?: number;
}

export const connectionsApi = createApi({
  reducerPath: "connectionsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "ConnectionsList",
    "ConnectionReceived",
    "ConnectionSent",
    "ConnectionsStats",
    "PendingCount",
  ],

  endpoints: (builder) => ({
    /**
     * GET /connections
     * List all connections for the authenticated user.
     * Includes event context for each connection.
     */
    listConnections: builder.query<
      ApiResponse<Pagination<Connection[]>>,
      ListConnectionsParams
    >({
      query: (params) => ({
        url: "/connections",
        method: "GET",
        params: {
          ...(params.eventId && { eventId: params.eventId }),
          ...(params.status && params.status !== 'all' && { status: params.status }),
          ...(params.tab && { tab: params.tab }),
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 20,
        },
      }),
      providesTags: (result) => [
        { type: "ConnectionsList" },
        // ...(result?.data?.items?.map((conn) => ({ type: "ConnectionsList", id: conn._id })) || []),
      ],
    }),

    /**
     * GET /connections/received
     * List pending connection requests received by the user.
     */
    getReceivedConnections: builder.query<
      ApiResponse<Pagination<Connection[]>>,
      { eventId?: string; page?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "/connections/received",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["ConnectionReceived"],
    }),

    /**
     * GET /connections/sent
     * List pending connection requests sent by the user.
     */
    getSentConnections: builder.query<
      ApiResponse<Pagination<Connection[]>>,
      { eventId?: string; page?: number; pageSize?: number }
    >({
      query: (params) => ({
        url: "/connections/sent",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["ConnectionSent"],
    }),

    /**
     * GET /connections/stats
     * Get connection statistics for the authenticated user.
     */
    getConnectionsStats: builder.query<
      ApiResponse<ConnectionsStats>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/connections/stats",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["ConnectionsStats"],
    }),

    /**
     * GET /connections/pending-count
     * Get count of pending connection requests.
     */
    getPendingCount: builder.query<
      ApiResponse<{ count: number }>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/connections/pending-count",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["PendingCount"],
    }),

    /**
     * POST /connections/request
     * Send a connection request to another attendee at an event.
     * Cost varies by tier (VIP: 3cr, Premium: 0cr, Regular: 0cr).
     */
    sendConnectionRequest: builder.mutation<
      ApiResponse<ConnectionResponse>,
      ConnectionRequest
    >({
      query: (body) => ({
        url: "/connections/request",
        method: "POST",
        data: body,
      }),
      invalidatesTags: (result, error, body) => [
        "ConnectionsList",
        "ConnectionSent",
        "ConnectionsStats",
        "PendingCount",
        { type: "ConnectionsList" },
      ],
    }),

    /**
     * POST /connections/:connectionId/accept
     * Accept a pending connection request.
     * Credits are awarded (VIP requester gives 3cr to acceptor).
     */
    acceptConnection: builder.mutation<
      ApiResponse<AcceptConnectionResponse>,
      string
    >({
      query: (connectionId) => ({
        url: `/connections/${connectionId}/accept`,
        method: "POST",
      }),
      invalidatesTags: (result, error, connectionId) => [
        { type: "ConnectionsList", id: connectionId },
        "ConnectionsList",
        "ConnectionReceived",
        "ConnectionsStats",
        "PendingCount",
      ],
    }),

    /**
     * POST /connections/:connectionId/decline
     * Decline a pending connection request.
     */
    declineConnection: builder.mutation<
      ApiResponse<DeclineConnectionResponse>,
      string
    >({
      query: (connectionId) => ({
        url: `/connections/${connectionId}/decline`,
        method: "POST",
      }),
      invalidatesTags: (result, error, connectionId) => [
        { type: "ConnectionsList", id: connectionId },
        "ConnectionsList",
        "ConnectionReceived",
        "PendingCount",
      ],
    }),

    /**
     * POST /connections/:connectionId/cancel
     * Cancel a sent connection request.
     */
    cancelConnectionRequest: builder.mutation<
      ApiResponse<CancelSentRequestResponse>,
      string
    >({
      query: (connectionId) => ({
        url: `/connections/${connectionId}/cancel`,
        method: "POST",
      }),
      invalidatesTags: (result, error, connectionId) => [
        { type: "ConnectionsList", id: connectionId },
        "ConnectionsList",
        "ConnectionSent",
        "ConnectionsStats",
      ],
    }),
  }),
});

export const {
  useListConnectionsQuery,
  useGetReceivedConnectionsQuery,
  useGetSentConnectionsQuery,
  useGetConnectionsStatsQuery,
  useGetPendingCountQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionMutation,
  useDeclineConnectionMutation,
  useCancelConnectionRequestMutation,
} = connectionsApi;