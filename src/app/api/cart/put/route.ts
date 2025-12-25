import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
    const decoded = await getDecodedToken()
  const { productId, count } = await request.json();

  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
        token: decoded?.token as string,
    },
    body: JSON.stringify({ count }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
