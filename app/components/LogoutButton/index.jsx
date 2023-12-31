'use client'

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export const LogoutButton = () => {
  return (
    <button onClick={async () => {
      await signOut()
    }} ><LogOut size={32} className='text-text hover:text-accent mt-[-10px]' /></button>
  )
}
