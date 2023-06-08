import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { Button } from "~/app/_ui/shared/button";
import { Checkbox } from "~/app/_ui/shared/checkbox";
import { Chip } from "~/app/_ui/shared/chip";
import { Input } from "~/app/_ui/shared/input";
import { Spinner } from "~/app/_ui/shared/spinner";
import { Switch } from "~/app/_ui/shared/switch";
import { cn } from "~/lib/cn";
import { fetcher } from "~/lib/fetcher";
import { type Gift } from "~/server/db.types";
import { newListSchema, type NewListSchema } from "../my-wishes.schemas";

const DynamicDatePicker = dynamic(
  () => import("../../shared/date-picker").then((mod) => mod.DatePicker),
  {
    loading: () => <Spinner />,
  }
);

export const NewListForm = ({ onClose }: { onClose?: (b: boolean) => void }) => {
  const { mutate } = useSWRConfig();
  const [addMore, setAddMore] = useState(false);
  const r = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewListSchema>({
    resolver: zodResolver(newListSchema),
    defaultValues: {
      wishIDs: [],
      private: false,
    },
  });

  const gifts = useSWR<Gift[]>("/api/wish", (key: string) => fetcher(key, { isClient: true }));

  const onSubmit = async (data: NewListSchema) => {
    await toast.promise(
      fetcher<unknown, NewListSchema>(`/api/list`, {
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
    onClose && !addMore && onClose(false);
    reset();
    r.push("/dashboard/lists");
  };

  const handleSelectGift = (gift: Gift) => {
    const wishIDs = getValues("wishIDs");

    if (wishIDs.includes(gift.id)) {
      setValue(
        "wishIDs",
        wishIDs.filter((id) => id !== gift.id)
      );

      return;
    }

    setValue("wishIDs", [...wishIDs, gift.id]);
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

      <section className="flex flex-col gap-1">
        <span className="font-semibold">When does it take place?</span>

        <DynamicDatePicker register={(_n, v) => setValue("dueOn", v)} />
      </section>

      <div className="mt-2 flex flex-col gap-1">
        <p className="font-semibold">Select Gifts</p>

        <section className="h-36 w-full overflow-y-scroll rounded-lg border bg-input p-2 text-sm">
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
                <Checkbox onCheckedChange={() => handleSelectGift(gift)} value={gift.id} />
                <span className="font-semibold capitalize">{gift.name}</span>

                {gift.visible ? <Chip>Public</Chip> : <Chip variant="secondary">Private</Chip>}
              </label>
            </div>
          ))}
        </section>
      </div>

      <label className="mt-2 flex w-fit select-none items-center gap-2 rounded-lg border border-neutral-300 px-2 py-1 text-sm font-medium">
        <Checkbox defaultChecked={false} onCheckedChange={(v) => setValue("private", !!v)} />
        <EyeOff size={15} />
        Private
      </label>

      <section className="mt-4 flex items-center">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Spinner />}
          {!isSubmitting && "Create"}
        </Button>

        <fieldset
          className="group flex select-none items-center gap-1.5 rounded-full px-5"
          name="addMore"
        >
          <Switch
            className="h-[15px] w-[30px] group-hover:bg-neutral-200 group-hover:data-[state=checked]:bg-indigo-400"
            name="addMore"
            checked={addMore}
            onCheckedChange={setAddMore}
            thumbClassName="h-3 w-3 data-[state=checked]:translate-x-3.5"
          />

          <label
            htmlFor="addMore"
            className="py-2.5 text-sm font-semibold text-neutral-700"
            onClick={() => setAddMore((prev) => !prev)}
          >
            Add More
          </label>
        </fieldset>
      </section>
    </form>
  );
};
