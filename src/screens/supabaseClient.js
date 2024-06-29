import { createClient } from "@supabase/supabase-js";
import Constants from "../../lib/constant";

const supabaseUrl = Constants.EXPOPUBLICSUPABASE_URL;
const supabaseserviceKey = Constants.EXPO_PUBLIC_SERVICE_KEY;
const supabaseKey = Constants.EXPO_PUBLIC_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// export const supabase = createClient(supabaseUrl, supabaseKey, {
//   auth: {
//     // storage: AsyncStorage,
//     autoRefreshToken: true,
//     persistSession: true,
//     detectSessionInUrl: false,
//   },
// });

export const setConfirmation = async (MobileNumber) => {
  // const response = supabase.rpc("set_confirmation", {
  //   phone_number: MobileNumber,
  //   code: "654321",
  // });
  // return await response;
};

export const getuserbyphone = async (MobileNumber) => {
  const response = supabase.rpc("test_get_user_by_phone", {
    phone_number: MobileNumber,
  });
  return await response;
};

export const signUpUser = async (MobileNumber) => {
  const { data, error } = await supabase.auth.admin.createUser({
    phone: MobileNumber,
    phone_confirm: true,
    password: "password",
  });
  return { data, error };
};
export const verifyOtp = async (phone, token) => {
  const response = await supabase.auth.verifyOtp({
    phone: phone,
    token: token,
    type: "sms",
  });
  return response;
};


// --------------------------------------------------------------------------------------------------

export const addToCart = async (price,product_id,product_imagename,product_name) => {
  try {
    const user_id = 3;

    const existingUser = await supabase.from("cart_item").select("*").eq("user_id",user_id);

    if(existingUser?.data?.length > 0){
        const existUserProductId = await supabase.from("cart_item").select("*").eq("user_id",user_id).eq("product_id",product_id);
        if(existUserProductId?.data?.length == 0){
          const response = await supabase.from("cart_item").insert({user_id,product_id,product_name,thumbnail:product_imagename,product_price:price,qty:1});
        }else{
          const newData = existUserProductId?.data[0].qty + 1;
          const res = await supabase.from("cart_item").update({qty:newData}).eq("product_id",product_id).eq("user_id",user_id);
        }
    }else{
      const createUserAndAddProduct = await supabase.from("cart_item").insert({user_id,product_id,product_name,thumbnail:product_imagename,product_price:price,qty:1});
    }

  } catch (error) {
    console.log(error.message)
  }

}


export const decreaseItemQuantity = async (product_id) => {
    try {
      const user_id=3;
      const response = await supabase.from("cart_item").select("*").eq("user_id",user_id);
      if(response?.data?.length == 0){
        return;
      }else{
        const productIsExist = await supabase.from("cart_item").select("*").eq("user_id",user_id).eq("product_id",product_id);
        if(productIsExist?.data?.length == 0){
          return ;
        }else if(productIsExist?.data[0].qty == 1){
          const response = await supabase.from("cart_item").delete().eq("product_id",product_id).eq("user_id",user_id);
      }else{
        const newQuantity = productIsExist?.data[0].qty-1;
        const response = await supabase.from("cart_item").update({qty:newQuantity}).eq("product_id",product_id).eq("user_id",user_id);
      }
      }
    } catch (error) {
      console.log(error.message);
    }
}

