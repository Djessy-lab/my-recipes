import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';

export async function PUT(request, { params }) {
  const id = params.id;
  const { ...recipeData } = await request.json();
  const session = await getSession({ req: request });

  if (!id) {
    return new Response('Invalid ID', { status: 400 });
  }

  if (!session?.user?.id) {
    return new Response('User not authenticated', { status: 401 });
  }

  try {
    const existingRecipe = await prisma.recipes.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        userId: true,
      },
    });

    // Vérifie si la recette existe et si elle appartient à l'utilisateur connecté
    if (!existingRecipe || existingRecipe.userId !== session.user.id) {
      return new Response('Recipe not found or unauthorized', { status: 403 });
    }

    const updatedRecipe = await prisma.recipes.update({
      where: {
        id: Number(id),
      },
      data: {
        ...recipeData,
      },
    });

    return new Response(JSON.stringify(updatedRecipe), { status: 200 });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return new Response('Error updating recipe', { status: 500 });
  }
}
