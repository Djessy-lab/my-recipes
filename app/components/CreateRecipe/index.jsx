'use client'

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreateRecipe = () => {
  const router = useRouter();
  const [recipe, setRecipe] = useState({
    title: '',
    instructions: '',
    image: '',
    ingredients: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/post_recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      });
      if (response.ok) {
        const newRecipe = await response.json();
        console.log('Nouvelle recette créée :', newRecipe);
        router.refresh();
      } else {
        console.error('Erreur lors de la création de la recette');
      }
    } catch (error) {
      console.error('Erreur lors de la requête :', error);
    }
    setRecipe({
      title: '',
      instructions: '',
      image: '',
      ingredients: '',
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-200 rounded-lg p-8 w-[50vw]">
        <h1 className="text-2xl font-semibold bg-gray-200 text-center mb-6">Nouvelle recette</h1>
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
            className="block w-full bg-emerald-500 text-white rounded py-2 px-4 hover:bg-emerald-600 transition duration-300"
          >
            Créer
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;


//unsplash random : https://source.unsplash.com/random/?food
