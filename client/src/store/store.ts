import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import verificationReducer from "../features/auth/verificationSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    verification: verificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
