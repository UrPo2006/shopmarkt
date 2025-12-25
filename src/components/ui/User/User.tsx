"use client"
import { useSession } from 'next-auth/react';
import React from 'react'

export default function User() {
      const{ data: session} = useSession();
  return <>
    

     <div>
      {session?.user?.name && (
  <h1>Hi, {session.user.name}👋</h1>
)}
    </div>
  </>
}
