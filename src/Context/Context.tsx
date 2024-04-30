// Context.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface MyContextData {
  // Define the properties and their types here
  // For example:
  count: number;
  toggle:Boolean;
  increment: () => void;
  ModalToggle: () => void;
}

// Create the context with initial values
const MyContext = createContext<MyContextData>({
  count: 0,
  toggle:false,
  increment: () => {},
  ModalToggle: () => {},
});

// Define a provider component to wrap your app
export const MyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define state variables and functions to manipulate them
  const [count, setCount] = useState(1);
  const [toggle,setToggle] =useState(false)

  // Define functions to manipulate state
  const increment = () => {
    setCount(count + 1);
  };
  const ModalToggle=()=>{
    setToggle(!toggle)
  }

  // Provide the context value to the components
  return (
    <MyContext.Provider value={{ count, increment,toggle,ModalToggle }}>
      {children}
    </MyContext.Provider>
  );
};

// Define a custom hook to easily access context
export const useMyContext = () => useContext(MyContext);
