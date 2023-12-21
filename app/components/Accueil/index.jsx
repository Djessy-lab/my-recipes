import { SessionProvider } from "next-auth/react"
import AuthComponent from "../AuthComponent"
import Description from "../Description"
import DisplayRecipes from "../DisplayRecipes"
import GlobalLayout from "./layout"

const Accueil = ({AuthComponent, pageProps}) => {
  return (
    <GlobalLayout>
      {/* <SessionProvider session={pageProps.session}>
        <AuthComponent {...pageProps}/> */}
        <div>
          <div className="text-center font-extrabold text-transparent lg:text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-600 p-10">MY RECIPES</div>
          <div className='mt-20'>
            <Description />
          </div>
          <div className='mt-20 mb-32'>
            <DisplayRecipes />
          </div>
        </div>
      {/* </SessionProvider> */}
    </GlobalLayout>
  )
}

export default Accueil
