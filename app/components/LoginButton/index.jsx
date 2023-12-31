'use client'

import { LogIn } from "lucide-react";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  return (
    <button onClick={async () => {
      await signIn()
    }} ><LogIn size={32} className='text-text hover:text-accent' /></button>
  )
}
