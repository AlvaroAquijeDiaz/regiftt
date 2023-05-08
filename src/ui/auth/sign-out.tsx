"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

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
    <span onClick={() => void handleSignOut()} className="flex items-center gap-2">
      <LogOut size={16} />
      Sign Out
    </span>
  );
};
