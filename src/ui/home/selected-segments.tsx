"use client";

import { ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { cn } from "~/lib/cn";
import { Button } from "../shared/button";

export const SelectedSegments = () => {
  const route = useSelectedLayoutSegments();

  return (
    <Link href="/home">
      <Button variant="ghost" className="gap-4 font-semibold capitalize hover:bg-transparent">
        <TrendingUp size={20} />

        <p className="flex items-center gap-2">
          {route.join("").includes("home")
            ? "Latest"
            : route.map((segment, idx) => (
                <span key={segment} className={cn("flex items-center", idx !== 0 && "gap-2")}>
                  {idx !== 0 && <ChevronRight size={15} />}

                  {segment}
                </span>
              ))}
        </p>
      </Button>
    </Link>
  );
};
