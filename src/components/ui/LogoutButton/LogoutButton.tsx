"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/"); // الهوم
  };

  return (
    <button
      onClick={handleLogout}
      className=" text-black dark:text-white hover:text-red-500 hover:underline"
    >
      Logout
    </button>
  );
}
