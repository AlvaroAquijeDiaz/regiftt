import { Cog, Paintbrush, UserIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { SignOut } from "../auth/sign-out";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
} from "../shared/dropdown";
import { Spinner } from "../shared/spinner";
import { SwitcherItems } from "../theme/theme-toggle";
import { UserDropdown } from "./user-dropdown";

export const NavDropdown = () => {
  return (
    <Dropdown>
      <Suspense fallback={<Spinner />}>
        <UserDropdown />
      </Suspense>

      <DropdownContent sideOffset={10} className="w-[270px]">
        <DropdownLabel className="text-sm text-neutral-300">My Account</DropdownLabel>

        <Link href="/profile">
          <DropdownItem>
            <UserIcon size={16} />
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

        <SignOut />
      </DropdownContent>
    </Dropdown>
  );
};
