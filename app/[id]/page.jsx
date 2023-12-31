import Link from 'next/link';
import prisma from '../lib/prisma';
import DeleteButton from '../components/DeleteButton';
import EditButton from '../components/EditButton';
import { authConfig } from '../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import logo from '../../public/icon.png';

const Recipe = async ({ params }) => {
  const session = await getServerSession(authConfig);
  const id = params.id;
  const recipe = await prisma.recipes.findUnique({
    where: { id: Number(id) }, include: { user: true }
  })

  if (!recipe) {
    return <div>Chargement en cours...</div>;
  }

  const ingredients = recipe.ingredients.split(',');

  return (
    <div>
      <div className='flex justify-between bg-transparent p-4 sticky top-0'>
        <Link href='/'>
          <Image src={logo} alt='logo' width={60} height={60} />
        </Link>
        {session?.user?.email === recipe.user.email ? (
        <div className='flex gap-4'>
          <DeleteButton recipeId={recipe.id} />
          <EditButton recipeId={recipe.id} />
        </div>
          ) : (
            <div></div>
          )}
      </div>
      <h1 className='font-extrabold text-transparent lg:text-6xl sm:text-xl bg-clip-text bg-gradient-to-r from-primary to-accent text-center font-serif mt-10 mb-1'>{recipe.title}</h1>
      <div className='mx-auto mb-10 h-96 bg-contain bg-no-repeat bg-center' style={{ backgroundImage: `url(${recipe.image})` }}></div>
      <div className='bg-secondary lg:w-[18vw] h-96 overflow-scroll p-10 bottom-0 lg:fixed rounded'>
        <div>
          <p className='text-text'>Ingrédients : </p>
          <hr />
        </div>
        <br />
        <ul className='list-disc'>
          {ingredients.map((ingredient) => (
            <li className='text-text' key={ingredient}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className='bg-secondary lg:w-[60vw] h-96 rounded p-8 mb-32 mx-auto mt-10'>
        <p className='text-text'>Instructions : </p>
        <hr />
        <br />
        <p className='text-text'>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default Recipe;
