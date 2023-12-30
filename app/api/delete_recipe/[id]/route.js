import prisma from "../../../lib/prisma";
import { getSession } from 'next-auth/react';

export async function DELETE(request, { params }) {
  const id = params.id;
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

    const deletedRecipe = await prisma.recipes.delete({
      where: { id: Number(id) },
    });

    return new Response(JSON.stringify(deletedRecipe), { status: 200 });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return new Response('Error deleting recipe', { status: 500 });
  }
}
