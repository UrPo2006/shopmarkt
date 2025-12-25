// app/api/addresses/delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth";


export async function DELETE(req: NextRequest) {
  try {
    const decoded = await getDecodedToken();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) throw new Error("Address ID is required");

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`, {
      method: "DELETE",
      headers: { token: decoded?.token as string },
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    
          if(err instanceof Error){return NextResponse.json({ status: "error", message: err.message }, { status: 500 });}
    
  }
}
