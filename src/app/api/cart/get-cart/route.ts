import { getDecodedToken } from "@/app/api/helpers/auth";
import { CartResponse } from "@/interfaces";
import { NextResponse } from "next/server";

export async function GET() {
     const decoded = await getDecodedToken()
     const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
             "Content-Type": "application/json",
        token: decoded?.token as string,
    },
    })
         const data: CartResponse = await res.json();
         return NextResponse.json(data)
}