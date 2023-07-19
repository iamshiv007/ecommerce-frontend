import { createSlice } from "@reduxjs/toolkit";

const updateUserSlice = createSlice({
  name: "updateUser",
  initialState: {
    userUpdated: false,
    loading: false,
    error: null,
  },
  reducers: {
    updateUserRequest: (state) => ({ ...state, loading: true }),
    updateUserSuccess: (state, action) => ({
      ...state,
      loading: false,
      userUpdated: action.payload.success,
    }),
    updateUserFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    updateUserReset: (state) => ({ ...state, userUpdated: false }),
    clear_errors: (state) => ({ ...state, error: null }),
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  updateUserFailed,
  updateUserReset,
  clear_errors,
} = updateUserSlice.actions;

export default updateUserSlice.reducer;
