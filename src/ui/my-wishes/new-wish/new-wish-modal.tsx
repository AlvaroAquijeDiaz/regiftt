"use client";

import { type DropdownMenuItemProps, type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Gift } from "lucide-react";
import { forwardRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/ui/shared/dialog";
import { DropdownItem } from "~/ui/shared/dropdown";
import { NewWishForm } from "./form";

export const NewWishModal = forwardRef<
  HTMLDivElement,
  DropdownMenuItemProps &
    Omit<DropdownMenuProps, "onOpenChange" | "onSelect"> & {
      onOpenChange?: (open: boolean) => void;
      onSelect?: (evt: React.SyntheticEvent<HTMLButtonElement>) => void;
    }
>((props, forwardRef) => {
  const { onSelect, onOpenChange: menuOpenChange, open: dialogOpen, ...itemProps } = props;

  return (
    <Dialog onOpenChange={menuOpenChange} open={dialogOpen}>
      <DialogTrigger asChild>
        <DropdownItem
          onSelect={(evt) => {
            if (onSelect) {
              onSelect(evt);
            }
            evt.preventDefault();
          }}
          ref={forwardRef}
          {...itemProps}
        >
          <Gift size={17} />
          New Wish
        </DropdownItem>
      </DialogTrigger>

      <DialogContent className="shadow-xl dark:shadow-xl">
        <DialogTitle className="text-2xl">What would you like?</DialogTitle>

        <NewWishForm onClose={() => void 0} />
      </DialogContent>
    </Dialog>
  );
});

NewWishModal.displayName = "NewWishModal";
