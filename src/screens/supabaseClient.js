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

export const fetchProductDetail = async (productId) => {
  try {
    const response  = await supabase.from("newproducts").select("*").eq("product_id", productId);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export const addToCart = async (
  price,
  product_id,
  product_imagename,
  product_name
) => {
  try {
    const user_id = 3;

    const existingUser = await supabase
      .from("cart_item")
      .select("*")
      .eq("user_id", user_id);

    if (existingUser?.data?.length > 0) {
      const existUserProductId = await supabase
        .from("cart_item")
        .select("*")
        .eq("user_id", user_id)
        .eq("product_id", product_id);
      if (existUserProductId?.data?.length == 0) {
        const response = await supabase
          .from("cart_item")
          .insert({
            user_id,
            product_id,
            product_name,
            thumbnail: product_imagename,
            product_price: price,
            qty: 1,
          });
      } else {
        const newData = existUserProductId?.data[0].qty + 1;
        const res = await supabase
          .from("cart_item")
          .update({ qty: newData })
          .eq("product_id", product_id)
          .eq("user_id", user_id);
      }
    } else {
      const createUserAndAddProduct = await supabase
        .from("cart_item")
        .insert({
          user_id,
          product_id,
          product_name,
          thumbnail: product_imagename,
          product_price: price,
          qty: 1,
        });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const decreaseItemQuantity = async (product_id) => {
  try {
    const user_id = 3;
    const response = await supabase
      .from("cart_item")
      .select("*")
      .eq("user_id", user_id);
    if (response?.data?.length == 0) {
      return;
    } else {
      const productIsExist = await supabase
        .from("cart_item")
        .select("*")
        .eq("user_id", user_id)
        .eq("product_id", product_id);
      if (productIsExist?.data?.length == 0) {
        return;
      } else if (productIsExist?.data[0].qty == 1) {
        const response = await supabase
          .from("cart_item")
          .delete()
          .eq("product_id", product_id)
          .eq("user_id", user_id);
      } else {
        const newQuantity = productIsExist?.data[0].qty - 1;
        const response = await supabase
          .from("cart_item")
          .update({ qty: newQuantity })
          .eq("product_id", product_id)
          .eq("user_id", user_id);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCartItem = async (product_id) => {
  try {
    const user_id = 3;
    const userExistsOrNot = await supabase
      .from("cart_item")
      .select("*")
      .eq("user_id", user_id);
    if (userExistsOrNot?.data?.length == 0) {
      console.log("return user");
      return;
    } else {
      const isProductExistsOrNot = await supabase
        .from("cart_item")
        .select("*")
        .eq("user_id", user_id)
        .eq("product_id", product_id);
      if (isProductExistsOrNot?.data?.length == 0) {
        console.log("return product");
        return;
      } else {
        console.log("runn");
        const response = await supabase
          .from("cart_item")
          .delete()
          .eq("user_id", user_id)
          .eq("product_id", product_id);
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loadCartData = async () => {
  try {
    const response = await supabase
      .from("cart_item")
      .select("*")
      .eq("user_id", 3)
      .order("product_id");
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// ------------------------------------------------------------------

// Favourite Item
export const addFavouriteItem = async (
  price,
  product_id,
  product_imagename,
  product_name,
  darkroomownerid,
  userId
) => {
  const user_id = String(userId);
  try {
    const userExistsOrNot = await supabase
      .from("favourite_products")
      .select("*")
      .eq("user_id", user_id);
    if (userExistsOrNot?.data?.length == 0) {
      const response = await supabase
        .from("favourite_products")
        .insert({
          user_id,
          product_id,
          imagename: product_imagename,
          product_name,
          price,
          darkroom_owner_id: darkroomownerid,
        });
      return;
    } else {
      const isProductExistsOrNot = await supabase
        .from("favourite_products")
        .select("*")
        .eq("user_id", user_id)
        .eq("product_id", product_id);
      if (isProductExistsOrNot?.data?.length == 0) {
        const response = await supabase
          .from("favourite_products")
          .insert({
            user_id,
            product_id,
            imagename: product_imagename,
            product_name,
            price,
            darkroom_owner_id: darkroomownerid,
          });
        const response1 = await supabase
          .from("favourite_products")
          .select("*")
          .eq("user_id", user_id);
        return;
      } else {
        return;
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const removeItemFromFav = async (product_id) => {
  const user_id = 3;
  try {
    const response = await supabase
      .from("favourite_products")
      .select("*")
      .eq("user_id", user_id)
      .eq("product_id", product_id);
    if (response?.data?.length == 0) {
      return;
    } else {
      const response = await supabase
        .from("favourite_products")
        .delete()
        .eq("user_id", user_id)
        .eq("product_id", product_id);
      return;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const loadFavItem = async (userId) => {
  try {
    const user_id = String(userId);
    const favItemList = await supabase
      .from("favourite_products")
      .select("*")
      .eq("user_id", user_id);
    return favItemList?.data;
  } catch (error) {  
    console.log(error.message);
  }
};


// handle unfavourite item that are remove from favouriteProducts
export const removeFromFavourite = async (productId) => {
  try {
    const dltResponse = await supabase.from("favourite_products").delete().eq("product_id",productId);
    console.log("dltResponse",dltResponse);
    const fetchCurrentData = await supabase.from("favourite_products").select("*");
    console.log("fetch",fetchCurrentData?.data?.length);
    return;
  } catch (error) {
    console.log(error);
  }
}

// -----------------------------------------------------------------------------------------------------------------------
// Orders

export const addItemsInOrder = async (
  orderId,
  totalAmount,
  darkroomownerid,
  dateoforder,
  cartItemOrder
) => {
  try {
    console.log("cio", cartItemOrder.length, orderId);
    const userId = 1;
    // const orders = await supabase.from("orders").select("*").eq("userid",userId);
    // for(let i = 0 ; i < cartItemOrder.length ; i++){
    //   const {product_category,product_id,product_name,price,qty,darkroomownerid,product_imagename} = cartItemOrder[i];
    //   const totalamt = (cartItemOrder[i]?.price * cartItemOrder[i]?.qty);
    //   console.log("OrderItem",product_category,product_id,product_name,price,qty,totalamt);
    //   const response = await supabase.from("orders").insert({categoryname:product_category,productid:product_id,productname:product_name,price,quantity:qty,totalamt,userid:userId,darkroom_owner_id:darkroomownerid,product_image:product_imagename})
    //   console.log(response);
    // }

    const response = await supabase
      .from("orders")
      .insert({
        orderid: orderId,
        userid: userId,
        orderstatus: "pending",
        orderitems: cartItemOrder,
        totalamt: totalAmount,
        darkroom_owner_id: darkroomownerid,
        dateoforder,
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const loadOrders = async () => {
  try {
    const response = await supabase
      .from("orders")
      .select("*")
      .eq("userid", 1)
      .order("created_at", { ascending: false });
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

// ----------------------------------------------------------------------------------

export const getAllProducts = async () => {
  const response = await supabase.from("newproducts").select("*");
  return response?.data;
};

// ----------------------------------------------------------------
export const getProductsRelatedToCategoryId = async (categoryId) => {
  try {
    const response: any = await supabase
      .from("newproducts")
      .select("*")
      .eq("category_id", categoryId);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};



export const addProductRating = async (product, rating) => {
  try {
    product[0].product_rating = rating;

    // Destructure the required fields from product[0]
    const {
      product_id,
      category_id,
      darkroomownerid,
      imagename,
      packing_weight,
      price,
      product_brand,
      product_category,
      product_name,
      product_rating,
      product_details,
      product_total_qty,
    } = product[0];

    // Selecting all rows from reviwed_products (optional step)
    const getReviwedProducts = await supabase
      .from("reviwed_products")
      .select("*");

    // Inserting a new row into reviwed_products
    const addingReviwedProduct = await supabase
      .from("reviwed_products")
      .insert({
        product_id,
        product_category,
        price,
        product_name,
        product_brand,
        product_rating,
        darkroomownerid,
        imagename,
        user_id: 1, // Assuming user_id is fixed or retrieved dynamically
        product_details,
        category_id,
        packing_weight,
      });

    console.log(addingReviwedProduct);
  } catch (error) {
    console.error("Error adding product rating:", error.message);
  }
};

export const getAllTopRatedProducts = async () => {
  try {
    const getAllProducts = await supabase
      .from("reviwed_products")
      .select("*")
      .gte("product_rating", 4)
      .limit(10);
    return getAllProducts.data;
  } catch (error) {
    console.log(error.message);
  }
};

// getAllOrderItemRelatedToOneUser
export const getAllOrderItems = async () => {
  try {
    const userId = 1;
    const response = await supabase
      .from("orders")
      .select("*")
      .eq("userid", userId);
    // console.log("orderItemsArray",response?.data[0]?.orderitems);
    // console.log("orderitems",response);
    return response?.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const getDriverDetails = async (driverId) => {
  try {
    const response = await supabase
      .from("driver_registration")
      .select("*")
      .eq("driver_uniqueid", driverId);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------UserApi----------------------------------
export const checkUserExistingOrCreatingNewUser = async (number, otp) => {
  try {
    const convertOTPInString = String(otp);
    const response = await supabase
      .from("user")
      .select("*")
      .eq("mobile", number);
    console.log("responsesupa", response);
    if (response?.data.length == 0) {
      const response = await supabase
        .from("user")
        .insert({ mobile: number, otp: convertOTPInString });
      console.log(response);
      const getUSer = await supabase
        .from("user")
        .select("*")
        .eq({ mobile: number });
      return;
    } else {
      console.log("rnning");
      const response = await supabase
        .from("user")
        .update({ otp: convertOTPInString }) // Set otp column to the new OTP value
        .eq("mobile", number);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};


export const getUserRelatedToMobile = async (number) => {
  try {
    const response = await supabase.from("user").select("*").eq("mobile",number);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export const removeOTPAfterValidation = async (number) => {
      try {
        const response = await supabase.from("user").update({otp:null}).eq("mobile",number);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
}

export const getUserDetails = async (number) => {
  try {
    const response = await supabase.from("user").select("*").eq("mobile",number);
    return response?.data;
  } catch (error) {
    console.log(error);
  }
}

export const saveUserAddressAndZipCodeDetails = async (user_id,location,zip_code) => {
  try {
    console.log(user_id,location,zip_code);
    const response = await supabase.from("user").update({location,zip_code}).eq("mobile",number);
    console.log("saveaddress",response);
    
  } catch (error) {
    console.log(error);
  }
}



export const saveCartItemInCartTable = async (cartitems) => {
    try {
      const userid = 3;
      const response = await supabase.from("cart").insert({userid,cartitems:cartitems});
      console.log("savecart",response);
      return response?.data;
    } catch (error) {
      console.log(error);
    }
}

export const getCurrentQuantityOfProducts = async () => {
  try {
    const response = await supabase.from("newproducts").select("*");
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export const getCurrentQuantityOfProductsRelatedToId = async (productId) => {
  try {
    const response = await supabase.from("newproducts").select("*").eq("product_id",productId);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}