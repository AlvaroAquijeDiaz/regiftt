import { Suspense } from "react";
import { Spinner } from "../shared/spinner";
import { SelectedSegments } from "./selected-segments";

export const Nav = () => {
  return (
    <nav className="sticky left-0 top-0 z-10 w-full border-b border-border bg-background/40 px-4 py-1.5 backdrop-blur backdrop-filter">
      <ul className="flex justify-between">
        <span>
          <li>
            <Suspense fallback={<Spinner />}>
              <SelectedSegments />
            </Suspense>
          </li>
        </span>
      </ul>
    </nav>
  );
};
