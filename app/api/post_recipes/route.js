import { getServerSession } from "next-auth";
import prisma from "../../lib/prisma";
import { NextResponse } from "next/server"
import { authConfig } from "../../../pages/api/auth/[...nextauth]";

export async function POST(request){
    const session = await getServerSession(authConfig)
    const res = await request.json()
    const {title, image, ingredients, instructions} = res;

    if(!session){
      console.log("no session");
      return NextResponse.redirect("/api/auth/signin")
    }

    const prismaUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    })

    if(!prismaUser){
      console.log("user not found");
      return
    }
     const result = await prisma.recipes.create({
        data: {
            title,
            image,
            ingredients,
            instructions,
            userId: prismaUser.id
        }
     })

    return NextResponse.json({result})
}
