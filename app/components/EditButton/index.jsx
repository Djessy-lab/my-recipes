'use client'
import { Pen } from "lucide-react"
import Link from "next/link"

export default function EditButton({ recipeId }) {
  return (
    <div>
      <div className="flex justify-center">
        <Link href={`/edit/${recipeId}`}>
          <Pen size={32} color='green' />
        </Link>
      </div>
    </div>
  )
}
