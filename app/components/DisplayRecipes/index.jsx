'use server'

import Link from 'next/link';
import prisma from '../../lib/prisma'

const DisplayRecipes = async () => {
  const recipes = await prisma.recipes.findMany()
  const recipeCount = recipes.length;
  const gridClass = recipeCount === 1 ? 'grid-cols-1' : recipeCount === 2 ? 'grid-cols-2' : 'grid-cols-3';

  return (
    <div>
      <div className={`grid ${gridClass} gap-8 p-8 justify-center mb-10`}>
        {recipes.map((recipe) => (
          <Link key={recipe.id} href={`/${recipe.id}`}>
            <div
              key={recipe.id}
              className='shadow-md hover:shadow-lg p-24 rounded flex flex-col items-center min-w-xl max-h-96 bg-center bg-cover bg-no-repeat relative'
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}>
              <div className="absolute inset-0 bg-gradient-to-b from-black hover:opacity-30 to-black opacity-50 rounded transition-all"></div>
              <h2 className='mb-4 text-xl text-white font-bold z-10'>{recipe.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DisplayRecipes
