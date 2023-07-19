import { createSlice } from "@reduxjs/toolkit";

const getUserSlice = createSlice({
  name: "getaUser",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    getUserRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getUserSuccess: (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };
    },
    getUserFailed: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.user,
      };
    },
    getUserReset: (state) => {
      return {
        ...state,
        loading: false,
        user: null,
      };
    },
    getUserClearErrors: (state) => {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  getUserReset,
  getUserClearErrors,
} = getUserSlice.actions;

export default getUserSlice.reducer;
