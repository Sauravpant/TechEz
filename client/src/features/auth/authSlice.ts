import { createSlice } from "@reduxjs/toolkit";
import type { AuthState } from "../../types/types";

const INITIAL_STATE: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loginRequest(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    loginFailed(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailed, logout } = authSlice.actions;

export default authSlice.reducer;
