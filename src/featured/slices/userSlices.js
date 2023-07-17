import { createSlice } from "@reduxjs/toolkit";

const sendRequest = (state) => ({ ...state, loading: true })


const requestSuccess = (state, action) => ({ ...state, loading: false, isAuthenticated: true, user: action.payload.user })


const requestFailed = (state, action) => ({ ...state, loading: false, error: action.payload })

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        loginStart: sendRequest,
        signupStart: sendRequest,
        userLoadStart: sendRequest,

        loginSuccess: requestSuccess,
        signupSuccess: requestSuccess,
        userLoadSuccess: requestSuccess,

        loginFailed: requestFailed,
        signupFailed: requestFailed,
        userLoadFailed: requestFailed,

        clearErrors: (state) => {
            return {
                ...state,
                error: null
            }
        },

        logout: (state) => {
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        }
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    signupStart,
    signupSuccess,
    signupFailed,
    userLoadStart,
    userLoadSuccess,
    userLoadFailed,
    clearErrors
} = userSlice.actions;

export default userSlice.reducer;

