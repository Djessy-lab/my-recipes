import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function DELETE({params}){
    const id = params.id;

    const recipe = await prisma.recipes.delete({
        where: {id: id}
    })

    return NextResponse.json(recipe)
}
