import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { useSWRConfig } from "swr";
import { type MetatagsResponse } from "~/app/api/metatags/route";
import { fetcher } from "~/lib/fetcher";
import { useDebounce } from "~/lib/useDebounce";
import { isValidUrl } from "~/lib/utils";
import { Spinner } from "~/ui/shared/spinner";
import { Switch } from "~/ui/shared/switch";
import { Button } from "../../shared/button";
import { Input } from "../../shared/input";
import { NewWishSchema } from "../my-wishes.schemas";
import { Preview } from "./preview";

export const NewWishForm = ({ onClose }: { onClose?: (v: boolean) => void | undefined }) => {
  const { mutate } = useSWRConfig();
  const [parent] = useAutoAnimate({
    duration: 150,
  });

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

          <div className="grid h-20 items-start gap-1" ref={parent}>
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

          <Input<NewWishSchema>
            register={register}
            errors={errors}
            displayName="description"
            placeholder="Optional description ..."
            rules={{
              maxLength: {
                value: 100,
                message: "Must be less than 100 characters",
              },
            }}
            fullHeight
          />
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
