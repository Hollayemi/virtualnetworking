import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { emitAuthExpired } from "../shared/authEvents";
import type {
  RegisterUserRequest,
  LoginRequest,
  RegisterOrganiserRequest,
  AuthUserResponse,
  AuthOrganiserResponse,
  LogoutResponse,
  GetProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ToggleVipProtectionRequest,
  ToggleVipProtectionResponse,
  GetOrganiserProfileResponse,
  UpdateOrganiserProfileRequest,
  UpdateOrganiserProfileResponse,
} from "@/types/authTypes";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("vn_token");
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1`,
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
    // Surface 401 / 403 to the event bus
    responseHandler: async (response) => {
      if (response.status === 401) emitAuthExpired("unauthorized");
      if (response.status === 403) emitAuthExpired("forbidden");
      return response.json();
    },
  }),
  tagTypes: ["User", "Organiser"],
  endpoints: (builder) => ({
    // ── Users ────────────────────────────────────────────────────────────────

    /** POST /users/register */
    registerUser: builder.mutation<AuthUserResponse, RegisterUserRequest>({
      query: (body) => ({ url: "/users/register", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    /** POST /users/login */
    loginUser: builder.mutation<AuthUserResponse, LoginRequest>({
      query: (body) => ({ url: "/users/login", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    /** GET /users/me */
    getUserProfile: builder.query<GetProfileResponse, void>({
      query: () => "/users/me",
      providesTags: ["User"],
    }),

    /** PATCH /users/me */
    updateUserProfile: builder.mutation<UpdateProfileResponse, UpdateProfileRequest>({
      query: (body) => ({ url: "/users/me", method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),

    /** PATCH /users/me/vip-protection */
    toggleVipProtection: builder.mutation<ToggleVipProtectionResponse, ToggleVipProtectionRequest>({
      query: (body) => ({ url: "/users/me/vip-protection", method: "PATCH", body }),
      invalidatesTags: ["User"],
    }),

    /** POST /users/logout */
    logoutUser: builder.mutation<LogoutResponse, void>({
      query: () => ({ url: "/users/logout", method: "POST" }),
      invalidatesTags: ["User"],
    }),

    // ── Organisers ────────────────────────────────────────────────────────────

    /** POST /organisers/register */
    registerOrganiser: builder.mutation<AuthOrganiserResponse, RegisterOrganiserRequest>({
      query: (body) => ({ url: "/organisers/register", method: "POST", body }),
      invalidatesTags: ["Organiser"],
    }),

    /** POST /organisers/login */
    loginOrganiser: builder.mutation<AuthOrganiserResponse, LoginRequest>({
      query: (body) => ({ url: "/organisers/login", method: "POST", body }),
      invalidatesTags: ["Organiser"],
    }),

    /** GET /organisers/me */
    getOrganiserProfile: builder.query<GetOrganiserProfileResponse, void>({
      query: () => "/organisers/me",
      providesTags: ["Organiser"],
    }),

    /** PATCH /organisers/me */
    updateOrganiserProfile: builder.mutation<
      UpdateOrganiserProfileResponse,
      UpdateOrganiserProfileRequest
    >({
      query: (body) => ({ url: "/organisers/me", method: "PATCH", body }),
      invalidatesTags: ["Organiser"],
    }),

    /** POST /organisers/logout */
    logoutOrganiser: builder.mutation<LogoutResponse, void>({
      query: () => ({ url: "/organisers/logout", method: "POST" }),
      invalidatesTags: ["Organiser"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useToggleVipProtectionMutation,
  useLogoutUserMutation,
  useRegisterOrganiserMutation,
  useLoginOrganiserMutation,
  useGetOrganiserProfileQuery,
  useUpdateOrganiserProfileMutation,
  useLogoutOrganiserMutation,
} = authApi;
