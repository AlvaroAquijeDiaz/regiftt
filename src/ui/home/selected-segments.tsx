"use client";

import { ChevronRight } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { type segments } from "./sidebar";
import { getIcon } from "./sidebar/sidebar-segment";

export const SelectedSegments = () => {
  const route = useSelectedLayoutSegments();

  const Icon = getIcon(undefined, ("/" + route.join("/")) as (typeof segments)[number]["path"]);

  return (
    <li>
      <div className="flex select-none items-center gap-3 px-4 py-2 text-sm font-semibold hover:bg-transparent">
        <Icon size={20} className="text-indigo-500" />

        <p className="flex items-center gap-2 capitalize">
          {route.join("").includes("home")
            ? "Latest"
            : route.map((segment, idx) => (
                <span key={segment} className={cn("flex items-center", idx !== 0 && "gap-2")}>
                  {idx !== 0 && <ChevronRight size={15} />}

                  {/**
                   * This is a hack to remove the last generated ID from the route
                   */}
                  {segment.includes("-") ? segment.split("-").slice(0, -1).join(" ") : segment}
                </span>
              ))}
        </p>
      </div>
    </li>
  );
};
