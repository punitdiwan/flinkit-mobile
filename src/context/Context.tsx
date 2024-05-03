
import React, { createContext, useContext, useState, ReactNode } from 'react';



interface MyContextData {

  count: number;
  toggle: Boolean;
  categoryName: string;

  increment: () => void;
  setToggle: (toggle:boolean)=> void;
  loginToggle: () => void;
  logoutToggle: () => void;
  setcategoryname: (newCategoryName: string) => void;
}

// Create the context with initial values
const MyContext = createContext<MyContextData>({
  count: 0,
  toggle: false,
  categoryName: "",
  increment: () => {},
  loginToggle: () => {},
  logoutToggle: () => {},
  setcategoryname: () => {},
  setToggle:()=>{}
});


export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(1);

  const [toggle,setToggle] = useState(false);
  const [categoryName,setcategoryname] =useState("zeeshan");
  
  const increment = () => {
    setCount(count + 1);
  };
  const loginToggle= async ()=>{
    setToggle(true)
    console.log("true")

  }
  const logoutToggle =()=>{
    setToggle(false)
    console.log("false")
  }


  return (
    <MyContext.Provider value={{categoryName, count, increment,toggle,loginToggle,setcategoryname,logoutToggle,setToggle }}>

      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
