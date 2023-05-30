import { type SWRResponse } from "swr";
import { type MetatagsResponse } from "~/app/api/metatags/route";
import { getDomainWithoutWWW, truncate } from "~/lib/utils";
import { Spinner } from "~/ui/shared/spinner";

export const Preview = ({
  metatags,
}: {
  metatags: SWRResponse<MetatagsResponse>;
  url?: string;
}) => {
  if (metatags.isLoading) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="inline-flex h-full w-full items-center justify-center rounded-lg border bg-input px-4 text-center text-sm">
          <Spinner />
        </div>
      </div>
    );
  }

  if (!metatags.data) {
    return (
      <div className="flex h-full flex-col justify-center gap-4">
        <div className="inline-flex h-full w-full items-center justify-center rounded-lg border bg-input px-4 text-center text-sm">
          <span className="italic text-neutral-500">URL Preview</span>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex h-full max-h-full w-full flex-col items-center gap-2 overflow-hidden rounded-lg border bg-input text-center text-sm">
      <div className="flex h-[136px] max-h-[140px] flex-col justify-center overflow-hidden">
        {!metatags.data.image ? (
          <svg>
            <rect width="100%" height="100%" fill="#ddd" />
          </svg>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={metatags.data.image} alt="test" className="w-full object-cover" />
        )}
      </div>

      <section className="flex flex-col px-2">
        <span>{getDomainWithoutWWW(metatags.data.from)}</span>

        <span className="font-bold">{truncate(metatags.data?.title, 120)}</span>
        <span className="text-xs text-neutral-500">
          {truncate(metatags.data?.description, 100)}
        </span>
      </section>
    </div>
  );
};
