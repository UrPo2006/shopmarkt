
import { NextRequest, NextResponse } from "next/server";
import { getDecodedToken } from "../../helpers/auth";

export async function PUT(req: NextRequest) {
  try {
    const decoded = await getDecodedToken();
    const body = await req.json();

    const res = await fetch(
      "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: decoded?.token as string,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    return NextResponse.json(data, { status: res.status });
  } catch (err) {
        if(err instanceof Error){ return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );}
   
  }
}
