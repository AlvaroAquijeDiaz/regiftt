"use client";
import { HeartHandshake, Stars, TreePineIcon, TrendingUp, UserCircle2 } from "lucide-react";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { type segments } from ".";

export const getIcon = (
  name?: (typeof segments)[number]["name"],
  path?: (typeof segments)[number]["path"]
) => {
  if (path) {
    switch (path) {
      case "/dashboard/wishes":
        return Stars;
      case "/dashboard/lists":
        return TreePineIcon;
      case "/dashboard/giving":
        return HeartHandshake;
      case "/home":
        return TrendingUp;
      default:
        return UserCircle2;
    }
  }

  switch (name) {
    case "My Wishes":
      return Stars;
    case "My Lists":
      return TreePineIcon;
    case "Giving Away":
      return HeartHandshake;
    default:
      return TrendingUp;
  }
};

export const SidebarSegment = ({ segment }: { segment: (typeof segments)[number] }) => {
  const routes = useSelectedLayoutSegments();
  const singleRoute = useSelectedLayoutSegment();

  const isHome = segment.name === "Latest" && singleRoute === "home";

  const isCurrentSegmentSelected = isHome
    ? true
    : routes.some((r) => r === segment.path.split("/")[2])
    ? routes.length > 2
      ? false
      : true
    : false;
  const Icon = getIcon(segment.name);

  return (
    <li
      className={cn(
        "flex items-center gap-3 rounded-lg p-2 font-semibold transition-all duration-100 hover:bg-neutral-200/80 hover:text-black",
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
