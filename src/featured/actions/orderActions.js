import axios from "axios"
import { AllOrdersFailed, allOrdersRequest, allOrdersSuccess } from "../slices/ordersSlice"
import { deleteOrderFailed, deleteOrderRequest, deleteOrderSuccess, newOrderFailed, newOrderRequest, newOrderSuccess, updateOrderFailed, updateOrderRequest, updateOrderSuccess } from "../slices/orderSlice"

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

// 2. Create New Order
export const newOrder = (orderData) => async (dispatch) => {
    dispatch(newOrderRequest())

    try {

        const { data } = await axios.post(`${port}/api/order/new`, orderData)

        dispatch(newOrderSuccess(data))

    } catch (error) {
        dispatch(newOrderFailed())
        console.log(error)
    }
}

// 3. Update Product
export const updateOrder = (id, orderData) => async (dispatch) => {
    dispatch(updateOrderRequest())

    try {

        const { data } = await axios.put(`${port}/api/admin/order/${id}`, orderData)

        dispatch(updateOrderSuccess(data))

    } catch (error) {
        dispatch(updateOrderFailed())
        console.log(error)
    }
}

// 4. Create New Product
export const deleteOrder = (id) => async (dispatch) => {

    dispatch(deleteOrderRequest())

    try {

        const { data } = await axios.delete(`${port}/api/admin/product/${id}`)

        dispatch(deleteOrderSuccess(data))

    } catch (error) {
        dispatch(deleteOrderFailed())
        console.log(error)
    }
}