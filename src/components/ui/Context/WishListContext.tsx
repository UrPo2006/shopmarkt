'use client'

import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { WishListResponse } from "@/interfaces/WishList";

export const WishListContext = createContext<{
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  wishList: WishListResponse | null;
  setWishList: (value: WishListResponse) => void;
  getWishList: () => void;
}>({
  isLoading: false,
  setIsLoading: () => {},
  wishList: null,
  setWishList: () => {},
  getWishList: () => {},
});

export default function WishListProvider({ children }: { children: ReactNode }) {
  const [wishList, setWishList] = useState<WishListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  const getWishList = useCallback(async () => {
    setIsLoading(true);
    try {
    
        const res = await fetch("/api/wishlist/get");
       const data: WishListResponse = await res?.json();
    
      setWishList(data);
    } catch (err) {
      console.error("Failed to fetch wishlist:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getWishList();
  }, [getWishList]);

  return (
    <WishListContext.Provider value={{ isLoading, setIsLoading, wishList, setWishList, getWishList }}>
      {children}
    </WishListContext.Provider>
  );
}
