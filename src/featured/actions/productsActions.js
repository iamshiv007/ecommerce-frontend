import axios from "axios"
import { AllProductsFailed, adminProductsFailed, adminProductsSuccess, allProductsRequest, allProductsSuccess } from "../slices/productsSlices"

// 3. Get All Products
export const getAllProducts = () => async (dispatch) => {
    dispatch(allProductsRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`http://localhost:5000/api/products`)
        dispatch(allProductsSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(AllProductsFailed(error?.response?.data.message))
    }
}

// 3. Get All Products
export const adminProductsRequest = () => async (dispatch) => {
    dispatch(allProductsRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`http://localhost:5000/api/admin/products`)
        dispatch(adminProductsSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(adminProductsFailed(error?.response?.data.message))
    }
}