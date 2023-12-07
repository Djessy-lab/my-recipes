import React from 'react';

const GlobalLayout = ({ children }) => {
  return (
    <div>
      {/* Barre de navigation commune à toutes les pages */}
      <nav>
        {/* Vos éléments de navigation */}
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
