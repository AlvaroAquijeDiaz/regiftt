import { Spinner } from "~/ui/shared/spinner";

export default function Loading() {
  return (
    <div>
      <h1 className="font-bold">Loading...</h1>
      <Spinner />
    </div>
  );
}
