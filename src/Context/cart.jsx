"use client";
import { createContext, useReducer, useEffect } from "react";
import { cartReducer } from "@/Reducer/Cart";
const CartContext = createContext();
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, [], () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart")) || [];
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
