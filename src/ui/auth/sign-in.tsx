"use client";

import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <div>
      <button
        onClick={() =>
          void signIn("discord", {
            callbackUrl: "/home",
          })
        }
      >
        SignIn
      </button>
    </div>
  );
};
