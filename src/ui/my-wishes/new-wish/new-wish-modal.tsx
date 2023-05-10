"use client";
import { useState } from "react";
import { Button } from "~/ui/shared/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/ui/shared/dialog";
import { NewWishForm } from "./form";

export const NewWishModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="inline-flex w-max">Add New</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle className="text-2xl">What would you like?</DialogTitle>

        <NewWishForm onClose={setOpen} />
      </DialogContent>
    </Dialog>
  );
};
