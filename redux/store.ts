import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authService/authSlice";
import { connectionsApi } from "./slices/connection.slice";
import { discoverApi } from "./slices/discover.slice";
import { walletApi } from "./slices/wallet.slice";
import { profileApi } from "./slices/profile.slice";
import { settingsApi } from "./slices/settings.slice";
import { meetingsApi } from "./slices/meetings.slice";
import { eventsApi } from "./slices/events.slice";

// organiser
import { analyticsApi } from "./slices/organiser/analytics.slice";
import { attendeesApi } from "./slices/organiser/attendees.slice";
import { organiserEventsApi } from "./slices/organiser/events.slice";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [connectionsApi.reducerPath]: connectionsApi.reducer,
    [discoverApi.reducerPath]: discoverApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [meetingsApi.reducerPath]: meetingsApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,

    // Organiser
    
    [analyticsApi.reducerPath]: analyticsApi.reducer,
    [attendeesApi.reducerPath]: attendeesApi.reducer,
    [organiserEventsApi.reducerPath]: organiserEventsApi.reducer,


  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(connectionsApi.middleware)
      .concat(discoverApi.middleware)
      .concat(walletApi.middleware)
      .concat(profileApi.middleware)
      .concat(settingsApi.middleware)
      .concat(meetingsApi.middleware)
      .concat(eventsApi.middleware)
      
      // Organiser
      
      .concat(analyticsApi.middleware)
      .concat(attendeesApi.middleware)
      .concat(organiserEventsApi.middleware)


  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;