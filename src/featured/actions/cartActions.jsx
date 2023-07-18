import axios from "axios";
import {
  addToCartFailed,
  addToCartRequest,
  addToCartSuccess,
} from "../slices/cartSlices";

const PORT = process.env.REACT_APP_BACKEND_URL;

// ADD TO  CART
export const addToCart = (id, quantity) => async (dispatch, getState) => {
  dispatch(addToCartRequest());
  try {
    const { data } = await axios.get(`${PORT}/api/product/${id}`);

    dispatch(
      addToCartSuccess({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.stock,
        quantity,
      })
    );

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart?.cartItems)
    );
  } catch (error) {
    addToCartFailed(error);
    console.log(error);
  }
};

// // REMOVE FROM CART
// export const removeItemsFromCart = (id) => async (dispatch, getState) => {
//   dispatch({
//     type: REMOVE_CART_ITEM,
//     payload: id,
//   });

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// };

// // SAVE SHIPPING INFO
// export const saveShippingInfo = (data) => async (dispatch) => {
//   dispatch({
//     type: SAVE_SHIPPING_INFO,
//     payload: data,
//   });

//   localStorage.setItem("shippingInfo", JSON.stringify(data));
// };
