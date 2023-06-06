import { Spinner } from "~/app/_ui/shared/spinner";

export default function Loader() {
  return (
    <div className="flex w-full items-center justify-center gap-2 p-40 font-semibold italic text-neutral-500">
      <Spinner />
      On it ... 🚀
    </div>
  );
}
