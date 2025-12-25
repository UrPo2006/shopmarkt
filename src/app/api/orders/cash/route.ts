import { NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth";

export async function POST(req: Request) {
  try {
    const { cartId, shippingAddress } = await req.json();

    if (!cartId || !shippingAddress) {
      return NextResponse.json(
        { status: "error", message: "Missing cartId or shippingAddress" },
        { status: 400 }
      );
    }
    const decoded = await getDecodedToken();
    const token = decoded?.token;

    if (!token) {
      return NextResponse.json({ status: "error", message: "Not authenticated" }, { status: 401 });
    }

       const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            method: "POST",
            headers: {
              token, "Content-Type": "application/json",
            },
            body: JSON.stringify({ shippingAddress}),
          }
        );
    
    const data = await res.json();

    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { status: "error", message: "Something went wrong" },
      { status: 500 }
    );
  }
}
