import { getServerSession } from "next-auth"
import { authConfig } from "../../../pages/api/auth/[...nextauth]"
import Link from "next/link"
import { Utensils } from "lucide-react"
import logo from '../../../public/icon.png';
import Image from "next/image";


export const User = async () => {
  const session = await getServerSession(authConfig)

  if (!session?.user) {
    return <p>No user</p>
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  const recipes = await prisma.recipes.findMany({
    where: {
      user: {
        email: session.user.email
      },
    }
  })

  const recipeCount = recipes.length;
  const gridClass = recipeCount === 1 ? 'lg:grid-cols-1' : recipeCount === 2 ? 'lg:grid-cols-2' : 'lg:grid-cols-3';


  return (
    <div>

      <div className="fixed top-0 right-0">
        <Link href='/'>
          <Image src={logo} alt='logo' width={60} height={60} />
        </Link>
      </div>

      <div className="mt-10 ml-10 lg:flex ">
        <img src={session.user.image ?? ""} alt="" width={200} height={200} className="rounded-full mr-10" />
        <div className="p-4">
          <h1 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-4xl mb-4">{session.user.name}</h1>
          <small className="font-semibold text-text">Nombre de recettes : {recipes.length}</small>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-4xl mt-10 mb-10 text-text">Mes recettes</h1>
        {recipes.length === 0 ? (
          <div className="flex flex-col items-center">
            <Utensils size={64} className='text-emerald-600' />
            <p className="text-2xl font-semibold">Aucune recette</p>
          </div>
        ) : (
          <div>
            <div className={`grid ${gridClass} sm:grid-cols-1 gap-8 p-8 justify-center mb-10`}>
              {recipes.map((recipe) => (
                <Link key={recipe.id} href={`/${recipe.id}`}>
                  <div
                    key={recipe.id}
                    className='shadow-md hover:shadow-lg p-10 rounded flex flex-col items-center min-w-xl max-h-96 bg-center bg-cover bg-no-repeat relative'
                    style={{
                      backgroundImage: `url(${recipe.image})`,
                    }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-black hover:opacity-30 to-black opacity-50 rounded transition-all"></div>
                    <h2 className='mb-4 text-xl text-white font-bold z-10 text-center'>{recipe.title}</h2>
                    <small className='font-bold text-neutral-100 z-50 text-center'>{user.name}</small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
