import Description from "../Description"
import DisplayRecipes from "../DisplayRecipes"
import GlobalLayout from "./layout"

const Accueil = () => {
  return (
    <GlobalLayout>
        <div>
          <div className="text-center font-extrabold text-transparent lg:text-8xl bg-clip-text bg-gradient-to-r from-primary to-accent p-10">MY RECIPES</div>
          <div className='mt-28'>
            <Description />
          </div>
          <div className='mt-20 mb-32'>
            <DisplayRecipes />
          </div>
        </div>
    </GlobalLayout>
  )
}

export default Accueil
