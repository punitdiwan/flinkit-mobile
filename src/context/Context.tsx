import React, { createContext, useContext, useState, ReactNode } from "react";
import { addToCart, loadCartData } from "../screens/supabaseClient";

interface MyContextData {
  getItemQuintity: (id: string) => number;
  increaseCardQuantity: (id: string) => void;
  decreaseCardQuantity: (id: string) => void;
  removeFromcart: (id: string) => void;
  total: (id: string) => void;
  cartItem: [];
  addingItemInCart:(data:[]) => void;
  refresh:Boolean;
  changeRefreshState:() => void;
}

// Create the context with initial values
const MyContext = createContext({} as MyContextData);

type CartItem = {
  id: string;
  quantity: number;
};

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItem, setCartItem] = useState<CartItem[]>([]);
  const [refresh,setRefresh] = useState(false);

  function getItemQuintity(id: string) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCardQuantity(id: string) {
    // setCartItem((currentItems) => {
    //   if (currentItems.find((item) => item.id === id) == null) {
    //     return [...currentItems, { id, quantity: 1 }];
    //   } else {
    //     return currentItems.map((item) => {
    //       if (item.id === id) {
    //         return { ...item, quantity: item.quantity + 1 };
    //       } else {
    //         return item;
    //       }
    //     });
    //   }
    // });
    
    addToCart(id);
    const response = loadCartData();
    console.log(response);
    
    // setCartItem(response);
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

  function removeFromcart(id: string) {
    setCartItem((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  // Add to cart by harsh
  function addingItemInCart(data){
    setCartItem(data);
  }

  function changeRefreshState(){
    setRefresh(!refresh)
  }

  // end

  return (
    <MyContext.Provider
      value={{
        cartItem,
        getItemQuintity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromcart,
        addingItemInCart,
        refresh,
        changeRefreshState
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
