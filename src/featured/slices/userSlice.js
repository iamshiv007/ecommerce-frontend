import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "User",
    initialState: {
        userDeleted: false,
        userUpdated: false,
        passwordUpdated: false,
        profileUpdated: false,
        loading: false,
        error: null,
    },
    reducers: {
        updateProfileRequest: (state) => ({ ...state, loading: true }),
        deleteUserRequest: (state) => ({ ...state, loading: true }),
        updateUserRequest: (state) => ({ ...state, loading: true }),
        updatePasswordRequest: (state) => ({ ...state, loading: true }),

        updateProfileSuccess: (state, action) => ({ ...state, loading: false, profileUpdated: action.payload.success }),
        deleteUserSuccess: (state, action) => ({ ...state, loading: false, userDeleted: action.payload.success }),
        updateUserSuccess: (state, action) => ({ ...state, loading: false, userUpdated: action.payload.success }),
        updatePasswordSuccess: (state, action) => ({ ...state, loading: false, passwordUpdated: action.payload.success }),

        updateProfileFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        deleteUserFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        updateUserFailed: (state, action) => ({ ...state, loading: false, error: action.payload, }),
        updatePasswordFailed: (state, action) => ({ ...state, loading: false, error: action.payload, }),

        updateProfileReset: (state) => ({ ...state, profileUpdated: false }),
        deleteUserReset: (state) => ({ ...state, userDeleted: false }),
        updateUserReset: (state) => ({ ...state, userUpdated: false }),
        updatePasswordReset: (state) => ({ ...state, passwordUpdated: false }),

        clear_errors: (state) => ({ ...state, error: null }),
    }
})

export const {
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailed,
    updateProfileReset,
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
