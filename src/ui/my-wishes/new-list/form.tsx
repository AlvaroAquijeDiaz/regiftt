import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import { fetcher } from "~/lib/fetcher";
import { Button } from "~/ui/shared/button";
import { Input } from "~/ui/shared/input";
import { Spinner } from "~/ui/shared/spinner";
import { newListSchema, type NewListSchema } from "../my-wishes.schemas";

export const NewListForm = ({ onClose }: { onClose?: (b: boolean) => void }) => {
  const { mutate } = useSWRConfig();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewListSchema>({
    resolver: zodResolver(newListSchema),
  });

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
      />

      <Input<NewListSchema>
        register={register}
        errors={errors}
        displayName="description"
        as="textarea"
      />

      <Button type="submit" className="mt-10" disabled={isSubmitting}>
        {isSubmitting && <Spinner />}
        {!isSubmitting && "Create"}
      </Button>
    </form>
  );
};
