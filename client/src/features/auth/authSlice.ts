import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AuthUser, LoginData } from "@/types/auth";
import { login, logout } from "@/services/authServices";
import { getApiErrorMessage } from "@/lib/errors";

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  checkingAuth: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
  checkingAuth: true,
  error: null,
};

export const loginUser = createAsyncThunk<AuthUser, LoginData, { rejectValue: string }>("auth/login", async (data, thunkAPI) => {
  try {
    return await login(data);
  } catch (err: unknown) {
    return thunkAPI.rejectWithValue(getApiErrorMessage(err, "Login failed"));
  }
});

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>("auth/logout", async (_, thunkAPI) => {
  try {
    await logout();
  } catch {
    return thunkAPI.rejectWithValue("Logout failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.checkingAuth = false;
    },
    removeUser(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.checkingAuth = false;
      state.error = null;
    },
    setCheckingAuthFalse(state) {
      state.checkingAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.checkingAuth = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
        state.checkingAuth = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { setUser, removeUser, setCheckingAuthFalse } = authSlice.actions;
export default authSlice.reducer;

