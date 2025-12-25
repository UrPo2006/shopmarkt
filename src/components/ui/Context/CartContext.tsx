'use client'

import { CartResponse } from "@/interfaces"
import { createContext, ReactNode, useCallback, useEffect, useState } from "react"

export const CartContext = createContext <
{
     isLoading: boolean,
  setIsLoading: (value: boolean) => void,
   cartData: CartResponse | null, 
   setCartData: (value: CartResponse | null) => void
     getCart: () => void
}

> ({
    isLoading: false, 
    setIsLoading: () => { },
     cartData: null, 
     setCartData: () => { },
     getCart: () => {}
});

export default function CartContextProvider({ children }: { children : ReactNode }) {
      const [cartData, setCartData] = useState <CartResponse | null> (null)
    const [isLoading, setIsLoading] = useState(false);
 
  const getCart = useCallback(async () => {
    setIsLoading(true);
    try {
          const res = await fetch('http://localhost:3000/api/cart/get-cart', {
     
    })
         const data= await res?.json();
     
     
      setCartData(data);
      console.log(data);
     
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
useEffect (()=>{
    getCart();
},[getCart])





    return <CartContext.Provider value={{isLoading,setIsLoading ,cartData, getCart,setCartData }} >
        {children}
    </CartContext.Provider>
}