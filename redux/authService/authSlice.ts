import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { emitAuthExpired } from "../shared/authEvents";
import { showError, showSuccess } from '@/app/components/ui/sonner';
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
  return localStorage.getItem("token");
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
    responseHandler: async (response) => {
      if (response.status === 401) emitAuthExpired("unauthorized");
      if (response.status === 403) emitAuthExpired("forbidden");
      return response.json();
    },
  }),
  tagTypes: ["User", "Organiser"],
  endpoints: (builder) => ({
    /** POST /users/register */
    registerUser: builder.mutation<AuthUserResponse, RegisterUserRequest>({
      query: (body) => ({ url: "/users/register", method: "POST", body }),
      invalidatesTags: ["User"],
    }),

    /** POST /users/login */
    loginUser: builder.mutation<AuthUserResponse, LoginRequest>({
      query: (body) => ({
        url: "/users/login",
        method: "POST",
        body
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('token', data.data.token);
          if (data.success) {
            showSuccess("Welcome Back!", data.message || "Welcome back!");
          } else {
            showError("Sign in failed", data.message || "An unexpected error occurred. Please try again.");
          }
        } catch (error) {

        }
      },
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
  useGetOrganiserProfileQuery,
  useUpdateOrganiserProfileMutation,
  useLogoutOrganiserMutation,
} = authApi;
