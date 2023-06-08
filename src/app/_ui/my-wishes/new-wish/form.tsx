import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { Checkbox } from "~/app/_ui/shared/checkbox";
import { Spinner } from "~/app/_ui/shared/spinner";
import { Switch } from "~/app/_ui/shared/switch";
import { type MetatagsResponse } from "~/app/api/metatags/route";
import { fetcher } from "~/lib/fetcher";
import { useDebounce } from "~/lib/useDebounce";
import { isValidUrl } from "~/lib/utils";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { NewWishSchema } from "../my-wishes.schemas";
import { Preview } from "./preview";

export const NewWishForm = ({ onClose }: { onClose?: (v: boolean) => void | undefined }) => {
  const { mutate } = useSWRConfig();
  const [addMore, setAddMore] = useState(false);
  const r = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    resetField,
    reset,
  } = useForm<NewWishSchema>({
    resolver: zodResolver(NewWishSchema),
    defaultValues: {
      name: "",
      price: undefined,
      description: "",
      priceKnown: false,
      url: "",
      private: false,
    },
  });

  const debouncedURL = useDebounce<string | undefined>(watch("url"));

  const previewURL = useSWR<MetatagsResponse>(
    `/api/metatags?url=${debouncedURL || ""}`,
    isValidUrl(debouncedURL || "")
      ? (key) =>
          fetcher(key as string, {
            isClient: true,
          })
      : null
  );

  const onSubmit = async (data: NewWishSchema) => {
    await toast.promise(
      fetcher<unknown, NewWishSchema>(`/api/wish`, {
        method: "POST",
        body: {
          ...data,
          price: isNaN(Number(data.price)) ? undefined : Number(data.price),
          private: data.private ? false : true,
          linkMeta: {
            description: previewURL?.data?.description,
            image: previewURL?.data?.image || undefined,
            title: previewURL?.data?.title,
          },
        },
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
    onClose && !addMore && onClose(false);
    reset();
    r.push("/dashboard/wishes");
  };

  return (
    <form
      onSubmit={(evt) => void handleSubmit(onSubmit)(evt)}
      className="mt-4 flex h-full flex-col gap-2"
    >
      <section className="mb-4 grid max-h-full gap-x-4 gap-y-2 sm:grid-cols-2">
        <div className="grid gap-4">
          <Input<NewWishSchema>
            register={register}
            errors={errors}
            displayName="name"
            placeholder="Porsche 992 GT3RS"
            showRequiredInLabel
          />

          <div className="grid items-start">
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Price</span>

                {watch("priceKnown") && <span className="text-sm text-indigo-600">Estimate</span>}
              </p>

              <Switch
                onCheckedChange={(v) => {
                  setValue("priceKnown", v);
                  resetField("price");
                }}
              />
            </div>

            <Input<NewWishSchema>
              register={register}
              showLabel={false}
              errors={errors}
              disabled={!watch("priceKnown")}
              displayName="price"
              rules={{
                valueAsNumber: true,
              }}
              placeholder="$250,000"
            />
          </div>

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

          <div className="flex items-center gap-4">
            <label className="flex h-auto select-none items-center gap-2 rounded-lg border border-neutral-300 px-2 py-1.5 text-sm font-medium">
              <Checkbox defaultChecked={false} onCheckedChange={(v) => setValue("private", !!v)} />
              <EyeOff size={15} />
              Private
            </label>

            <Button variant="optional" size="sm" type="button" className="">
              <Tag size={15} />
              Tags
            </Button>
          </div>
        </div>

        <div className="flex min-h-full flex-col gap-2">
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

          <Preview metatags={previewURL} />
        </div>
      </section>

      <section className="flex items-center gap-2">
        <Button
          type="submit"
          disabled={isSubmitting || (debouncedURL && !previewURL.data ? true : false)}
        >
          {isSubmitting && <Spinner />}
          {!isSubmitting && "Create!"}
        </Button>

        <fieldset
          className="group flex h-full select-none items-center gap-1.5 rounded-full px-5"
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
