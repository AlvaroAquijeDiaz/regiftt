"use client";

import dynamic from "next/dynamic";
import { Spinner } from "../shared/spinner";

const DynamicNewWishModal = dynamic(
  () => import("./new-wish/new-wish-modal").then((mod) => mod.NewWishModal),
  {
    loading: () => <Spinner />,
  }
);

const DynamicNewListModal = dynamic(
  () => import("./new-list/new-list-modal").then((mod) => mod.NewListModal),
  {
    loading: () => <Spinner />,
  }
);

export const NewListOrGift = () => {
  return (
    <div className="flex items-center gap-2 px-4">
      <DynamicNewWishModal />

      <DynamicNewListModal />
    </div>
  );
};
