import { Root } from "@radix-ui/react-label";
import { type ReactNode } from "react";

export const AutoLabel = ({ children, htmlFor }: { children: ReactNode; htmlFor: string }) => {
  return (
    <Root className="font-semibold capitalize" htmlFor={htmlFor}>
      {children}
    </Root>
  );
};
