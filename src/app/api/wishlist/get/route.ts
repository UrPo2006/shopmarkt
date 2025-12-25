import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const decoded = await getDecodedToken();

  
  if (!decoded?.token) {
    return new Response("Not authenticated", { status: 401 });
  }

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      "Content-Type": "application/json",
      token: decoded.token, 
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}
