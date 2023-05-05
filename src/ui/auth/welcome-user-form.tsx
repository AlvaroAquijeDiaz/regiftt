"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { newUserSchema, type NewUserSchema } from "~/server/schemas";

export const NewUserForm = () => {
  const session = useSession();

  const { handleSubmit, register, formState } = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = async (data: NewUserSchema) => {
    console.log(data);

    await fetch("/api/auth/new-user", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  console.log(formState.errors);

  return (
    <div>
      <h2>New User Form</h2>

      <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}>
        {session.data && (
          <input
            type="text"
            hidden
            {...register("userId", { value: session.data.user.id })}
          />
        )}

        <label htmlFor="username">Username</label>
        <input className="bg-neutral-700" {...register("username")} />

        <input type="submit" />
      </form>
    </div>
  );
};
