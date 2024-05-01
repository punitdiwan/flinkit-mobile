// Context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface MyContextData {
  // Define the properties and their types here
  // For example:
  count: number;
  toggle:Boolean;
  categoryName:string;
  increment: () => void;
  ModalToggle: () => void;
  setcategoryname: (newCategoryName: string) => void;
}

// Create the context with initial values
const MyContext = createContext<MyContextData>({
  count: 0,
  toggle:false,
  categoryName:'',
  increment: () => {},
  ModalToggle: () => {},
  setcategoryname: () => {},
});

// Define a provider component to wrap your app
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define state variables and functions to manipulate them
  const [count, setCount] = useState(1);
  const [toggle,setToggle] =useState(false);
  const [categoryName,setcategoryname] =useState("zeeshan");
  // Define functions to manipulate state
  const increment = () => {
    setCount(count + 1);
  };
  const ModalToggle=()=>{
    setToggle(!toggle)
  }

  // Provide the context value to the components
  return (
    <MyContext.Provider value={{categoryName, count, increment,toggle,ModalToggle,setcategoryname }}>
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
