import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const decoded = await getDecodedToken();

  if (!decoded?.token) {
    return new Response("Not authenticated", { status: 401 });
  }

  const { productId } = await request.json();

  const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: decoded.token,
    },
    body: JSON.stringify({ productId }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}

