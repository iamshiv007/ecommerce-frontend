import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {
        allUsersRequest: (state) => ({ ...state, loading: true }),
        allUsersSuccess: (state, action) => ({ ...state, loading: false, users: action.payload.users }),
        allUsersFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        clear_errors: (state) => ({ ...state, error: null })
    }
})

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailed,
    clear_errors
} = usersSlice.actions;

export default usersSlice.reducer;
