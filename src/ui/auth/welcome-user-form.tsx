"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { fetcher } from "~/lib/fetcher";
import { newUserSchema, type NewUserSchema } from "~/ui/profile/profile.schemas";
import { Input } from "../shared/input";

export const WelcomeUserForm = () => {
  const session = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewUserSchema>({
    resolver: zodResolver(newUserSchema),
  });

  const onSubmit = async (data: NewUserSchema) => {
    try {
      await fetcher("/api/auth/new-user", {
        method: "POST",
        body: data,
      });

      toast.success("Username Assigned");

      router.push("/home");
    } catch (error) {
      toast.error("Something went wrong. Check the console.");
    }
  };

  return (
    <div>
      <h2>New User Form</h2>

      <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)} className="flex flex-col gap-2">
        {session.data && (
          <input type="text" hidden {...register("userId", { value: session.data.user.id })} />
        )}
        <Input<NewUserSchema>
          register={register}
          displayName="username"
          placeholder="Username"
          errors={errors}
        />

        <input type="submit" />
      </form>
    </div>
  );
};
