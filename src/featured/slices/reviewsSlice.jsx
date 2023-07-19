import { createSlice } from "@reduxjs/toolkit";


const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        reviews: [],
        loading: false,
        error: null,
    },
    reducers: {
        allReviewsRequest: (state) => ({ ...state, loading: true }),
        allReviewsSuccess: (state, action) => ({ ...state, loading: false, reviews: action.payload.reviews }),
        allReviewsFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    allReviewsRequest,
    allReviewsSuccess,
    allReviewsFailed,
    clear_errors
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
