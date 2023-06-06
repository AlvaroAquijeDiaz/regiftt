"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../shared/button";

export const Return = () => {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="link"
      className="mb-4 px-0 text-neutral-500"
      onClick={router.back.bind(router)}
    >
      <ChevronLeft size={15} />
      Go Back
    </Button>
  );
};
