import { createSlice } from "@reduxjs/toolkit";

const favItemSlice = createSlice({
    name:"fav",
    initialState:{
        favItemList:[]
    },
    reducers:{
        addFavItem : (state,action) => {
            state.favItemList = action.payload;
        },
        clearFavItemList:(state) => {
            state.favItemList.length = 0;
        }
    }
})

export const {addFavItem,clearFavItemList} = favItemSlice.actions;
export default favItemSlice.reducer;