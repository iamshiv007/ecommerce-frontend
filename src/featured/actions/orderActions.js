import axios from "axios"
import { AllOrdersFailed, allOrdersRequest, allOrdersSuccess } from "../slices/ordersSlice"

const port = process.env.REACT_APP_BACKEND_URL

// 1. Get All Orders
export const getAllOrders = () => async (dispatch) => {
    dispatch(allOrdersRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/admin/orders`)
        dispatch(allOrdersSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(AllOrdersFailed(error?.response?.data.message))
    }
}