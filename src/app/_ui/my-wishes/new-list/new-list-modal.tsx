import { List } from "lucide-react";
import { useState } from "react";
import { Button } from "../../shared/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../shared/dialog";
import { NewListForm } from "./form";

export const NewListModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <List size={17} />
          New List
        </Button>
      </DialogTrigger>

      <DialogContent className="shadow-xl dark:shadow-xl sm:max-w-xl">
        <DialogTitle className="text-2xl">New Wish List</DialogTitle>

        <NewListForm onClose={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
