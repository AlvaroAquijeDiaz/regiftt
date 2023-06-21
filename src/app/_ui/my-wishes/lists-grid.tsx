"use client";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";
import { ListProductCard, type ListWithExtraParams } from "../home/list-product-card";
import Loader from "./[wishID]/loader";

export const ListsGrid = () => {
  const { data, isLoading, error } = useSWR<
    ListWithExtraParams[],
    { message: string; code: string }
  >("/api/list", (key: string) => fetcher(key, { isClient: true }));

  if (error) {
    notFound();
  }

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <section className="grid grid-cols-1 gap-8">
      {data.map((list) => (
        <ListProductCard key={list.id} list={list} />
      ))}
    </section>
  );
};
