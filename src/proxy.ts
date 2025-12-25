import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile"];
const authPages = ["/login", "/register"];

export default async function proxy(req: NextRequest) {
  // جلب التوكن
  const token = await getToken({ req });

 
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";

  // حماية الصفحات التي تحتاج تسجيل دخول
  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL("/login", baseUrl);
      return NextResponse.redirect(redirectURL);
    }
  }

  
  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      return NextResponse.next();
    } else {
      const redirectURL = new URL("/", baseUrl);
      return NextResponse.redirect(redirectURL);
    }
  }

  // البقية يسمح بها للجميع
  return NextResponse.next();
}
