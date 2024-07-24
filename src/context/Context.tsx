import React, { createContext, useContext, useState, ReactNode } from "react";
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
  setUserId:() => void
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
  function addingItemInCart(data: any) {
    
    if (cartItem?.length == 0) {
      const itemObj = new Object(data);
      itemObj.qty = 1;
      const item = [itemObj];
      setCartItem(item);
    } else {
      const findingProductInCartItem = cartItem?.filter((item): any => item?.product_id == data?.product_id);
      if (findingProductInCartItem?.length > 0) {
        const removeFindProduct = cartItem?.filter((item): any => item?.product_id !== data?.product_id);
        findingProductInCartItem[0].qty = findingProductInCartItem[0].qty + 1;
        removeFindProduct.push(...findingProductInCartItem);
        setCartItem([...removeFindProduct]);

      } else {
        const newObj = new Object(data);
        newObj.qty = 1;
        const newArr = [...cartItem];
        newArr.push(newObj);
        setCartItem([...newArr]);
      }

    }
    // console.log("cartItem",cartItem?.length);
    
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
        console.log("c",cartItem);
        
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
      setCartItem(updatedCart)

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
    console.log("dataa",data);
    
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
        console.log("UpdatedCart",updatedCart);
        
        setCartItem([...updatedCart]);
      }
  }


 
  // end

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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);





// [
// {"category_id": 9, "created_at": "2024-06-06T10:33:44.439112+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "price": 30, "product_brand": "Coca Cola", "product_category": "Beaverages", "product_details": "7 up is a Lemon and Lime flavoured soft drink", "product_discount": "10%", "product_id": 25, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/7up.jpg", "product_imgeid": "5bc1ca71-7800-4893-a2fa-668683021a5e", "product_name": "7 Up", "product_packing_type": "liter", "product_total_qty": 120, "qty": 2, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-06T10:33:44.439112+00:00", "uuid": "1796e134-bee6-4d5f-a9e0-67d631c18935", "variant_group_id": null, "visibility": true, "weight": null}, [{"category_id": 9, "created_at": "2024-06-06T10:33:44.439112+00:00", "darkroomownerid": "2bde6510-8546-4a75-988a-a29a297b57c3", "group_id": 1, "price": 30, "product_brand": "Coca Cola", "product_category": "Beaverages", "product_details": "7 up is a Lemon and Lime flavoured soft drink", "product_discount": "10%", "product_id": 25, "product_imagename": "https://backend.delivery.maitretech.com/storage/v1/object/public/img/public/7up.jpg", "product_imgeid": "5bc1ca71-7800-4893-a2fa-668683021a5e", "product_name": "7 Up", "product_packing_type": "liter", "product_total_qty": 120, "qty": 2, "status": false, "tax_class": null, "type": "simple", "updated_at": "2024-06-06T10:33:44.439112+00:00", "uuid": "1796e134-bee6-4d5f-a9e0-67d631c18935", "variant_group_id": null, "visibility": true, "weight": null}]]