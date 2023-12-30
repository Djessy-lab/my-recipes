import { Plus, Utensils } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

const GlobalLayout = async ({ children }) => {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <nav>
        <div className='bg-transparent flex justify-between p-2 fixed left-0 right-0 z-50'>
          <Link href='/'>
            <Utensils size={32} className='text-emerald-600 ml-2' />
          </Link>
          <div className='flex mr-2'>
            {session ? (
              <>
                <Link href='/createRecipes' className='mr-8 pt-2'>
                  <Plus size={32} className='text-emerald-600' />
                </Link>
                <Link href="/userProfile" className='mr-8'>
                  <div className='font-semibold mt-1 rounded shadow bg-zinc-100 hover:bg-emerald-200 p-2'>{session.user.name}</div>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </nav>
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
