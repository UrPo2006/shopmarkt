// app/api/profile/getProfile/route.ts
import { NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth";


export async function GET() {
  try {
    const decoded = await getDecodedToken(); 

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/users/${decoded?.id}`, {
      headers: { token: decoded?.token as string },
    });

    const data = await res.json();
    return NextResponse.json({ status: "success", data }, { status: 200 });
  } catch (err) {
        if(err instanceof Error){console.error(err);
    return NextResponse.json({ status: "error", message: err.message }, { status: 500 });}
    
  }
}
