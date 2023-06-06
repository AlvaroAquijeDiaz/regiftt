import { Gift } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/app/_ui/shared/dialog";
import { Button } from "../../shared/button";
import { NewWishForm } from "./form";

export const NewWishModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Gift size={17} />
          New Wish
        </Button>
      </DialogTrigger>

      <DialogContent className="shadow-xl dark:shadow-xl">
        <DialogTitle className="text-2xl">What would you like?</DialogTitle>

        <NewWishForm onClose={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
