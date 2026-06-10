import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { emitAuthExpired } from "../shared/authEvents";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Registration {
  _id: string;
  userId: string;
  eventId: string;
  tierId: string;
  status: "confirmed" | "cancelled" | "pending";
  customFieldValues?: Record<string, unknown>;
  referredBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  balance: number;
  totalEarned: number;
  totalSpent: number;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Transaction {
  _id: string;
  userId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  reference?: string;
  createdAt: string;
}

export interface CreditPackage {
  _id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description?: string;
  isPopular?: boolean;
  isActive?: boolean;
  sortOrder?: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Response Shapes ───────────────────────────────────────────────────────────

interface MyRegistrationsResponse {
  success: boolean;
  message: string;
  data: { registrations: Registration[] };
}

interface CancelRegistrationResponse {
  success: boolean;
  message: string;
  data: { registration: Registration };
}

interface WalletResponse {
  success: boolean;
  message: string;
  data: { wallet: Wallet };
}

interface TransactionHistoryResponse {
  success: boolean;
  message: string;
  data: { transactions: Transaction[]; pagination: Pagination };
}

interface InitiatePurchaseResponse {
  success: boolean;
  message: string;
  data: {
    package: { id: string; name: string; credits: number; price: number; currency: string };
    paymentUrl: string;
  };
}

interface CreditPackagesResponse {
  success: boolean;
  message: string;
  data: { packages: CreditPackage[] };
}

// ─── Query Arg Types ───────────────────────────────────────────────────────────

interface TransactionHistoryArgs {
  page?: number;
  limit?: number;
}

// ─── API ───────────────────────────────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vn_token");
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    responseHandler: async (response) => {
      if (response.status === 401) emitAuthExpired("unauthorized");
      if (response.status === 403) emitAuthExpired("forbidden");
      return response.json();
    },
  }),
  tagTypes: ["Registrations", "Wallet", "Transactions"],
  endpoints: (builder) => ({
    // ── Registrations ─────────────────────────────────────────────────────────

    /** GET /registrations */
    getMyRegistrations: builder.query<MyRegistrationsResponse, void>({
      query: () => "/registrations",
      providesTags: ["Registrations"],
    }),

    /** PATCH /registrations/:id/cancel */
    cancelRegistration: builder.mutation<CancelRegistrationResponse, string>({
      query: (registrationId) => ({
        url: `/registrations/${registrationId}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: ["Registrations"],
    }),

    // ── Wallet ────────────────────────────────────────────────────────────────

    /** GET /wallet/me */
    getMyWallet: builder.query<WalletResponse, void>({
      query: () => "/wallet/me",
      providesTags: ["Wallet"],
    }),

    /** GET /wallet/me/transactions */
    getTransactionHistory: builder.query<TransactionHistoryResponse, TransactionHistoryArgs>({
      query: ({ page = 1, limit = 20 } = {}) =>
        `/wallet/me/transactions?page=${page}&limit=${limit}`,
      providesTags: ["Transactions"],
    }),

    /** POST /wallet/purchase/initiate */
    initiatePurchase: builder.mutation<InitiatePurchaseResponse, { packageId: string }>({
      query: (body) => ({ url: "/wallet/purchase/initiate", method: "POST", body }),
      invalidatesTags: ["Wallet"],
    }),

    // ── Credit Packages ───────────────────────────────────────────────────────

    /** GET /credit-packages */
    getCreditPackages: builder.query<CreditPackagesResponse, void>({
      query: () => "/credit-packages",
    }),
  }),
});

export const {
  useGetMyRegistrationsQuery,
  useCancelRegistrationMutation,
  useGetMyWalletQuery,
  useGetTransactionHistoryQuery,
  useInitiatePurchaseMutation,
  useGetCreditPackagesQuery,
} = userApi;
