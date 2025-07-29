// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import {userReducer,registerReducer} from "../Slices/userSlices";
import  {adminReducer} from "../Slices/adminSlices"
import { addProductReducer} from "../Slices/productSlices"
import {cartReducer} from "../Slices/cartSlice"
import {orderReducer} from "../Slices/orderSlices"


export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    userRegister:registerReducer,
    adminInfo: adminReducer,
    cart:cartReducer,
    addProduct: addProductReducer,
    order: orderReducer
  },
});
