import prisma from "@/app/lib/prisma";

export async function GET(request, {params}) {
  const id = params.id;

  if (!id) {
      return new Response('Invalid ID', { status: 400 });
  }

  try {
      const getRecipe = await prisma.recipes.findUnique({
          where: { id: Number(id) }
      });
      return new Response(JSON.stringify(getRecipe), { status: 200 });
  } catch (error) {
      console.error('Error get recipe:', error);
      return new Response('Error get recipe', { status: 500 });
  }
}
