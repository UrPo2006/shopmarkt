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

 // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MmQ5YmJiODRkOTUwYzkwMjNjMmE4MiIsIm5hbWUiOiJyYWhtYSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzY0NzkxMDUwLCJleHAiOjE3NzI1NjcwNTB9.VDRIs3-0U1enst2-nl3sWtq8Xrz6KEhiPy3bOrrOj_g";

  const getWishList = useCallback(async () => {
    setIsLoading(true);
    try {
      // const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      //   headers: { token }
      // });
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
