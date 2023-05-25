"use client";
import { type List } from "@prisma/client/edge";
import { notFound } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "~/lib/fetcher";

export const ListsGrid = () => {
  const { data, isLoading, error } = useSWR<List[], { message: string; code: string }>(
    "/api/list",
    (key: string) => fetcher(key, { isClient: true })
  );

  if (error) {
    notFound();
  }

  if (isLoading || !data) {
    return <p>Loading... TODO: Lists Skeleton</p>;
  }

  return (
    <section>
      {data.map((list) => (
        <article key={list.id}>
          <h3>{list.name}</h3>
        </article>
      ))}

      <p>{JSON.stringify(data)}</p>
    </section>
  );
};
