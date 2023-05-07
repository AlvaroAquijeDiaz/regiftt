"use client";

import { useTheme } from "next-themes";

import { Laptop } from "lucide-react";
import { Button } from "~/ui/shared/button";
import { DropdownItem } from "../shared/dropdown";
import { Icons } from "./icons";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export const SwitcherItems = () => {
  const { setTheme } = useTheme();

  return (
    <>
      <DropdownItem onClick={() => setTheme("light")} className="flex items-center gap-2">
        <Icons.sun size={16} />
        <span>Light</span>
      </DropdownItem>

      <DropdownItem onClick={() => setTheme("dark")} className="flex items-center gap-2">
        <Icons.moon size={16} />
        <span>Dark</span>
      </DropdownItem>

      <DropdownItem onClick={() => setTheme("system")} className="flex items-center gap-2">
        <Laptop size={16} />
        <span>System</span>
      </DropdownItem>
    </>
  );
};
