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



//  export const addData=async () =>{
//     const {data,error} = await supabase.from('cart').insert({name:'fanta',price:45});
//    return(data);
//  }

//  export const showAllData = async () => {
//   const response = await supabase.from("cart").select();
//   console.log(response);
//  }


//  export const deleteParticulerData = async () => {
//   const response = await supabase.from("cart").delete().eq("id",8);
//   console.log(response);
//  }

// export const editParticularData = async () => {
//   const response = await supabase.from("cart").delete().eq('id',2);
//   console.log(response);
// }


// Add favourite functinality
export const addFavouriteItemToDb = async (name,price) => {
      try {
        console.log("calling");
        // const existingData = await supabase.from("cart").select();

        const response = await supabase.from("cart").insert({name,price,image:"https://images.pexels.com/photos/13950097/pexels-photo-13950097.jpeg?auto=compress&cs=tinysrgb&w=600"});
        console.log(response);
      } catch (error) {
        console.log(error.message);
      }
}

export const deleteFavouriteItem = async() => {
  try {
    const oldData = await supabase.from("cart").select();
    console.log("OldData",oldData)
    const response = await supabase.from("cart").delete().eq("id",10);
    const existingData = await supabase.from("cart").select();
    console.log("New",existingData);
  } catch (error) {
    console.log(error.message);
  }
}

export async function giveMeAllFavouriteItem(){
  try {
    const allItemList = await supabase.from("cart").select();
    return allItemList ;
  } catch (error) {
    console.log(error.message)
  }
}



// Add to cart functionality
// export const addToCart = async (productid,name,price) => {
//   try {
//     const response = await supabase.from("cart1").insert({productid,name,price,image:"https://images.pexels.com/photos/16830765/pexels-photo-16830765/free-photo-of-a-little-boy-drinking-soda-in-a-can.jpeg?auto=compress&cs=tinysrgb&w=600"})
//     console.log(response);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

export const getAllCartItem = async() => {
      try {
        const response = await supabase.from("cart1").select();
        return response
      } catch (error) {
        console.log(error.message);
      }
}


// ------------------------------------------------------

export const addToCart = async (productid,name,price) => {
  try {
    const response = await supabase.from("cart2").select();

    const existingProduct = await supabase.from("cart2").select("*").eq("productid",productid);
    if(existingProduct?.data?.length == 0){
      console.log("runn1");
      const response = await supabase.from("cart2").insert({productid,name,price,image:"https://images.pexels.com/photos/16830765/pexels-photo-16830765/free-photo-of-a-little-boy-drinking-soda-in-a-can.jpeg?auto=compress&cs=tinysrgb&w=600",quantity:1});
    }
    else{
      console.log("runn2");
      const newData = existingProduct?.data[0].quantity + 1;
      console.log(existingProduct.data[0].quantity);
      const res = await supabase.from("cart2").update({quantity:newData}).eq("productid",productid);
      console.log(res);
    }

  } catch (error) {
    console.log(error.message)
  }
}


export const deleteParticularItemInCart = async (productid) => {
    try {
      const response = await supabase.from("cart2").select();
      const existingProduct = await supabase.from("cart2").select("*").eq("productid",productid);
      if(existingProduct?.data?.length == 0){
        return;
      }else if(existingProduct?.data[0].quantity == 1){
          const response = await supabase.from("cart2").delete().eq("productid",productid);
      }else{
        const newQuantity = existingProduct?.data[0].quantity-1;
        const response = await supabase.from("cart2").update({quantity:newQuantity}).eq("productid",productid);
      }
    } catch (error) {
      console.log(error.message);
    }
}