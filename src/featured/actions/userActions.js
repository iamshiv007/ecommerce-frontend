import axios from "axios"
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutRequest, logoutSuccess, signupFailed, signupStart, signupSuccess, userLoadFailed, userLoadStart, userLoadSuccess } from "../slices/authSlice";
import { allUsersFailed, allUsersRequest, allUsersSuccess } from "../slices/usersSlice";
import { updateUserFailed, updateUserRequest, updateUserSuccess, deleteUserFailed, deleteUserRequest, deleteUserSuccess, updatePasswordSuccess, updatePasswordFailed, updatePasswordRequest, updateProfileRequest, updateProfileSuccess, updateProfileFailed } from "../slices/userSlice";
import { getUserFailed, getUserRequest, getUserSuccess } from "../slices/getUserSlice";
import { forgotPasswordFailed, forgotPasswordRequest, forgotPasswordSuccess, resetPasswordFailed, resetPasswordRequest, resetPasswordSuccess } from "../slices/passwordSlice";

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
        dispatch(allUsersFailed(error?.response?.data.message))
    }
}

// 6. Update User
export const updateUser = (id, userData) => async (dispatch) => {
    dispatch(updateUserRequest())
    try {
        // Make API request for load user
        const { data } = await axios.put(`${port}/api/admin/user/${id}`, userData)
        dispatch(updateUserSuccess(data))
    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(updateUserFailed(error?.response?.data.message))
    }
}

// 7. Delete User
export const deleteUser = (id) => async (dispatch) => {
    dispatch(deleteUserRequest())
    try {
        // Make API request for load user
        const { data } = await axios.delete(`${port}/api/admin/user/${id}`)
        dispatch(deleteUserSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(deleteUserFailed(error?.response?.data.message))
    }
}

// 8. Get Indivisual User
export const getUser = (id) => async (dispatch) => {
    dispatch(getUserRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/admin/user/${id}`)
        dispatch(getUserSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(getUserFailed(error?.response?.data.message))
    }
}

// 9. Update Password
export const updatePassword = (formData) => async (dispatch) => {
    dispatch(updatePasswordRequest())
    try {
        // Make API request for load user
        const { data } = await axios.put(`${port}/api/password/update`, formData)
        dispatch(updatePasswordSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(updatePasswordFailed(error?.response?.data.message))
    }
}

// 10. Update Profile
export const updateProfile = (userData) => async (dispatch) => {
    dispatch(updateProfileRequest())
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } }

        // Make API request for load user
        const { data } = await axios.put(`${port}/api/me/update`, userData, config)
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(updateProfileFailed(error?.response?.data.message))
    }
}

// 11. Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotPasswordRequest())
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } }

        // Make API request for load user
        const { data } = await axios.post(`${port}/api/password/forgot`, email, config)
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(forgotPasswordFailed(error?.response?.data.message))
    }
}

// 12. Reser Password
export const resetPassword = (token, formData) => async (dispatch) => {
    dispatch(resetPasswordRequest())
    try {
        const config = { headers: { "Content-Type": "multipart/form-data" } }

        // Make API request for load user
        const { data } = await axios.put(`${port}/api/password/reset/${token}`, formData, config)
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(resetPasswordFailed(error?.response?.data.message))
    }
}