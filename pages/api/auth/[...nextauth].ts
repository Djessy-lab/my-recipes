import nextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../../../app/lib/prisma"
import NextAuth from "next-auth/next"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const githubId = process.env.GITHUB_ID
const githubSecret = process.env.GITHUB_SECRET

const googleId = process.env.GOOGLE_ID
const googleSecret = process.env.GOOGLE_SECRET

if(!githubId || !githubSecret || !googleId || !googleSecret) {
  throw new Error("Missing env variables for auth")
}

export const authConfig = {
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret
    }),
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleSecret
    })
  ],
  adapter: PrismaAdapter(prisma)
} satisfies NextAuthOptions

export default NextAuth(authConfig)
