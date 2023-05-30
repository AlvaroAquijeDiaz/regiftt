import { Spinner } from "~/ui/shared/spinner";

export default function Loading() {
  return (
    <div className="min-h-screen min-w-full">
      <span className="mx-auto my-auto">
        Main App on it&apos;s way...
        <Spinner />
      </span>
    </div>
  );
}
