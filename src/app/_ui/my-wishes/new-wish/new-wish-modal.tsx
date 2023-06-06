import { type DropdownMenuItemProps, type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { Gift } from "lucide-react";
import { forwardRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "~/app/_ui/shared/dialog";
import { DropdownItem } from "~/app/_ui/shared/dropdown";
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

  const handleIsBeingSelected = (evt: Event) => {
    if (onSelect) {
      onSelect(evt);
    }
    evt.preventDefault();
  };

  return (
    <Dialog onOpenChange={menuOpenChange} open={dialogOpen}>
      <DialogTrigger asChild>
        <DropdownItem {...itemProps} onSelect={handleIsBeingSelected} ref={forwardRef}>
          <Gift size={17} />
          Wish
        </DropdownItem>
      </DialogTrigger>

      <DialogContent className="shadow-xl dark:shadow-xl">
        <DialogTitle className="text-2xl">What would you like?</DialogTitle>

        <NewWishForm onClose={menuOpenChange} />
      </DialogContent>
    </Dialog>
  );
});

NewWishModal.displayName = "NewWishModal";
