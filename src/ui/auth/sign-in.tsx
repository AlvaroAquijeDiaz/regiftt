'use client';

import { signIn } from 'next-auth/react';

export const SignIn = () => {
  const discordSignIn = () => {
    void signIn('discord', {
      callbackUrl: '/home',
    });
  };

  return (
    <div>
      <button onClick={discordSignIn}>SignIn</button>
    </div>
  );
};
