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
import { Input } from "../shared/input";
import { Spinner } from "../shared/spinner";

export const DetailsForm = () => {
  const { data: user, mutate } = useSWR<Partial<User>>("/api/auth/user", fetcher);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
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
      className="flex max-w-sm flex-col gap-6 py-8"
      onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
    >
      {!user ? (
        <span className="animate-pulse">
          <span className="inline-flex h-5 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
        </span>
      ) : (
        <Input<EditProfileSchema>
          displayName="name"
          errors={errors}
          register={register}
          inputClassName="flex-row items-center justify-between"
        />
      )}

      {!user ? (
        <span className="animate-pulse">
          <span className="inline-flex h-5 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
        </span>
      ) : (
        <Input<EditProfileSchema>
          displayName="username"
          errors={errors}
          register={register}
          inputClassName="flex-row items-center justify-between"
        />
      )}

      {!user ? (
        <span className="animate-pulse">
          <span className="inline-flex h-14 w-40 rounded-lg border bg-gray-200 dark:bg-neutral-600" />
        </span>
      ) : (
        <Input<EditProfileSchema>
          displayName="bio"
          errors={errors}
          register={register}
          inputClassName="flex-row justify-between"
          as="textarea"
          rows={2}
        />
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-4">
        {isSubmitting && <Spinner />}
        {!isSubmitting && "Save"}
      </Button>
    </form>
  );
};
