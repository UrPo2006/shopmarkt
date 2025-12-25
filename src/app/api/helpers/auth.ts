import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getDecodedToken() {
  const cookieStore = cookies();
  const tokenCookie =
    (await cookieStore).get("next-auth.session-token") ||
    (await cookieStore).get("__Secure-next-auth.session-token");

  if (!tokenCookie) throw new Error("Not authenticated");

  const decoded = await decode({
    token: tokenCookie.value,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded;
}
