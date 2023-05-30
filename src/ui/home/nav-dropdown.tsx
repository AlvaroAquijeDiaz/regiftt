import { ChevronDown, Cog, LayoutDashboard, Paintbrush, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "~/server/auth";
import { SignOut } from "../auth/sign-out";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "../shared/dropdown";
import { SwitcherItems } from "../theme/theme-toggle";

export const NavDropdown = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Dropdown>
      <DropdownTrigger asChild className="w-full cursor-pointer select-none text-sm">
        <p className="flex items-center justify-between">
          {session?.user.image ? (
            <Image
              src={session?.user.image}
              alt={session?.user.name || "User Profile Picture"}
              className="rounded-full"
              width={30}
              height={30}
              priority={true}
            />
          ) : (
            <LayoutDashboard size={25} />
          )}

          <span className="text-sm font-bold">{session?.user.username ?? "Regiftt"}</span>

          <ChevronDown size={15} />
        </p>
      </DropdownTrigger>

      <DropdownContent sideOffset={10} className="w-[270px]">
        <DropdownLabel className="text-sm text-neutral-300">My Account</DropdownLabel>

        <Link href="/profile">
          <DropdownItem>
            <User size={16} />
            Profile
          </DropdownItem>
        </Link>

        <DropdownItem>
          <Cog size={16} />
          Settings
        </DropdownItem>

        <DropdownSub>
          <DropdownSubTrigger>
            <Paintbrush size={16} className="mr-2" />
            Theme
          </DropdownSubTrigger>

          <DropdownSubContent sideOffset={10}>
            <SwitcherItems />
          </DropdownSubContent>
        </DropdownSub>

        <DropdownItem>
          <SignOut />
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
