import { SignUpRequest, SignUpResponse } from "@/interfaces";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const body: SignUpRequest = await req.json();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    // لو في error من الـ API الخارجي
    if (!res.ok) {
      return NextResponse.json(
        { message: data.message || "Register failed" },
        { status: res.status }
      );
    }

  
    return NextResponse.json<SignUpResponse>(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
