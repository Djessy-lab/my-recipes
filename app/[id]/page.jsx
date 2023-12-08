import Link from 'next/link';
import prisma from '../lib/prisma';
import { Home } from 'lucide-react';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';

const Recipe = async ({ params }) => {
  const id = params.id;
  const recipe = await prisma.recipes.findUnique({
    where: { id: Number(id) },
  })

  if (!recipe) {
    return <div>Chargement en cours...</div>;
  }

  return (
    <div>
      <div className='flex justify-between bg-background p-4 shadow-md sticky top-0'>
        <Link href='/'>
          <Home size={32} color='green' />
        </Link>
        <div className='flex gap-4'>
          <DeleteButton recipeId={recipe.id} />
          <EditButton recipeId={recipe.id} />
        </div>
      </div>
      <h1 className='text-6xl text-center font-bold font-serif mt-10 mb-10 text-emerald-800'>{recipe.title}</h1>
      <div className='mx-auto mb-10 h-96 bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${recipe.image})` }}></div>
      <div className='bg-background w-[18vw] h-96 max-h-96 p-10 bottom-0 fixed rounded'>
        <p>Ingrédients : </p>
        <hr />
        <br />
        <p>{recipe.ingredients}</p>
      </div>
      <div className='bg-background w-[60vw] h-96 rounded p-8 mb-32 mx-auto'>
        <p>Instructions : </p>
        <hr />
        <br />
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default Recipe;
