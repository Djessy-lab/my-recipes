'use client'
import { useRouter } from "next/navigation"

export default function DeleteButton({recipeId}){
    const router = useRouter()

    async function handleClick(){

        try {
            await fetch(`/api/delete_recipe/${parseInt(recipeId)}`, {
                method: 'DELETE'
            })
            router.push('/')
        } catch(e){
            console.error(e)
        }

    }

    return (
        <button onClick={handleClick}>Delete Recipe</button>
    )
}
