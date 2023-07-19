import { createSlice } from "@reduxjs/toolkit";


const deleteUserSlice = createSlice({
    name: "deleteProduct",
    initialState: {
        userDeleted: false,
        loading: false,
        error: null,
    },
    reducers: {
        deleteUserRequest: (state) => ({ ...state, loading: true }),
        deleteUserSuccess: (state, action) => ({ ...state, loading: false, userDeleted: action.payload.success }),
        deleteUserFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        deleteUserReset: (state) => ({ ...state, userDeleted: false }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFailed,
    deleteUserReset,
    clear_errors
} = deleteUserSlice.actions;

export default deleteUserSlice.reducer;
