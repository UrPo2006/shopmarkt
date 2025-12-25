import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getDecodedToken() {
  try {
    const cookieStore = cookies();
    const tokenCookie =
      (await cookieStore).get("next-auth.session-token") ||
      (await cookieStore).get("__Secure-next-auth.session-token");

    if (!tokenCookie) {
      console.warn("No token cookie found");
      return null; 
    }

    const decoded = await decode({
      token: tokenCookie.value,
      secret: process.env.NEXTAUTH_SECRET!,
    });

    return decoded;
  } catch (err) {
    console.error("Error decoding token:", err);
    return null; // أي خطأ في decode يرجع null
  }
}
