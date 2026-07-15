import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse, Pagination } from "../types";

export type TransactionKind = 'credit' | 'debit' | 'pending';
export type TransactionSource = 
  | 'cashback'
  | 'connection_request'
  | 'connection_accept'
  | 'meeting_booking'
  | 'purchase'
  | 'priority_message'
  | 'refund'
  | 'bonus';

export interface WalletTransaction {
  _id: string;
  userId: string;
  amount: number;
  balanceAfter: number;
  kind: TransactionKind;
  source: TransactionSource;
  description: string;
  referenceId?: string;
  referenceType?: 'connection' | 'meeting' | 'purchase' | 'message';
  eventId?: string;
  eventName?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface WalletBalance {
  balance: number;
  lifetimeCredits: number;
  earnedThisMonth: number;
  spentThisMonth: number;
  pendingCashback: number;
  currency: 'credits';
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: 'USD';
  highlighted?: boolean;
  note?: string;
  discountPercentage?: number;
}

export interface PurchaseCreditsResponse {
  transactionId: string;
  packageId: string;
  credits: number;
  price: number;
  balanceAfter: number;
  receiptUrl?: string;
}

export interface ListTransactionsParams {
  eventId?: string;
  kind?: TransactionKind | 'all';
  source?: TransactionSource | 'all';
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "WalletBalance",
    "WalletTransactions",
    "CreditPackages",
    "PendingCashback",
  ],

  endpoints: (builder) => ({
    /**
     * GET /wallet/balance
     * Get current credit balance and summary stats.
     */
    getWalletBalance: builder.query<
      ApiResponse<WalletBalance>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/wallet/balance",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["WalletBalance"],
    }),

    /**
     * GET /wallet/transactions
     * List all wallet transactions with pagination.
     * Each transaction includes event context.
     */
    listTransactions: builder.query<
      ApiResponse<Pagination<WalletTransaction[]>>,
      ListTransactionsParams
    >({
      query: (params) => ({
        url: "/wallet/transactions",
        method: "GET",
        params: {
          ...(params.eventId && { eventId: params.eventId }),
          ...(params.kind && params.kind !== 'all' && { kind: params.kind }),
          ...(params.source && params.source !== 'all' && { source: params.source }),
          ...(params.startDate && { startDate: params.startDate }),
          ...(params.endDate && { endDate: params.endDate }),
          page: params.page ?? 1,
          pageSize: params.pageSize ?? 20,
        },
      }),
      providesTags: (result) => [
        { type: "WalletTransactions" },
        // ...(result?.data?.items?.map((t) => ({ type: "WalletTransactions", id: t._id })) || []),
      ],
    }),

    /**
     * GET /wallet/packages
     * Get available credit purchase packages.
     */
    getCreditPackages: builder.query<
      ApiResponse<CreditPackage[]>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/wallet/packages",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["CreditPackages"],
    }),

    /**
     * POST /wallet/purchase
     * Purchase a credit package.
     * Returns transaction details and updated balance.
     */
    purchaseCredits: builder.mutation<
      ApiResponse<PurchaseCreditsResponse>,
      { packageId: string; eventId?: string; paymentMethodId?: string }
    >({
      query: (body) => ({
        url: "/wallet/purchase",
        method: "POST",
        data: body,
      }),
      invalidatesTags: [
        "WalletBalance",
        "WalletTransactions",
        "CreditPackages",
      ],
    }),

    /**
     * GET /wallet/pending-cashback
     * Get amount of pending cashback from accepted connections.
     */
    getPendingCashback: builder.query<
      ApiResponse<{ total: number; count: number }>,
      { eventId?: string }
    >({
      query: (params) => ({
        url: "/wallet/pending-cashback",
        method: "GET",
        params: {
          ...(params?.eventId && { eventId: params.eventId }),
        },
      }),
      providesTags: ["PendingCashback"],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useListTransactionsQuery,
  useGetCreditPackagesQuery,
  usePurchaseCreditsMutation,
  useGetPendingCashbackQuery,
} = walletApi;