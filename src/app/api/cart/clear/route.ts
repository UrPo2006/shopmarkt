import { getDecodedToken } from "@/app/api/helpers/auth";
import { NextResponse } from "next/server";

export async function DELETE() {
  const decoded = await getDecodedToken()
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
       token: decoded?.token as string,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}
