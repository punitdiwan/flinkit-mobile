import React, { createContext, useContext, useState, ReactNode } from "react";
import { addFavouriteItemToDb } from "../screens/supabaseClient";

interface MyContextData {
  getItemQuintity: (id: string) => number;
  increaseCardQuantity: (id: string) => void;
  decreaseCardQuantity: (id: string) => void;
  removeFromcart: (id: string) => void;
  total: (id: string) => void;

  addFavouriteItem:(name:string,price:Number) => void;
  addItemsToFavourite:(itemList:[]) => void;
  cartItem:[];
  favouriteItem:[];
}
// Create the context with initial values
const MyContext = createContext({} as MyContextData);

type CartItem = {
  id: string;
  quantity: number;
};


type favouriteItem = {
    product_imagename :string,
    product_details:string,
    price:Number,
    id:string
}

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [favouriteItem,setFavouriteItem] = useState<favouriteItem[]>([])


  function getItemQuintity(id: string) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  function addItemsToFavourite(itemList:[]){
    console.log("per",itemList);
    setFavouriteItem([...itemList]);
    
  }

 async function addFavouriteItem(name:string,price:Number){
    const response = addFavouriteItemToDb(name,price);
    console.log(response);
    
  
  }
 

  function increaseCardQuantity (id:string){
    setCartItem( currentItems =>{
        if(currentItems.find(item => item.id === id) == null){
            return [...currentItems,{id,quantity:1}]
    }else{
        return currentItems.map(item =>{
            if(item.id === id){
                return {...item,quantity:item.quantity + 1}
            }else{
                return item
  
  
            }
          });
        }
      });
    }
    function decreaseCardQuantity(id: string) {
      setCartItem((currentItems) => {
        if (currentItems.find((item) => item.id === id)?.quantity === 1) {
          return currentItems.filter((item) => item.id !== id);
        } else {
          return currentItems.map((item) => {
            if (item.id === id) {
              return { ...item, quantity: item.quantity - 1 };
            } else {
              return item;
            }
          });
        }
      });
    }
    function removeFromcart(id:string){
      setCartItem(currItems =>{
          return currItems.filter(item => item.id !== id)
      })
    }
  return <MyContext.Provider value={{cartItem,getItemQuintity,increaseCardQuantity,decreaseCardQuantity,removeFromcart,addFavouriteItem,addItemsToFavourite}}>{children}</MyContext.Provider>;
}





 







  // function removeFromcart(id: string) {
  //   setCartItem((currItems) => {
  //     return currItems.filter((item) => item.id !== id);
  //   });
  // }
  // return (
  //   <MyContext.Provider
  //     value={{
  //       cartItem,
  //       getItemQuintity,
  //       increaseCardQuantity,
  //       decreaseCardQuantity,
  //       removeFromcart,
  //     }}
  //   >
  //     {children}
  //   </MyContext.Provider>
  // );





// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
