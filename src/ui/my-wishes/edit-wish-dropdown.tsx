import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { fetcher } from "~/lib/fetcher";
import { Button } from "../shared/button";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "../shared/dropdown";
import { Spinner } from "../shared/spinner";

export const EditWishDropdown = ({ id }: { id: string }) => {
  const { trigger, isMutating } = useSWRMutation(
    `/api/wish/${id}`,
    (key) => fetcher(key, { method: "DELETE", isClient: true }),
    {
      // TODO: Make this in a better way prob another page
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSuccess: async () => {
        await mutate("/api/wish");
        return void toast.success("Wish deleted!");
      },
      onError: () => toast.error("Error deleting wish"),
    }
  );

  const { mutate } = useSWRConfig();

  return (
    <Dropdown>
      <DropdownTrigger className="focus-within:outline-none" asChild>
        <Button size="sm" variant="outline" className="gap-2" disabled={isMutating}>
          Menu <MoreHorizontal size={15} />
          {isMutating && <Spinner />}
        </Button>
      </DropdownTrigger>

      <DropdownContent>
        <DropdownItem onClick={() => void trigger()}>
          <Trash size={15} />
          Delete
          {isMutating && <Spinner />}
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
};
