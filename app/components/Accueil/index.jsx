import Link from "next/link"
import CreateRecipe from "../CreateRecipe"
import Description from "../Description"
import DisplayRecipes from "../DisplayRecipes"
import GlobalLayout from "./layout"

const Accueil = async () => {
  const recipes = await prisma.recipes.findMany()
  return (
    <GlobalLayout>
      <div>
        <div className="text-center font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600">MY RECIPES</div>
        <div className='mt-20'>
          <Description />
        </div>
        <div className='mt-20'>
          <CreateRecipe />
        </div>
        <div className='mt-20 mb-32'>
          <DisplayRecipes recipes={recipes} />
        </div>
      </div>
    </GlobalLayout>
  )
}

export default Accueil
