export type SWRError = Error & { status?: number };

type RequestInitWithoutBodyOrMethod = Omit<RequestInit, 'body' | 'method'>;

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  opts: {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
  },
  init?: RequestInitWithoutBodyOrMethod
): Promise<JSON> {
  const res = await fetch(input, {
    ...init,
    method: opts.method ?? 'GET',
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });

  if (res.ok) {
    return (await res.json()) as JSON;
  }

  const json = (await res.json()) as JSON & { error?: string };

  if (json.error) {
    const error = new Error(json.error) as SWRError;
    error.status = res.status;

    throw error;
  }

  throw new Error('An unexpected error occurred');
}
