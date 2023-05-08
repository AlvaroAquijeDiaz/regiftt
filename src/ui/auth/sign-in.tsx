"use client";

import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export const SignIn = () => {
  const discordSignIn = () => {
    void signIn("discord", {
      callbackUrl: "/home",
    });
  };

  const makeToast = () => toast.success("Hello");

  return (
    <div>
      <button onClick={discordSignIn}>SignIn</button>
      <button onClick={makeToast}>Toast</button>
    </div>
  );
};
