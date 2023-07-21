import { createSlice } from "@reduxjs/toolkit";


const passwordSlice = createSlice({
    name: "password",
    initialState: {
        message: null,
        success: false,
        loading: false,
        error: null,
    },
    reducers: {

        forgotPasswordRequest: (state) => ({ ...state, loading: true }),
        resetPasswordRequest: (state) => ({ ...state, loading: true }),
        forgotPasswordSuccess: (state, action) => ({ ...state, loading: false, message: action.payload.message }),
        resetPasswordSuccess: (state, action) => ({ ...state, loading: false, success: action.payload.success }),
        resetPasswordFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        forgotPasswordFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),

        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    forgotPasswordRequest,
    resetPasswordRequest,
    forgotPasswordSuccess,
    resetPasswordSuccess,
    resetPasswordFailed,
    forgotPasswordFailed,
    clear_errors
} = passwordSlice.actions;

export default passwordSlice.reducer;
