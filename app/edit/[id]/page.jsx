'use client'

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

const EditRecipe = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    title: '',
    instructions: '',
    image: '',
    ingredients: '',
  });

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/edit_recipe/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...recipe }),
      });
      if (response.ok) {
        const updatedRecipe = await response.json();
        console.log('Recipe updated:', updatedRecipe);
        router.push(`/${id}`);
        router.refresh()
      } else {
        console.error('Error updating recipe');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 rounded-lg p-8 w-[50vw]">
        <h1 className="text-2xl font-semibold bg-gray-200 text-center mb-6">Modifier la recette</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Titre"
            name="title"
            value={recipe.title}
            onChange={handleChange}
            className="block w-full rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <textarea
            placeholder="Ingrédients"
            name="ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            className="block w-full rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
          <textarea
            placeholder="Instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="block w-full rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          ></textarea>
          <input
            type="text"
            placeholder="Image"
            name="image"
            value={recipe.image}
            onChange={handleChange}
            className="block w-full rounded border-gray-300 px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="block w-full bg-secondary text-white rounded py-2 px-4 hover:bg-primary transition duration-300"
          >
            Modifier
          </button>
          <Link href={`/${id}`}>
            <div
              className="text-center mt-4 block w-full bg-secondary text-white rounded py-2 px-4 hover:bg-primary transition duration-300"
            >
              Retour
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;


//unsplash random : https://source.unsplash.com/random/?food
