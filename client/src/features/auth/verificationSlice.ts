import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { OtpSchema } from "../../types/types";

const INITIAL_STATE: OtpSchema = {
  email: "",
  loading: false,
  isEmailSent: false,
  isOtpSent: false,
  isEmailVerified: false,
  isOtpVerified: false,
};

const verificationSlice = createSlice({
  name: "verification",
  initialState: INITIAL_STATE,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    sendOtpSuccess(state) {
      state.isEmailSent = true;
      state.isOtpSent = true;
      state.loading = false;
    },
    sendOtpFailure(state) {
      state.isEmailSent = false;
      state.isOtpSent = false;
      state.loading = false;
    },
    verifyOtpSuccess(state) {
      state.isOtpVerified = true;
      state.isEmailVerified = true;
      state.loading = false;
    },
    verifyOtpFailure(state) {
      state.isOtpVerified = false;
      state.loading = false;
    },
    resetVerificationState(state) {
      state.email = "";
      state.loading = false;
      state.isEmailSent = false;
      state.isOtpSent = false;
      state.isEmailVerified = false;
      state.isOtpVerified = false;
    },
  },
});

export const { setEmail, setLoading, sendOtpSuccess, sendOtpFailure, verifyOtpSuccess, verifyOtpFailure, resetVerificationState } =
  verificationSlice.actions;

export default verificationSlice.reducer;
