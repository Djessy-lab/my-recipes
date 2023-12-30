import prisma from "../../lib/prisma";
import { NextResponse } from "next/server"

export async function POST(request){
    const res = await request.json()
    const {title, image, ingredients, instructions} = res;
     const result = await prisma.recipes.create({
        data: {
            title,
            image,
            ingredients,
            instructions
        }
     })

    return NextResponse.json({result})
}
