import { Pen, User, Utensils } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const GlobalLayout = ({ children }) => {
  return (
    <div>
      {/* Barre de navigation commune à toutes les pages */}
      <nav>
        <div className='bg-transparent flex justify-between p-2 fixed left-0 right-0 z-50'>
          <Link href='/'>
            <Utensils size={32} className='text-emerald-600 ml-2' />
          </Link>
          <div className='flex mr-2'>
            <Link href='/createRecipes' className='mr-4'>
              <Pen size={32} className='text-emerald-600' />
            </Link>
            <Link href='/'>
              <User size={32} className='text-emerald-600' />
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenu de la page */}
      <main>
        {children}
      </main>

      {/* Pied de page */}
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Recettes Inc. Tous droits réservés.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-blue-500">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GlobalLayout;
