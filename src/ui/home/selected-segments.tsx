"use client";

import { ChevronRight, TrendingUp } from "lucide-react";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { Button } from "../shared/button";

export const SelectedSegments = () => {
  const route = useSelectedLayoutSegments();

  return (
    <Button variant="ghost" className="gap-4 font-semibold capitalize hover:bg-transparent">
      <TrendingUp size={20} />

      <p className="flex items-center gap-2">
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
    </Button>
  );
};
