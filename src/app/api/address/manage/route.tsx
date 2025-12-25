// app/api/addresses/manage/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth";

export async function POST(req: NextRequest) {
  try {
    const decoded = await getDecodedToken();
    const body = await req.json();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/addresses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: decoded?.token as string,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
        if(err instanceof Error){ return NextResponse.json({ status: "error", message: err.message }, { status: 500 });}
   
  }
}

export async function PUT(req: NextRequest) {
  try {
    const decoded = await getDecodedToken();
    const body = await req.json();

    if (!body._id) throw new Error("Address ID is required");

    const { _id, ...rest } = body;

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: decoded?.token as string,
      },
      body: JSON.stringify(rest),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
        if(err instanceof Error){ return NextResponse.json({ status: "error", message: err.message }, { status: 500 });}
    
   
  }
}
