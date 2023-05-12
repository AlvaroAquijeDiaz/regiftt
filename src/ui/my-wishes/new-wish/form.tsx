"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { fetcher } from "~/lib/fetcher";
import { Spinner } from "~/ui/shared/spinner";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { NewWishSchema } from "../my-wishes.schemas";

export const NewWishForm = ({ onClose }: { onClose: (v: boolean) => void }) => {
  const { mutate } = useSWRConfig();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<NewWishSchema>({
    resolver: zodResolver(NewWishSchema),
    defaultValues: {
      name: "",
      price: undefined,
      description: "",
    },
  });

  const onSubmit = async (data: NewWishSchema) => {
    await toast.promise(
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

    /**
     * @description SWR Keys MUST be the same, arrays included
     */
    await mutate("/api/wish");
    onClose(false);
  };

  return (
    <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)} className="my-4 flex-col gap-4">
      <section className="mb-6 grid gap-x-6 sm:grid-cols-2">
        <div className="grid gap-x-4">
          <Input<NewWishSchema>
            register={register}
            errors={errors}
            displayName="name"
            placeholder="Porsche 992 GT3RS"
          />

          <Input<NewWishSchema>
            register={register}
            errors={errors}
            displayName="price"
            placeholder="250,000"
            rules={{
              valueAsNumber: true,
            }}
          />

          <Input<NewWishSchema>
            register={register}
            errors={errors}
            as="textarea"
            displayName="description"
            placeholder="Optional description ..."
            rules={{
              maxLength: {
                value: 100,
                message: "Must be less than 100 characters",
              },
            }}
          />
        </div>

        <div>
          <Input<NewWishSchema>
            register={register}
            errors={errors}
            displayName="url"
            placeholder="https://example.com"
            rules={{
              pattern: {
                value: /https?:\/\/\S+/,
                message: "Must be a valid URL",
              },
            }}
          />

          <div className="w-full rounded-lg border bg-input px-4 py-[84px] text-center">
            <span className="italic text-neutral-500">URL Preview</span>
          </div>
        </div>
      </section>

      <Button type="submit" className="mt-3 block" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && "Create"}
      </Button>
    </form>
  );
};
