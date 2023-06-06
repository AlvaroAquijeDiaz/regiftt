"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DropdownItem } from "../shared/dropdown";

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
    <DropdownItem asChild>
      <span
        onClick={() => void handleSignOut()}
        className="flex items-center gap-2 rounded p-1.5 text-sm hover:bg-neutral-600"
      >
        <LogOut size={16} />
        Sign Out
      </span>
    </DropdownItem>
  );
};
