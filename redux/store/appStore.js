import { configureStore } from "@reduxjs/toolkit";
import favItemSlice from "../slices/favItemSlice";
import cartSlice from "../slices/cartSlice";

const appStore = configureStore({
    reducer:{
        cart:cartSlice,
        fav:favItemSlice
    }
})

export default appStore;