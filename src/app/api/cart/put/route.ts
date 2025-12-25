import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const decoded = await getDecodedToken();

  if (!decoded?.token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId, count } = await request.json();

  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: decoded.token,
      },
      body: JSON.stringify({ count }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    console.error("Update cart error:", text);
    return NextResponse.json(
      { message: "Failed to update cart" },
      { status: 500 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
