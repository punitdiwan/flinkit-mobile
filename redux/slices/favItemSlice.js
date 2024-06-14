import { createSlice } from "@reduxjs/toolkit";

const favItemSlice = createSlice({
    name:"fav",
    initialState:{
        favItemList:[]
    },
    reducers:{
        addFavItem : (state,action) => {
            state.favItemList = action.payload;
        }
    }
})

export const {addFavItem} = favItemSlice.actions;
export default favItemSlice.reducer;