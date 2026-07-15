import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../shared/axiosBaseQuery";
import { ApiResponse } from "../types";

export interface NotificationPreferences {
  connectionRequests: boolean;
  messages: boolean;
  meetingReminders: boolean;
  marketingEmails: boolean;
  eventUpdates: boolean;
  systemAlerts: boolean;
}

export interface AccountSettings {
  _id: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  notifications: NotificationPreferences;
  roles: {
    attendee: boolean;
    organizer: boolean;
  };
  activeRole: 'attendee' | 'organizer';
  preferredLanguage: string;
  timezone: string;
}

export interface UpdateAccountRequest {
  name?: string;
  email?: string;
  phone?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface UpdateNotificationsRequest {
  connectionRequests?: boolean;
  messages?: boolean;
  meetingReminders?: boolean;
  marketingEmails?: boolean;
  eventUpdates?: boolean;
  systemAlerts?: boolean;
}

export interface EnableOrganizerRequest {
  organisationName: string;
  eventName?: string;
}

export interface EnableOrganizerResponse {
  userId: string;
  roles: {
    attendee: boolean;
    organizer: boolean;
  };
  activeRole: 'organizer';
  organizationId?: string;
  eventId?: string;
}

export interface DeleteAccountResponse {
  userId: string;
  deleted: boolean;
  scheduledFor: string;
}

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: axiosBaseQuery({ defaultActor: "user" }),
  tagTypes: [
    "Settings",
    "NotificationPreferences",
    "Roles",
  ],

  endpoints: (builder) => ({
    /**
     * GET /settings
     * Get user settings including notifications and roles.
     */
    getSettings: builder.query<
      ApiResponse<AccountSettings>,
      void
    >({
      query: () => ({
        url: "/settings",
        method: "GET",
      }),
      providesTags: ["Settings", "NotificationPreferences", "Roles"],
    }),

    /**
     * PATCH /settings/account
     * Update account details.
     */
    updateAccount: builder.mutation<
      ApiResponse<{ name: string; email: string; phone?: string }>,
      UpdateAccountRequest
    >({
      query: (body) => ({
        url: "/settings/account",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Settings"],
    }),

    /**
     * PATCH /settings/notifications
     * Update notification preferences.
     */
    updateNotifications: builder.mutation<
      ApiResponse<NotificationPreferences>,
      UpdateNotificationsRequest
    >({
      query: (body) => ({
        url: "/settings/notifications",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["NotificationPreferences"],
    }),

    /**
     * POST /settings/roles/organizer
     * Enable the organizer role for the user.
     * This is the "switch on the other role later" promise from onboarding.
     */
    enableOrganizerRole: builder.mutation<
      ApiResponse<EnableOrganizerResponse>,
      EnableOrganizerRequest
    >({
      query: (body) => ({
        url: "/settings/roles/organizer",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["Roles", "Settings"],
    }),

    /**
     * PATCH /settings/roles/active
     * Switch between attendee and organizer roles.
     */
    switchActiveRole: builder.mutation<
      ApiResponse<{ activeRole: 'attendee' | 'organizer' }>,
      { role: 'attendee' | 'organizer' }
    >({
      query: (body) => ({
        url: "/settings/roles/active",
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["Settings", "Roles"],
    }),

    /**
     * DELETE /settings/account
     * Request account deletion.
     * Account will be scheduled for deletion after a grace period.
     */
    deleteAccount: builder.mutation<
      ApiResponse<DeleteAccountResponse>,
      { confirm: string; currentPassword?: string }
    >({
      query: (body) => ({
        url: "/settings/account",
        method: "DELETE",
        data: body,
      }),
      invalidatesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateAccountMutation,
  useUpdateNotificationsMutation,
  useEnableOrganizerRoleMutation,
  useSwitchActiveRoleMutation,
  useDeleteAccountMutation,
} = settingsApi;