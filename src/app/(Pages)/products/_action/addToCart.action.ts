"use server";

import { getDecodedToken } from "@/app/api/helpers/auth";



export async function addToCartAction(productId: string) {
  const decoded = await getDecodedToken();

  if (!decoded?.token) {
    throw new Error("Token is missing or invalid");
  }

  const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
    method: 'POST',
    body: JSON.stringify({ productId }),
    headers: {
      token: decoded.token, 
      "Content-Type": "application/json"
    }
  });

  const data = await res.json();
  return data;
}
