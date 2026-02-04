import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoading: false,
    user: null,
    message: "",
    isError: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.isError = action.payload.isError;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setLoading, setUser, setMessage, logout } = authSlice.actions;
export default authSlice.reducer;
