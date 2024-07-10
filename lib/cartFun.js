import { addFavouriteItem, addToCart, decreaseItemQuantity, deleteCartItem } from "../src/screens/supabaseClient";

export const addToCartFun = async (item) => {
    const { price, product_id, product_imagename, product_name, weight } = item;
    await addToCart(price, product_id, product_imagename, product_name);
    return;
}


export const decreaseItemQuantityFun = async (product_id) => {
    decreaseItemQuantity(product_id);
    await decreaseItemQuantity(product_id);
    return;
}

export const removeFromcartFun = async (id) => {
    await deleteCartItem(id);
    return;
}


export const addToFavFun = async (item) => {
    const {price,product_id,product_imagename,product_name,weight} = item;
    await addFavouriteItem(price,product_id,product_imagename,product_name);
    return
}




