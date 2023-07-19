import axios from "axios"
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutRequest, logoutSuccess, signupFailed, signupStart, signupSuccess, userLoadFailed, userLoadStart, userLoadSuccess } from "../slices/userSlices";
import { allUsersFailed, allUsersRequest, allUsersSuccess } from "../slices/usersSlice";

const port = process.env.REACT_APP_BACKEND_URL

// 1. Login
export const login = (userData) => async (dispatch) => {
    dispatch(loginStart());
    try {
        // Make API request for login
        const { data } = await axios.post(`${port}/api/user/login`, userData);
        dispatch(loginSuccess(data));
    } catch (error) {
        console.log(error.response?.data.message)
        dispatch(loginFailed(error.response?.data.message));
    }
};

// 2. Signup
export const register = (userData) => async (dispatch) => {
    dispatch(signupStart());
    try {
        // Make API request for signup
        const { data } = await axios.post(`${port}/api/user/register`, userData);
        dispatch(signupSuccess(data));
    } catch (error) {
        console.log(error.response.data.message)
        dispatch(signupFailed(error.response.data.message));
    }
};


// 3. Load user
export const loadUser = () => async (dispatch) => {
    dispatch(userLoadStart())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/user/me`)
        dispatch(userLoadSuccess(data))

    } catch (error) {
        console.log(error.response?.data.message)
        dispatch(userLoadFailed(error.response?.data.message))
    }
}

// 4. Logout
export const logout = () => async (dispatch) => {
    dispatch(logoutRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/user/logout`)
        dispatch(logoutSuccess(data))

    } catch (error) {
        console.log(error.response?.data.message)
        dispatch(logoutFailed(error.response?.data.message))
    }
}

// 5. Get All Users
export const getAllUsers = () => async (dispatch) => {
    dispatch(allUsersRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/admin/users`)
        dispatch(allUsersSuccess(data))
    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(AllUsersFailed(error?.response?.data.message))
    }
}