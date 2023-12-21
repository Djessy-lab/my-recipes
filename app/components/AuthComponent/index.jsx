'use client'

import { useSession, signIn, signOut } from 'next-auth/react';

function AuthComponent() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Connecté en tant que {session.user.email}
        <button onClick={() => signOut()}>Se déconnecter</button>
      </div>
    );
  } else {
    return (
      <div>
        Non connecté
        <button onClick={() => signIn()}>Se connecter</button>
      </div>
    );
  }
}

export default AuthComponent;
