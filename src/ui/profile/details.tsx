"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR from "swr";
import { type PostHandlerReturn } from "~/app/api/auth/user/route";
import { fetcher } from "~/lib/fetcher";
import { type User } from "~/server/db.types";
import { editProfileSchema, type EditProfileSchema } from "~/ui/profile/profile.schemas";
import { Button } from "../shared/button";

export const DetailsForm = () => {
  const { data: user, mutate } = useSWR<Partial<User>>("/api/auth/user", fetcher);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfileSchema>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name ?? "");
      setValue("username", user.username ?? "");
      setValue("bio", user.bio ?? "");
    }
  }, [setValue, user]);

  const onSubmit = async (data: EditProfileSchema) => {
    const res = await fetcher<PostHandlerReturn>("/api/auth/user", {
      body: {
        name: data.name,
        username: data.username,
        bio: data.bio,
      },
      method: "POST",
    });

    if (!res.success) {
      toast.error("Something happened 🤮");
      return;
    }

    await mutate(res);
    toast.success("Profile updated");
  };

  return (
    <form
      className="flex max-w-sm flex-col gap-4 py-8"
      onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
    >
      <span className="flex w-full items-center justify-between gap-2">
        <label htmlFor="name">Name</label>

        {!user ? (
          <span className="animate-pulse">
            <span className="inline-flex h-5 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
          </span>
        ) : (
          <input
            className="w-64 rounded px-4 py-1 focus:bg-neutral-800 focus:outline-none focus:ring focus:ring-indigo-700"
            type="text"
            {...register("name")}
          />
        )}
      </span>

      <span className="flex w-full items-center justify-between gap-2">
        <label htmlFor="username">Username</label>

        {!user ? (
          <span className="animate-pulse">
            <span className="inline-flex h-5 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
          </span>
        ) : (
          <input
            type="text"
            className="w-64 rounded px-4 py-1 focus:bg-neutral-800 focus:outline-none focus:ring focus:ring-indigo-700"
            {...register("username")}
          />
        )}
      </span>

      <span className="flex w-full items-start justify-between gap-2">
        <label htmlFor="bio">Bio</label>

        {!user ? (
          <span className="animate-pulse">
            <span className="inline-flex h-14 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
          </span>
        ) : (
          <textarea
            className="w-64 rounded px-4 py-1 focus:bg-neutral-800 focus:outline-none focus:ring focus:ring-indigo-700"
            {...register("bio")}
            rows={4}
          />
        )}
      </span>

      <span>
        <Button type="submit">Save</Button>
      </span>
    </form>
  );
};
