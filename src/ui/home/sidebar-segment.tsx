"use client";
import { HeartHandshake, LayoutDashboard, Stars, TreePineIcon } from "lucide-react";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { type segments } from "./sidebar";

const getIcon = (name: (typeof segments)[number]["name"]) => {
  switch (name) {
    case "Wishes":
      return Stars;
    case "Lists":
      return TreePineIcon;
    case "Giving Away":
      return HeartHandshake;
    default:
      return LayoutDashboard;
  }
};

export const SidebarSegment = ({ segment }: { segment: (typeof segments)[number] }) => {
  const routes = useSelectedLayoutSegments();
  const singleRoute = useSelectedLayoutSegment();

  const isHome = segment.name === "Home" && singleRoute === "home";

  const isCurrentSegmentSelected = isHome
    ? true
    : routes.some((r) => r === segment.path.split("/")[2]);

  const Icon = getIcon(segment.name);

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-md p-2 font-semibold transition-all duration-100 hover:bg-neutral-200/80 hover:text-black",
        isCurrentSegmentSelected
          ? "bg-neutral-200/80 text-black"
          : "bg-transparent text-neutral-600"
      )}
    >
      <Icon
        size={17}
        className={cn(isCurrentSegmentSelected ? "fill-indigo-500 text-indigo-500" : "fill-none")}
      />

      <span>{segment.name}</span>
    </li>
  );
};
