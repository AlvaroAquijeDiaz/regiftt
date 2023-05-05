"use client";

import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <div>
      <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() =>
          signIn(undefined, {
            callbackUrl: "/",
          })
        }
      >
        SignIn
      </button>
    </div>
  );
};
