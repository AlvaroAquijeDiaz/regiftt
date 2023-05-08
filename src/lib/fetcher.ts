import { toast } from "react-hot-toast";

export type SWRError = Error & { status?: number; message?: string };

type RequestInitWithoutBodyOrMethod = Omit<RequestInit, "body" | "method">;

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  opts?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown>;
  },
  init?: RequestInitWithoutBodyOrMethod
): Promise<JSON> {
  try {
    const res = await fetch(input, {
      ...init,
      method: opts?.method ?? "GET",
      body: opts?.body ? JSON.stringify(opts.body) : undefined,
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

    throw new Error("Something went wrong");
  } catch (error) {
    const fixedError = error as SWRError;

    toast.error(fixedError.message);
    return Promise.resolve({} as JSON);
  }
}
