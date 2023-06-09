"use client";

import { ChevronDown, LayoutDashboard } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { type User } from "~/server/db.types";
import { DropdownTrigger } from "../shared/dropdown";
import { Spinner } from "../shared/spinner";

export const UserDropdown = () => {
  const user = useSWR<User>("/api/auth/user", fetcher);

  if (user.isLoading) {
    return (
      <DropdownTrigger className="flex w-full items-center justify-center py-0.5">
        <Spinner />
      </DropdownTrigger>
    );
  }

  if (!user.data) {
    return null;
  }

  return (
    <DropdownTrigger asChild className="w-full cursor-pointer select-none py-1 text-sm">
      <p className="flex items-center justify-between">
        {user.data.image ? (
          <Image
            src={user.data.image}
            alt={user.data.name || "User Profile Picture"}
            className="rounded-full"
            width={26}
            height={26}
            priority={true}
          />
        ) : (
          <LayoutDashboard size={25} />
        )}

        <span className="text-sm font-bold">{user.data.username ?? "Regiftt"}</span>

        <ChevronDown size={15} />
      </p>
    </DropdownTrigger>
  );
};
