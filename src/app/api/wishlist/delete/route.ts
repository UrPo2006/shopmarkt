import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";
export async function DELETE(request: Request) {
  const decoded = await getDecodedToken();

  if (!decoded?.token) {
    return new Response("Not authenticated", { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId");

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: decoded.token,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

