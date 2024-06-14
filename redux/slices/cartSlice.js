import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartItemList:[]
    },
    reducers:{
        addItemInCart:(state,action) => {
            // console.log("cartSLice",action.payload?.product_name);
            if(state.cartItemList.length == 0){
                state.cartItemList = action.payload;
            }else{
                state.cartItemList.push(action.payload);
            }
        },
        increaseItemInCart:(state,action) => {
            state.cart = action.payload;
        },
        decreaseItemInCart:(state,action) => {
            state.cartItemList = action.payload;
        },
        clearCartList:(state) => {
            state.cartItemList.length = 0;
        }
    }
});

export const {addItemInCart,increaseItemInCart,decreaseItemInCart,clearCartList} = cartSlice.actions;
export default cartSlice.reducer;