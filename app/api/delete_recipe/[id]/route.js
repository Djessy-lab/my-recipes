import prisma from "../../../lib/prisma";

export async function DELETE(request, {params}) {
  const id = params.id;

  if (!id) {
      return new Response('Invalid ID', { status: 400 });
  }

  try {
      const deletedRecipe = await prisma.recipes.delete({
          where: { id: Number(id) }
      });
      return new Response(JSON.stringify(deletedRecipe), { status: 200 });
  } catch (error) {
      console.error('Error deleting recipe:', error);
      return new Response('Error deleting recipe', { status: 500 });
  }
}
