import { addToCart } from "../src/screens/supabaseClient";

export const addToCartFun = async (item) => {
    const {price,product_id,product_imagename,product_name,weight} = item;
    addToCart(price,product_id,product_imagename,product_name);
}


