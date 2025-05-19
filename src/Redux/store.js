import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./feature/authApi";
import authReducer from "./authSlice";
import ApiSlice from "./feature/ApiSlice";
import ChatSlice from "./feature/ChatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [ApiSlice.reducerPath]: ApiSlice.reducer,
    [ChatSlice.reducerPath]: ChatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      ApiSlice.middleware,
      ChatSlice.middleware //
    ),
});

export default store;
