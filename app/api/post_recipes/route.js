import prisma from "../../lib/prisma";
import { getSession } from 'next-auth/react';
import { NextResponse } from "next/server";

export async function POST(request){
    const session = await getSession({ req: request });

    // Vérifie si l'utilisateur est connecté
    if (!session?.user?.id) {
        return NextResponse.error(new Error('User not authenticated'), { status: 401 });
    }

    try {
        const res = await request.json();
        const { title, image, ingredients, instructions } = res;

        // Crée la recette et associe l'ID de l'utilisateur
        const result = await prisma.recipes.create({
            data: {
                title,
                image,
                ingredients,
                instructions,
                user: {
                    connect: {
                        id: session.user.id // Associe la recette à l'utilisateur connecté
                    }
                }
            }
        });

        return NextResponse.json({ result });
    } catch (error) {
        console.error('Error creating recipe:', error);
        return NextResponse.error(new Error('Failed to create recipe'), { status: 500 });
    }
}
