import { Plus, Utensils } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { authConfig } from '../../../pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import logo from "../../../public/icon.png";

const GlobalLayout = async ({ children }) => {
  const session = await getServerSession(authConfig);

  return (
    <div>
      <nav>
        <div className='bg-transparent flex justify-between p-8 z-50'>
          <Link href='/'>
            <Image src={logo} alt='logo' width={60} height={60} />
          </Link>
          <div className='flex mr-2'>
            {session ? (
              <>
                <Link href='/createRecipes' className='mr-8 pt-2'>
                  <Plus size={32} className='text-text hover:text-accent' />
                </Link>
                <Link href="/userProfile" className='mr-8'>
                  <div className='font-semibold mt-1 rounded shadow bg-secondary hover:bg-primary text-text hover:text-secondary p-2'>{session.user.name}</div>
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
      <footer className="bg-primary py-4">
        <div className="container mx-auto">
          <div className="lg:flex justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Recettes Inc. Tous droits réservés.</p>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-secondary hover:text-accent text-xs lg:text-sm ml-4">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent text-xs lg:text-sm">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="text-secondary hover:text-accent text-xs lg:text-sm">
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
