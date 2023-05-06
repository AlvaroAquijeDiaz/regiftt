"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "../shared/button";

export const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    const data = await signOut({
      redirect: false,
      callbackUrl: "/",
    });

    router.push(data.url);
  };

  return (
    <div>
      <Button variant="outline" onClick={() => void handleSignOut()}>
        Sign Out
      </Button>
    </div>
  );
};