export const deleteCartItem = async (product_id) => {
  try {
    const user_id = 3;
    const userExistsOrNot = await supabase.from("cart_item").select("*").eq("user_id",user_id);
    if(userExistsOrNot?.data?.length == 0){
      console.log("return user");
      return;
    }else{
      const isProductExistsOrNot = await supabase.from("cart_item").select("*").eq("user_id",user_id).eq("product_id",product_id);
      if(isProductExistsOrNot?.data?.length == 0){
        console.log("return product");
        return;
      }else{
        console.log("runn");
        const response = await supabase.from("cart_item").delete().eq("user_id",user_id).eq("product_id",product_id);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const loadCartData = async () => {
      try {
        const response = await supabase.from("cart_item").select("*").eq("user_id",3).order("product_id");
        return response?.data;
      } catch (error) {
        console.log(error.message)
      }
}

// ------------------------------------------------------------------

// Favourite Item
export const addFavouriteItem = async (price,product_id,product_imagename,product_name,darkroomownerid) => {
  console.log("price");
  try {
    const user_id=3;
    const userExistsOrNot = await supabase.from("favourite_products").select("*").eq("user_id",user_id);
    if(userExistsOrNot?.data?.length == 0){
      const response = await supabase.from("favourite_products").insert({user_id,product_id,product_imagename,product_name,price,darkroom_owner_id:darkroomownerid});
      console.log("resuser",response);
      // const response1 = await supabase.from("favourite_products").select("*").eq("user_id",user_id);
      return
    }else {
      const isProductExistsOrNot = await supabase.from("favourite_products").select("*").eq("user_id",user_id).eq("product_id",product_id);
      if(isProductExistsOrNot?.data?.length == 0){
        const response = await supabase.from("favourite_products").insert({user_id,product_id,product_imagename,product_name,price,darkroom_owner_id:darkroomownerid});
        const response1 = await supabase.from("favourite_products").select("*").eq("user_id",user_id);
        return
      }else{
        return;
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const removeItemFromFav = async (product_id) => {
  console.log("calling remove fav");
      console.log(product_id);
      const user_id = 3;
      try {
        const response = await supabase.from("favourite_products").select("*").eq("user_id",user_id).eq("product_id",product_id);
        if(response?.data?.length == 0){
          return;
        }else{
          const response = await supabase.from("favourite_products").delete().eq("user_id",user_id).eq("product_id",product_id);
          return;
        }
      } catch (error) {
        console.log(error.message);
      }
}

export const loadFavItem = async () => {
  try {
    const user_id=3;
    const favItemList = await supabase.from("favourite_products").select("*").eq("user_id",user_id);
    return favItemList?.data;
  } catch (error) {
    console.log(error.message);
  }
}

// -----------------------------------------------------------------------------------------------------------------------
// Orders

export const addItemsInOrder = async (orderId,totalAmount,darkroomownerid,cartItemOrder) => {
    try {
      console.log("cio",cartItemOrder.length,orderId);
      const userId = 1;
      // const orders = await supabase.from("orders").select("*").eq("userid",userId);
      // for(let i = 0 ; i < cartItemOrder.length ; i++){
      //   const {product_category,product_id,product_name,price,qty,darkroomownerid,product_imagename} = cartItemOrder[i];
      //   const totalamt = (cartItemOrder[i]?.price * cartItemOrder[i]?.qty);
      //   console.log("OrderItem",product_category,product_id,product_name,price,qty,totalamt);
      //   const response = await supabase.from("orders").insert({categoryname:product_category,productid:product_id,productname:product_name,price,quantity:qty,totalamt,userid:userId,darkroom_owner_id:darkroomownerid,product_image:product_imagename})
      //   console.log(response);
      // }

      const response = await supabase.from("orders").insert({orderid:orderId,userid:userId,orderstatus:"pending",orderitems:cartItemOrder,totalamt:totalAmount,darkroom_owner_id:darkroomownerid});
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
}

export const loadOrders = async () => {
  try {
    const response  = await supabase.from("orders").select("*");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
}

// ----------------------------------------------------------------------------------

export const getAllProducts = async () => {
      const response = await supabase.from("newproducts").select("*");
      return response?.data;
}

// ----------------------------------------------------------------
export const getProductsRelatedToCategoryId = async (categoryId) => {
 try {
   const response: any = await supabase.from("newproducts").select("*").eq("category_id",categoryId);
   return response?.data;
 } catch (error) {
    console.log(error.message);
 }

}

// -------------------------------------------------------------
// storing ratings
export const addProductRating = async (product,rating) => {
    try {
      product[0].product_rating = rating;
      const getReviwedProducts = await supabase.from("reviwed_products").select("*");
      const addingReviwedProduct = await supabase.from("reviwed_products").insert(product[0]);
      console.log(addingReviwedProduct);
    } catch (error) {
      console.log(error.message);
    }
}

export const getAllTopRatedProducts = async () => {
  try {
    const getAllProducts = await supabase.from("reviwed_products").select("*").gte("product_rating",4).limit(10)
    return getAllProducts.data;
  } catch (error) {
    console.log(error.message);
  }
}

// getAllOrderItemRelatedToOneUser
export const getAllOrderItems = async () => {
  try {
    const userId = 1;
    const response = await supabase.from("orders").select("*").eq("userid",userId);
    // console.log("orderItemsArray",response?.data[0]?.orderitems);
    // console.log("orderitems",response);
    return response?.data
  } catch (error) {
    console.log(error.message);
  }
}






