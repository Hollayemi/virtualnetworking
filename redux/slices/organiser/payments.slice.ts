import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../../types";

/**
 * payments.slice.ts
 * Same pattern as events.slice.ts. `requestPayout` is the one mutation.
 */

export interface RevenueStream {
  label: string;
  amount: number;
  color?: string;
}

export interface RevenueSummary {
  totalRevenue: number;
  streams: RevenueStream[];
  availableBalance: number;
  nextPayoutDate: string | Date;
  payoutAccountMask?: string;
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
  createdAt: string | Date;
}

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: ["Payments", "Transactions"],

  endpoints: (builder) => ({
   
    getRevenueSummary: builder.query<ApiResponse<RevenueSummary>, { eventId?: string } | void >({
      query: (params) => ({
        url: "/payments/summary",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["Payments"],
    }),

    /**
     * GET /payments/transactions
     * Paginated transaction history.
     */
    listTransactions: builder.query<
      ApiResponse<Pagination<Transaction[]>>, { page?: number; pageSize?: number } | void>({
      query: (params) => ({
        url: "/payments/transactions",
        method: "GET",
        params: {
          page: params?.page ?? 1,
          pageSize: params?.pageSize ?? 20,
        },
      }),
      providesTags: ["Transactions"],
    }),

    /**
     * POST /payments/payout
     * Request a payout of the current available balance.
     */
    requestPayout: builder.mutation<
      ApiResponse<{ payoutId: string }>,
      void
    >({
      query: () => ({
        url: "/payments/payout",
        method: "POST",
      }),
      invalidatesTags: ["Payments"],
    }),
  }),
});

export const {
  useGetRevenueSummaryQuery,
  useListTransactionsQuery,
  useRequestPayoutMutation,
} = paymentsApi;
