import axios from "axios";

export function getApiErrorMessage(err: unknown, fallback = "Something went wrong") {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as unknown;
    const msg =
      data && typeof data === "object" && "message" in data ? (data as { message?: unknown }).message : undefined;
    if (typeof msg === "string" && msg.trim().length > 0) return msg;
    if (typeof err.message === "string" && err.message.trim().length > 0) return err.message;
    return fallback;
  }
  if (err instanceof Error) {
    return err.message || fallback;
  }
  return fallback;
}

