import { type SWRResponse } from "swr";
import { Spinner } from "~/app/_ui/shared/spinner";
import { type MetatagsResponse } from "~/app/api/metatags/route";
import { getDomainWithoutWWW, truncate } from "~/lib/utils";

export const Preview = ({
  metatags,
}: {
  metatags: SWRResponse<MetatagsResponse>;
  url?: string;
}) => {
  if (metatags.isLoading) {
    return (
      <div className="inline-flex h-[290px] w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-input text-sm">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-[290px] w-full flex-col items-start gap-1.5 overflow-hidden rounded-lg border border-border bg-input text-sm">
      {!metatags.data ? (
        <div className="inline-flex min-h-full w-full items-center justify-center px-4 text-sm">
          <span className="italic text-neutral-500">URL Preview</span>
        </div>
      ) : (
        <>
          <div className="max-h-[180px] min-h-[180px] overflow-hidden">
            {!metatags.data.image ? (
              <svg className="h-full min-h-full max-w-full">
                <rect width="100%" height="100%" fill="#ddd" />
              </svg>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={metatags.data.image}
                alt="test"
                className="h-full min-w-full self-center justify-self-center object-cover"
                loading="lazy"
                width={303}
              />
            )}
          </div>

          <section className="flex flex-col items-start justify-between px-2 sm:px-4">
            <span className="text-neutral-700">{getDomainWithoutWWW(metatags.data.from)}</span>

            <span className="font-bold">{truncate(metatags.data?.title, 120)}</span>
            <span className="text-xs text-neutral-500">
              {truncate(metatags.data?.description, 100)}
            </span>
          </section>
        </>
      )}
    </div>
  );
};
