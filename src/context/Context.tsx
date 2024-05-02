// Context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface MyContextData {
  // Define the properties and their types here
  // For example:
  count: number;
  isSignedIn:Boolean;
  categoryName:string;
  increment: () => void;
  setisSignedIn: () => void;
  setcategoryname: (newCategoryName: string) => void;
}

// Create the context with initial values
const MyContext = createContext<MyContextData>({
  count: 0,
  isSignedIn:false,
  categoryName:'',
  increment: () => {},
  setisSignedIn: () => {},
  setcategoryname: () => {}

});

// Define a provider component to wrap your app
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define state variables and functions to manipulate them
  const [count, setCount] = useState(1);
  const [isSignedIn,setisSignedIn] =useState(false);
  const [categoryName,setcategoryname] =useState("zeeshan");
  // const [isSignedIn, isSignedIn] = useState(false)
  // Define functions to manipulate state
  const increment = () => {
    setCount(count + 1);
  };
  const ModalToggle=()=>{
    setisSignedIn(!isSignedIn)
  }

  // Provide the context value to the components
  return (
    <MyContext.Provider value={{categoryName, count, increment,isSignedIn,setisSignedIn,setcategoryname }}>
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
