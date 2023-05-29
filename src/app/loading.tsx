import { Spinner } from "~/ui/shared/spinner";

export default function Loading() {
  return (
    <div className="mx-auto my-auto">
      Main App on it&apos;s way...
      <Spinner />
    </div>
  );
}
