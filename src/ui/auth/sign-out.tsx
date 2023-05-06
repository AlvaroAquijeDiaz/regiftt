'use client';

import { signOut } from 'next-auth/react';

export const SignOut = () => {
  const handleSignOut = () => void signOut();

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};
