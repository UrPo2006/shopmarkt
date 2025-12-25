import { NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth"; // مسار الدالة

export async function POST(req: Request) {
  try {
    const { cartId, shippingAddress } = await req.json();

    if (!cartId || !shippingAddress) {
      return NextResponse.json({ status: "error", message: "Missing cartId or shippingAddress" }, { status: 400 });
    }

    const decoded = await getDecodedToken();
    const token = decoded?.token;

    if (!token) {
      return NextResponse.json({ status: "error", message: "Not authenticated" }, { status: 401 });
    }

    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", token },
        body: JSON.stringify({ shippingAddress }),
      }
    );

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("External API error:", data);
      return NextResponse.json({ status: "error", message: data?.message || "External API failed" }, { status: res.status });
    }

    return NextResponse.json({ status: "success", data });
  } catch (err) {
    console.error("Unexpected API error:", err);
    return NextResponse.json({ status: "error", message: "Something went wrong" }, { status: 500 });
  }
}
