"use client";

import { SessionProvider } from "next-auth/react";
import { type FunctionComponent, type ReactNode } from "react";

export const NextAuthProvider: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
