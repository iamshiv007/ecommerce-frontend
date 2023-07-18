import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        loading: false,
        error: null,
    },
    reducers: {
        allProductsRequest: (state) => ({ ...state, loading: true }),
        adminProductsRequest: (state) => ({ ...state, loading: true }),
        allProductsSuccess: (state, action) => ({ ...state, loading: false, products: action.payload.products, resultPerPage: action.payload.resultPerPage, productsCount: action.payload.productsCount, filteredProductsCount: action.payload.filteredProductsCount }),
        adminProductsSuccess: (state, action) => ({ ...state, loading: false, products: action.payload.products }),
        AllProductsFailed: (state, action) => ({ ...state, loading: false, error: action.payload }),
        adminProductsFailed: (state, action) => ({ ...state, loading: false, error: action.payload })
    }
})

export const {
    allProductsRequest,
    adminProductsRequest,
    allProductsSuccess,
    adminProductsSuccess,
    AllProductsFailed,
    adminProductsFailed
} = productsSlice.actions;

export default productsSlice.reducer;
