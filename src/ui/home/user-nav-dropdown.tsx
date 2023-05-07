import { Cog, LayoutDashboard, Paintbrush, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
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

export const UserNavDropdown = async () => {
  const session = await getServerSession();

  return (
    <Dropdown>
      <DropdownTrigger asChild className="cursor-pointer select-none hover:opacity-75">
        {session?.user.image ? (
          <Image
            src={session?.user.image}
            alt={session?.user.name || "User Profile Picture"}
            className="rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <LayoutDashboard size={25} />
        )}
      </DropdownTrigger>

      <DropdownContent>
        <DropdownLabel>My Account</DropdownLabel>

        <DropdownItem>
          <User size={16} />
          Profile
        </DropdownItem>

        <DropdownItem>
          <Cog size={16} />
          Settings
        </DropdownItem>

        <DropdownSub>
          <DropdownSubTrigger>
            <Paintbrush size={16} className="mr-2" />
            Theme
          </DropdownSubTrigger>

          <DropdownSubContent sideOffset={5}>
            <SwitcherItems />
          </DropdownSubContent>
        </DropdownSub>
      </DropdownContent>
    </Dropdown>
  );
};
