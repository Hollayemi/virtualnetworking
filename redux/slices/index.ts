// slices/index.ts - Export all slices
export { connectionsApi } from './connection.slice';
export { discoverApi } from './discover.slice';
export { walletApi } from './wallet.slice';
export { profileApi } from './profile.slice';
export { settingsApi } from './settings.slice';
export { meetingsApi } from './meetings.slice';
export { eventsApi } from './events.slice';

export {
  useListConnectionsQuery,
  useGetReceivedConnectionsQuery,
  useGetSentConnectionsQuery,
  useGetConnectionsStatsQuery,
  useGetPendingCountQuery,
  useSendConnectionRequestMutation,
  useAcceptConnectionMutation,
  useDeclineConnectionMutation,
  useCancelConnectionRequestMutation,
} from './connection.slice';

export {
  useDiscoverAttendeesQuery,
  useGetSuggestedAttendeesQuery,
  useGetAttendeeDetailQuery,
  useConnectFromDiscoverMutation,
  useGetDiscoverFiltersQuery,
} from './discover.slice';

export {
  useGetWalletBalanceQuery,
  useListTransactionsQuery,
  useGetCreditPackagesQuery,
  usePurchaseCreditsMutation,
  useGetPendingCashbackQuery,
} from './wallet.slice';

export {
  useGetProfileQuery,
  useGetPublicProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useGetBusinessCardQuery,
  useGetUserEventsQuery,
} from './profile.slice';

export {
  useGetSettingsQuery,
  useUpdateAccountMutation,
  useUpdateNotificationsMutation,
  useEnableOrganizerRoleMutation,
  useSwitchActiveRoleMutation,
  useDeleteAccountMutation,
} from './settings.slice';

export {
  useListMeetingsQuery,
  useGetUpcomingMeetingsQuery,
  useScheduleMeetingMutation,
  useConfirmMeetingMutation,
  useCancelMeetingMutation,
  useGetMeetingStatsQuery,
} from './meetings.slice';

export {
  useListEventsQuery,
  useGetCurrentEventQuery,
  useGetEventDetailQuery,
} from './events.slice';