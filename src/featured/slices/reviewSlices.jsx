import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "review",
  initialState: {
    reviewCreated: false,
    reviewDeleted: false,
    reviewUpdated: false,
    loading: false,
    error: null,
  },
  reducers: {
    newReviewRequest: (state) => ({ ...state, loading: true }),
    deleteReviewRequest: (state) => ({ ...state, loading: true }),
    newReviewSuccess: (state, action) => ({
      ...state,
      loading: false,
      reviewCreated: action.payload.success,
    }),
    deleteReviewSuccess: (state, action) => ({
      ...state,
      loading: false,
      reviewDeleted: action.payload.success,
    }),
    newReviewFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    deleteReviewFailed: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
    newReviewReset: (state) => ({
      ...state,
      reviewCreated: false,
    }),
    deleteReviewReset: (state) => ({
      ...state,
      reviewDeleted: false,
    }),
    clear_errors: (state) => ({
      ...state,
      error: null,
    }),
  },
});

export const {
  newReviewRequest,
  deleteReviewRequest,
  newReviewSuccess,
  deleteReviewSuccess,
  newReviewFailed,
  deleteReviewFailed,
  deleteReviewReset,
  newReviewReset,
  clear_errors,
} = reviewSlice.actions;

export default reviewSlice.reducer;
