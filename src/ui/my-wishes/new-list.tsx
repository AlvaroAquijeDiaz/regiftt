"use client";

import { Plus } from "lucide-react";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { Button } from "../shared/button";
import { Dropdown, DropdownContent, DropdownTrigger } from "../shared/dropdown";
import { Spinner } from "../shared/spinner";

const DynamicNewWishModal = dynamic(
  () => import("./new-wish/new-wish-modal").then((mod) => mod.NewWishModal),
  {
    loading: () => <Spinner />,
  }
);

const DynamicNewListModal = dynamic(
  () => import("./new-list/new-list-modal").then((mod) => mod.NewListModal),
  {
    loading: () => <Spinner />,
  }
);

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
        <DynamicNewWishModal
          onOpenChange={handleDialogItemOpenChange}
          onSelect={handleDialogItemSelect}
        />

        <DynamicNewListModal
          onOpenChange={handleDialogItemOpenChange}
          onSelect={handleDialogItemSelect}
        />
      </DropdownContent>
    </Dropdown>
  );
};