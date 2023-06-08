import { Suspense } from "react";
import { Spinner } from "../shared/spinner";
import { SelectedSegments } from "./selected-segments";
import { DisplaySheet } from "./sidebar/display-sheet";

export const Nav = () => {
  return (
    <nav className="sticky left-0 top-0 z-10 w-full border-b border-border bg-white/50 px-4 py-2 backdrop-blur backdrop-filter dark:bg-muted/70">
      <ul className="flex items-center gap-4">
        <li className="lg:hidden">
          <Suspense fallback={<Spinner />}>
            <DisplaySheet />
          </Suspense>
        </li>

        <Suspense fallback={<Spinner />}>
          <SelectedSegments />
        </Suspense>
      </ul>
    </nav>
  );
};
