import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slices/cartSlice";
import favItemSlice from "../slices/favItemSlice";

const appStore = configureStore({
    reducer:{
        cart:cartSlice,
        fav:favItemSlice
    }
})

export default appStore;