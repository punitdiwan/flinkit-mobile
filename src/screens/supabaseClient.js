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



export const addToCart = async (productid,name,price) => {
  try {
    console.log(productid,name,price);
    const response = await supabase.from("cart3").select("*");
    console.log(response);

    const existingProduct = await supabase.from("cart3").select("*").eq("productid",productid);
    if(existingProduct?.data?.length == 0){
      console.log("runn1");
      const response = await supabase.from("cart3").insert({productid,name,price,image:"https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=600",quantity:1});
    }
    else{
      console.log("runn2");
      const newData = existingProduct?.data[0].quantity + 1;
      console.log("new qua",newData);
      const res = await supabase.from("cart3").update({quantity:newData}).eq("productid",productid);
      console.log(res);
    }

  } catch (error) {
    console.log(error.message)
  }

}


export const decreaseItemQuantity = async (productid) => {
    try {
      console.log(productid);
      const response = await supabase.from("cart3").select("*");
      console.log("res",response);
      const existingProduct = await supabase.from("cart3").select("*").eq("productid",productid);
      if(existingProduct?.data?.length == 0){
        return;
      }else if(existingProduct?.data[0].quantity == 1){
          const response = await supabase.from("cart3").delete().eq("productid",productid);
      }else{
        const newQuantity = existingProduct?.data[0].quantity-1;
        const response = await supabase.from("cart3").update({quantity:newQuantity}).eq("productid",productid);
      }
    } catch (error) {
      console.log(error.message);
    }
}

export const deleteCartItem = async (productid) => {
  try {
    const response = await supabase.from("cart3").select("*");
    const existingProductOrNot = await supabase.from("cart3").select("*").eq("productid",productid);
    if(existingProductOrNot?.data?.length == 0){
      return;
    }else{
      const response = await supabase.from("cart3").delete().eq("productid",productid);
    }
  } catch (error) {
    console.log(error.message);
  }
}

export const addFavouriteItem = async () => {
  try {
    console.log("callingg");
    const response = await supabase.from("fav").select("*");
    const existingProduct = await supabase.from("fav").select("*").eq("productid",2);
    console.log(existingProduct.data);
    if(existingProduct?.data?.length == 0){
      console.log("run1");
      const response = await supabase.from("fav").insert({productid:2,name:"Apple",price:50,image:"https://images.pexels.com/photos/206959/pexels-photo-206959.jpeg?auto=compress&cs=tinysrgb&w=600"})
      console.log(response);
    }else{
      console.log("run2");
      return ;
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const loadCartData = async () => {
      try {
        const response = await supabase.from("cart3").select("*");
        const list = response?.data;
       
        return response?.data;
      } catch (error) {
        console.log(error.message)
      }
}