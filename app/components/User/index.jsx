import { getServerSession } from "next-auth"
import { authConfig } from "../../../pages/api/auth/[...nextauth]"
import Link from "next/link"
import { Utensils } from "lucide-react"


export const User = async () => {
  const session = await getServerSession(authConfig)

  if(!session?.user){
    return <p>No user</p>
  }
  return(
    <div>
      <Link href='/'>
        <Utensils size={32} className='text-emerald-600 ml-2' />
      </Link>
      <h1>{session.user.name}</h1>
      <img src={session.user.image ?? ""} alt="" />
    </div>
  )
}
