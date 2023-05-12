"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../shared/button";

export const Return = () => {
  const router = useRouter();

  return (
    <Button
      size="sm"
      variant="link"
      className="px-0 text-neutral-500"
      onClick={router.back.bind(router)}
    >
      <ArrowLeft size={15} />
      Go Back
    </Button>
  );
};
