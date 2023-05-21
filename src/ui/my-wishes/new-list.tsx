"use client";

import { List, Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../shared/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../shared/dropdown";
import { NewWishModal } from "./new-wish/new-wish-modal";

// TODO: Make the dropdown close when the modal opens
export const NewListOrGift = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hasOpenDialog, setHasOpenDialog] = useState(false);
  const dropdownTriggerRef = useRef(null);
  const focusRef = useRef<HTMLDivElement | null>(null);

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current;
  }

  function handleDialogItemOpenChange(open: boolean) {
    setHasOpenDialog(open);
    if (open === false) {
      setDropdownOpen(false);
    }
  }

  return (
    <Dropdown open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownTrigger asChild>
        <Button className="gap-2" ref={dropdownTriggerRef}>
          <Plus size={17} />
          Add New
        </Button>
      </DropdownTrigger>

      <DropdownContent
        hidden={hasOpenDialog}
        onCloseAutoFocus={(evt) => {
          if (focusRef.current) {
            focusRef.current.focus();
            evt.preventDefault();
          }
        }}
      >
        <NewWishModal onSelect={handleDialogItemSelect} onOpenChange={handleDialogItemOpenChange} />

        <DropdownItem>
          <List size={17} />
          New List Modal
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
