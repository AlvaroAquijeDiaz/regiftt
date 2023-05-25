import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { cn } from "~/lib/cn";
import { fetcher } from "~/lib/fetcher";
import { type Gift } from "~/server/db.types";
import { Button } from "~/ui/shared/button";
import { Checkbox } from "~/ui/shared/checkbox";
import { Chip } from "~/ui/shared/chip";
import { Input } from "~/ui/shared/input";
import { ScrollArea } from "~/ui/shared/scroll-area";
import { Spinner } from "~/ui/shared/spinner";
import { newListSchema, type NewListSchema } from "../my-wishes.schemas";

export const NewListForm = ({ onClose }: { onClose?: (b: boolean) => void }) => {
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewListSchema>({
    resolver: zodResolver(newListSchema),
    defaultValues: {
      wishIDs: [],
    },
  });

  const gifts = useSWR<Gift[]>("/api/wish", (key: string) => fetcher(key, { isClient: true }));

  const onSubmit = async (data: NewListSchema) => {
    await toast.promise(
      fetcher(`/api/list`, {
        method: "POST",
        body: {
          ...data,
        },
        isClient: true,
      }),
      {
        loading: "Creating list...",
        success: "List created!",
        error: "Error creating list",
      }
    );

    await mutate("/api/list");
    onClose && onClose(false);
  };

  return (
    <form onSubmit={(evt) => void handleSubmit(onSubmit)(evt)} className="mt-4 flex flex-col gap-2">
      <Input<NewListSchema>
        register={register}
        errors={errors}
        displayName="name"
        placeholder="Christmas"
        showRequiredInLabel
      />

      <Input<NewListSchema>
        register={register}
        errors={errors}
        rows={2}
        displayName="description"
        as="textarea"
        containerClassName="mb-4"
      />

      <div className="flex flex-col gap-1">
        <p className="font-semibold">Select Gifts</p>

        <ScrollArea className="h-36 w-full rounded-lg border bg-input p-2 text-sm">
          {gifts.isLoading && <Spinner />}

          {gifts.data?.map((gift, idx) => (
            <div
              key={gift.id}
              className={cn(
                "flex flex-col gap-2 rounded-lg border bg-white",
                idx === 0 ? "mt-0" : "mt-2"
              )}
            >
              <label className="flex cursor-pointer select-none items-center gap-4 px-4 py-2">
                <Checkbox
                  onCheckedChange={() => {
                    const wishIDs = getValues("wishIDs");

                    if (wishIDs.includes(gift.id)) {
                      setValue(
                        "wishIDs",
                        wishIDs.filter((id) => id !== gift.id)
                      );

                      return;
                    }

                    setValue("wishIDs", [...wishIDs, gift.id]);
                  }}
                  value={gift.id}
                />
                <span className="font-semibold capitalize">{gift.name}</span>

                {gift.visible ? <Chip>Public</Chip> : <Chip variant="secondary">Private</Chip>}
              </label>
            </div>
          ))}
        </ScrollArea>
      </div>

      {errors.wishIDs?.message}

      <Button type="submit" className="mt-4" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && "Create"}
      </Button>
    </form>
  );
};
