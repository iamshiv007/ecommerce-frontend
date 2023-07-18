import axios from "axios"
import { AllProductsFailed, adminProductsFailed, adminProductsSuccess, allProductsRequest, allProductsSuccess } from "../slices/productsSlices"
import { productDetailsFailed, productDetailsRequest, productDetailsSuccess } from "../slices/productSlices"
import { newReviewFailed, newReviewRequest, newReviewSuccess } from "../slices/reviewSlices"

const port = process.env.REACT_APP_BACKEND_URL

// 1. Get All Products
export const getAllProducts = () => async (dispatch) => {
    dispatch(allProductsRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/products`)
        dispatch(allProductsSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(AllProductsFailed(error?.response?.data.message))
    }
}

// 2. Get All Products -- Admin
export const adminProductsRequest = () => async (dispatch) => {
    dispatch(allProductsRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/admin/products`)
        dispatch(adminProductsSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(adminProductsFailed(error?.response?.data.message))
    }
}

// 3. Get Product Details
export const getProductDetails = (id) => async (dispatch) => {
    dispatch(productDetailsRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${port}/api/product/${id}`)
        dispatch(productDetailsSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(productDetailsFailed(error?.response?.data.message))
    }
}

// 4. Create or Update Review
export const newReview = (reviewData) => async (dispatch) => {
    dispatch(newReviewRequest())
    try {
        // Make API request for load user
        const { data } = await axios.put(`${port}/api/review`, reviewData)
        dispatch(newReviewSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(newReviewFailed(error?.response?.data.message))
    }
}