import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { addToCart, loadCartData } from "../screens/supabaseClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MyContextData {
  getItemQuintity: (id: string) => number;
  increaseCardQuantity: (id: string) => void;
  decreaseCardQuantity: (id: string) => void;
  removeFromcart: (id: string) => void;
  total: (id: string) => void;
  addingItemInCart: (data: []) => void;
  deleteParticularItemInCart : (data:number) => void;
  decreaseCartQuantity : (data:number) => void;
  increaseCartQuantity : (data:number) => void;
  refresh: Boolean;
  changeRefreshState: () => void;
  addFavouriteItemList : (data:[]) => void;
  cartItem: [];
  favouriteItem:[];
  clearCart:() => void;
  addAllFavItemInCart : (data:[]) => void;
  userId:"";
  setUserId:() => void;
  getAsyncStorageCartItemsAndAddInCart : (data:[]) => void
}

// Create the context with initial values
const MyContext = createContext({} as MyContextData);

type CartItem = {
  id: string;
  quantity: number;
  name: string,
  price: number
};

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const [cartItem, setCartItem] = useState<CartItem[]>([]);

  const [cartItem, setCartItem] = useState([]);
  const [favouriteItem,setFavouriteItem] = useState([]);
  

  // Add to cart by harsh
  async function addingItemInCart(data: any) {
    console.log("addingItemInCart",data);
    
    if (cartItem?.length == 0) {
      const itemObj = new Object(data);
      itemObj.qty = 1;
      const item = [itemObj];
      setCartItem(item);
      AsyncStorage.setItem("cartItem",JSON.stringify(item));
      
    } else {
      const findingProductInCartItem = cartItem?.filter((item): any => item?.product_id == data?.product_id);
      if (findingProductInCartItem?.length > 0) {
        const removeFindProduct = cartItem?.filter((item): any => item?.product_id !== data?.product_id);
        findingProductInCartItem[0].qty = findingProductInCartItem[0].qty + 1;
        removeFindProduct.push(...findingProductInCartItem);
        setCartItem([...removeFindProduct]);
        AsyncStorage.setItem("cartItem",JSON.stringify(removeFindProduct));
      } else {
        const newObj = new Object(data);
        newObj.qty = 1;
        const newArr = [...cartItem];
        newArr.push(newObj);
        setCartItem([...newArr]);
        AsyncStorage.setItem("cartItem",JSON.stringify(newArr));
      }

    }
    // console.log("cartItem",cartItem?.length);
    
  }

function getAsyncStorageCartItemsAndAddInCart(data:any){
      setCartItem(data);
}

   const deleteParticularItemInCart = (product_id) => {
    console.log(product_id);
    
    if(cartItem?.length == 0){
      return
    }else{
      const findProductExistOrNot = cartItem.filter(item => item?.product_id == product_id);
      if(findProductExistOrNot.length > 0){
        const updatedCartItem = cartItem.filter(item => item?.product_id !== product_id);
        setCartItem([...updatedCartItem])
        AsyncStorage.setItem("cartItem",JSON.stringify(updatedCartItem));
        
      }else{
        return
      }
      
      
    }
  }

  function decreaseCartQuantity(product_id){
      const findProductExistsOrNot = cartItem.filter(item => item?.product_id == product_id);
      if(findProductExistsOrNot.length > 0){
        const updatedCart = cartItem.filter(item => item?.product_id !== product_id);
        if(findProductExistsOrNot[0]?.qty > 1){
            findProductExistsOrNot[0].qty = findProductExistsOrNot[0]?.qty - 1;
            updatedCart.push(findProductExistsOrNot[0]);
            setCartItem(updatedCart);
            AsyncStorage.setItem("cartItem",JSON.stringify(updatedCart));
        }else{
          deleteParticularItemInCart(product_id);
        }
      }else{
        return;
      }
  }

  function increaseCartQuantity(product_id){
    const findProductExistsOrNot = cartItem.filter(item => item?.product_id == product_id);
    if(findProductExistsOrNot.length > 0){
      const updatedCart = cartItem.filter(item => item?.product_id !== product_id);
      findProductExistsOrNot[0].qty = findProductExistsOrNot[0]?.qty + 1;
      updatedCart.push(findProductExistsOrNot[0]);
      console.log("updatedCart",updatedCart);
      
      setCartItem(updatedCart)
      AsyncStorage.setItem("cartItem",JSON.stringify(updatedCart));
    }else{
      return;
    }
  }

  function addFavouriteItemList(data:any){
      setFavouriteItem([]);
      setFavouriteItem([...data]);
  }

  function clearCart(){
    setCartItem([]);
  }

  function addAllFavItemInCart(data){
 
      const findProductIsExistOrNot = cartItem.filter(item => item?.product_id == data?.product_id);
      console.log(findProductIsExistOrNot.length > 0 ? "true" : "false");
      if(findProductIsExistOrNot.length > 0){
        return
      }else{
        const obj = new Object(data);
        obj.qty = 1;
        const updatedCart = cartItem;
        updatedCart.push(obj);
        setCartItem([]);

        
        setCartItem([...updatedCart]);
      }
  }


 
  // end

  const loadCartItemFromAsyncStorage = async () => {
    try {
      const cart = await AsyncStorage.getItem("cartItem") || [];
      console.log("carttt",cart);
      setCartItem(cart)
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <MyContext.Provider
      value={{
        cartItem,
        favouriteItem,
        addingItemInCart,
        deleteParticularItemInCart,
        decreaseCartQuantity,
        increaseCartQuantity,
        addFavouriteItemList,
        clearCart,
        addAllFavItemInCart,
        getAsyncStorageCartItemsAndAddInCart
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);




