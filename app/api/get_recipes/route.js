import prisma from '@/app/lib/prisma';

export async function GET(req, res) {
  try {
    const recipes = await prisma.recipes.findMany();
    res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
}
