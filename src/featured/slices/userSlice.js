import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "User",
    initialState: {
        userDeleted: false,
        userUpdated: false,
        passwordUpdated: false,
        loading: false,
        error: null,
    },
    reducers: {
        deleteUserRequest: (state) => ({ ...state, loading: true }),
        updateUserRequest: (state) => ({ ...state, loading: true }),
        updatePasswordRequest: (state) => ({ ...state, loading: true }),

        deleteUserSuccess: (state, action) => ({ ...state, loading: false, userDeleted: action.payload.success }),
        updateUserSuccess: (state, action) => ({ ...state, loading: false, userUpdated: action.payload.success }),
        updatePasswordSuccess: (state, action) => ({ ...state, loading: false, passwordUpdated: action.payload.success }),

        deleteUserFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        updateUserFailed: (state, action) => ({ ...state, loading: false, error: action.payload, }),
        updatePasswordFailed: (state, action) => ({ ...state, loading: false, error: action.payload, }),

        deleteUserReset: (state) => ({ ...state, userDeleted: false }),
        updateUserReset: (state) => ({ ...state, userUpdated: false }),
        updatePasswordReset: (state) => ({ ...state, passwordUpdated: false }),

        clear_errors: (state) => ({ ...state, error: null }),
    }
})

export const {
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailed,
    deleteUserReset,
    updateUserRequest,
    updateUserSuccess,
    updateUserFailed,
    updateUserReset,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFailed,
    updatePasswordReset,
    clear_errors,
} = userSlice.actions;

export default userSlice.reducer;
