import { type DropdownMenuItemProps, type DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import { List } from "lucide-react";
import { forwardRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "../../shared/dialog";
import { DropdownItem } from "../../shared/dropdown";
import { NewListForm } from "./form";

export const NewListModal = forwardRef<
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
          <List size={17} />
          List
        </DropdownItem>
      </DialogTrigger>

      <DialogContent className="shadow-xl dark:shadow-xl sm:max-w-xl">
        <DialogTitle className="text-2xl">Add a new Wish List!</DialogTitle>

        <NewListForm onClose={menuOpenChange} />
      </DialogContent>
    </Dialog>
  );
});

NewListModal.displayName = "NewListModal";
