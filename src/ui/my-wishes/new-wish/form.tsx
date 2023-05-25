import { zodResolver } from "@hookform/resolvers/zod";
import { EyeOff, Tag } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { type MetatagsResponse } from "~/app/api/metatags/route";
import { fetcher } from "~/lib/fetcher";
import { useDebounce } from "~/lib/useDebounce";
import { isValidUrl } from "~/lib/utils";
import { Checkbox } from "~/ui/shared/checkbox";
import { Spinner } from "~/ui/shared/spinner";
import { Switch } from "~/ui/shared/switch";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { NewWishSchema } from "../my-wishes.schemas";
import { Preview } from "./preview";

export const NewWishForm = ({ onClose }: { onClose?: (v: boolean) => void | undefined }) => {
  const { mutate } = useSWRConfig();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
    setValue,
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

  const debouncedURL = useDebounce(watch("url"));

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
      fetcher(`/api/wish`, {
        method: "POST",
        body: {
          ...data,
          price: isNaN(Number(data.price)) ? undefined : Number(data.price),
          private: data.private ? false : true,
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
    onClose && onClose(false);
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

              <Switch onCheckedChange={(v) => setValue("priceKnown", v)} />
            </div>

            <Input<NewWishSchema>
              register={register}
              showLabel={false}
              errors={errors}
              disabled={!watch("priceKnown")}
              rules={{
                setValueAs: (v) => (!!v ? Number(v) : undefined),
              }}
              displayName="price"
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

          <div className="flex gap-4">
            <label className="flex select-none items-center gap-2 rounded-lg border border-neutral-300 px-2 py-1 text-sm font-medium">
              <Checkbox defaultChecked={false} onCheckedChange={(v) => setValue("private", !!v)} />
              <EyeOff size={15} />
              Private
            </label>

            <Button variant="optional" size="sm" type="button">
              <Tag size={15} />
              Tags
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
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

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && "Create"}
      </Button>
    </form>
  );
};
