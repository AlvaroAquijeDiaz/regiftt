import { AxeIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../shared/button";
import { UserNavDropdown } from "./user-nav-dropdown";

export const Nav = () => {
  return (
    <nav className="border-b border-border px-4 py-4 md:px-14">
      <ul className="flex justify-between">
        <span>
          <li>
            <Link href="/home">
              <Button variant="ghost" className="px-0 hover:bg-transparent">
                <AxeIcon />
              </Button>
            </Link>
          </li>
        </span>

        <span className="flex items-center gap-2">
          <li>
            <Link href="/home">
              <Button variant="ghost">My Wishes</Button>
            </Link>
          </li>

          <li>
            {/* @ts-expect-error Server Components */}
            <UserNavDropdown />
          </li>
        </span>
      </ul>
    </nav>
  );
};
