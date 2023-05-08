"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { fetcher } from "~/lib/fetcher";
import { Button } from "../shared/button";
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

  const onSubmit = (data: NewWishSchema) => {
    void toast.promise(
      fetcher(`/api/wish`, {
        method: "POST",
        body: data,
        isClient: true,
      }),
      {
        loading: "Creating wish...",
        success: "Wish created!",
        error: "Error creating wish",
      }
    );
  };

  return (
    <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)} className="my-4 flex-col gap-4">
      <section className="flex items-start gap-2">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register("name")} />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            {...register("price", {
              valueAsNumber: true,
            })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}
        </div>

        <div>
          <label htmlFor="url">URL</label>
          <input type="text" {...register("url")} />
          {errors.url && <p className="text-red-500">{errors.url.message}</p>}
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input type="text" {...register("description")} />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
      </section>

      <Button type="submit" className="mt-3 block">
        Add
      </Button>
    </form>
  );
};
