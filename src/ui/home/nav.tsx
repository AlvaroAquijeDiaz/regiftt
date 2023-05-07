import { AxeIcon, User } from "lucide-react";
import Link from "next/link";
import { Button } from "../shared/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../shared/dialog";

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
            <Link href="/my-wishes">
              <Button variant="ghost">My Wishes</Button>
            </Link>
          </li>

          <li>
            Delete account
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">Delete account</Button>
              </DialogTrigger>

              <DialogContent>
                <div className="flex flex-col gap-4">
                  <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                  <div className="flex gap-4">
                    <Button variant="ghost">Yes</Button>
                    <Button variant="ghost">No</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </li>

          <li>
            <Button variant="ghost">
              <User />
            </Button>
          </li>
        </span>
      </ul>
    </nav>
  );
};
