import prisma from "@/app/lib/prisma";

export async function PUT(request, {params}) {
  const id = params.id;
  const { ...recipe } = await request.json();

  if (!id) {
      return new Response('Invalid ID', { status: 400 });
  }

  try {
      const updatedRecipe = await prisma.recipes.update({
          where: {
             id: Number(id),
            },
            data: {
              ...recipe,
            },
      });
      return new Response(JSON.stringify(updatedRecipe), { status: 200 });
  } catch (error) {
      console.error('Error updating recipe:', error);
      return new Response('Error updating recipe', { status: 500 });
  }
}
