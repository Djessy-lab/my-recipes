'use client'
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"

export default function DeleteButton({ recipeId }) {
  const router = useRouter()

  async function handleClick() {

    try {
      await fetch(`/api/delete_recipe/${parseInt(recipeId)}`, {
        method: 'DELETE'
      })
      router.push('/')
      router.refresh()
    } catch (e) {
      console.error(e)
    }

  }

  return (
    <div>
      <div className="flex justify-center">
        <button onClick={handleClick} >
          <Trash size={32} className="text-text hover:text-red-500" />
        </button>
      </div>
    </div>
  )
}
