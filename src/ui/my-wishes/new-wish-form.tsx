"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type NewWishReturnHandler } from "~/app/api/wish/route";
import { fetcher } from "~/lib/fetcher";
import { NewWishSchema } from "./my-wishes.schemas";

export const NewWishForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewWishSchema>({
    resolver: zodResolver(NewWishSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });

  const onSubmit = async (data: NewWishSchema) => {
    const response = await fetcher<NewWishReturnHandler>("/api/wish", {
      method: "POST",
      body: data,
    });

    console.log(response);
  };

  console.log({ errors });

  return (
    <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}>
      <input type="text" {...register("name")} />
      <input
        type="text"
        {...register("price", {
          valueAsNumber: true,
        })}
      />
      <input type="text" {...register("url")} />
      <input type="text" {...register("description")} />
      <input type="submit" />
    </form>
  );
};
