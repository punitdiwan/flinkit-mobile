import React, { createContext, useContext, useState, ReactNode } from "react";

interface MyContextData {
  count: number;
  toggle: Boolean;
  categoryName: string;
  finalPrice: number;
  itemValue: number;
  myCart: any[];
  increment: () => void;
  setToggle: (toggle: boolean) => void;
  loginToggle: () => void;
  logoutToggle: () => void;
  setcategoryname: (newCategoryName: string) => void;
  totalPrice: (price: number) => any;
  itemIncrement: (id: string, item: any) => void;
  itemDecrement: (id: string, item: any) => void;
  itemsAddInCart: (item: any) => void;
}

// Create the context with initial values
const MyContext = createContext<MyContextData>({
  count: 0,
  myCart: [],
  finalPrice: 0,
  toggle: false,
  itemValue: 1,

  categoryName: "",
  increment: () => {},
  loginToggle: () => {},
  logoutToggle: () => {},
  setcategoryname: () => {},
  setToggle: () => {},
  totalPrice: (price: number) => {
    return 0;
  },
  itemIncrement: () => {},
  itemDecrement: () => {},
  itemsAddInCart: () => {},
});

export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(1);

  const [finalPrice, setFinalPrice] = useState(0);

  const [itemValue, setItemValue] = useState(1);
  const [myCart, setMyCart] = useState<any>([]);
  const [toggle, setToggle] = useState(false);
  const [categoryName, setcategoryname] = useState("zeeshan");

  const increment = () => {
    setCount(count + 1);
  };
  const loginToggle = async () => {
    setToggle(true);
    console.log("true");
  };
  const logoutToggle = () => {
    setToggle(false);
    console.log("false");
  };

  const totalPrice = (price: number) => {
    return setFinalPrice(price + finalPrice);
  };

  const itemIncrement = (id: string, item: any) => {
    // setItemValue(itemValue + 1);
    if (myCart.id == id) {
      setItemValue(itemValue + 1);
    } else {
      setMyCart([...myCart, item]);
    }
  };
  const itemDecrement = (id: string) => {
    if (itemValue > 1) {
      setItemValue(itemValue - 1);
    } else {
    }
  };
  const itemsAddInCart = (item: any) => {
    setMyCart([...myCart, item]);
    item.buttonActive = true;
  };

  return (
    <MyContext.Provider
      value={{
        categoryName,
        count,
        increment,
        toggle,
        loginToggle,
        setcategoryname,
        logoutToggle,
        setToggle,
        finalPrice,
        totalPrice,
        itemIncrement,
        itemDecrement,
        itemValue,
        itemsAddInCart,
        myCart,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
