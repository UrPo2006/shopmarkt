// app/api/addresses/route.ts
import { NextResponse } from "next/server";
import { getDecodedToken } from "../helpers/auth";


export async function GET() {
  try {
    const decoded = await getDecodedToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      headers: { token: decoded?.token as string },
    });

    const data = await res.json();
    return NextResponse.json({ status: data.status, data: data.data });
  } catch (err) {
    if(err instanceof Error){return NextResponse.json({ status: "error", message: err.message }, { status: 500 });}
    
  }
}
