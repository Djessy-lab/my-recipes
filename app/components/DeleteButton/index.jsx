'use client'
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
        <button onClick={handleClick} className="bg-red-400 text-white p-4 rounded">Delete Recipe</button>
      </div>
    </div>
  )
}
