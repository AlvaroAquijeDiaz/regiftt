"use client";

import { ArrowLeft, ChevronRight } from "lucide-react";
import { useRouter, useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { Button } from "../shared/button";
import { type segments } from "./sidebar";
import { getIcon } from "./sidebar/sidebar-segment";

export const SelectedSegments = () => {
  const route = useSelectedLayoutSegments();
  const path = useSelectedLayoutSegment();
  const r = useRouter();

  const Icon = getIcon(undefined, ("/" + route.join("/")) as (typeof segments)[number]["path"]);

  return (
    <li className="flex items-center gap-1">
      {path === "home" ? null : (
        <Button onClick={r.back.bind(r)} size="sm" variant="ghost" className="h-7 w-7 px-1">
          <ArrowLeft size={20} className="text-indigo-700" />
        </Button>
      )}

      <div className="flex select-none items-center gap-3 py-2 text-sm font-semibold hover:bg-transparent">
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
