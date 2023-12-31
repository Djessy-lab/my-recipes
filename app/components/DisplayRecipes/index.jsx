'use server'

import Link from 'next/link';
import prisma from '../../lib/prisma'
import { unstable_noStore as noStore } from "next/cache";

const DisplayRecipes = async () => {
  noStore();
  const recipes = await prisma.recipes.findMany(
    {
      include: {
        user: true,
      },
    }
  )
  const recipeCount = recipes.length;
  const gridClass = recipeCount === 1 ? 'lg:grid-cols-1' : recipeCount === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';

  return (
    <div>
      <div className={`grid ${gridClass} sm:grid-cols-1 gap-8 p-8 justify-center mb-10`}>
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/${recipe.id}`}>
            <div
              key={recipe.id}
              className='shadow-md hover:shadow-lg p-24 rounded flex flex-col items-center min-w-xl max-h-96 bg-center bg-cover bg-no-repeat relative'
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black hover:opacity-30 to-black opacity-50 rounded transition-all"></div>
              <h2 className='mb-4 text-xl text-white font-bold z-10 text-center'>{recipe.title}</h2>
              <small className='font-bold text-neutral-100 z-50 text-center'>{recipe.user.name}</small>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DisplayRecipes
