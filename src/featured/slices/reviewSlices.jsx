import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewCreated: false,
    loading: false,
    error: null,
  },
  reducers: {
    newReviewRequest: (state) => ({ ...state, loading: true }),
    newReviewSuccess: (state, action) => ({
      ...state,
      loading: false,
      reviewCreated: action.payload.success,
    }),
    newReviewFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    newReviewReset: (state) => ({
      ...state,
      reviewCreated: false,
    }),
    clear_errors: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  newReviewRequest,
  newReviewSuccess,
  newReviewFailed,
  newReviewReset,
  clear_errors,
} = reviewSlice.actions;

export default reviewSlice.reducer;
