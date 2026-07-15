
type AuthExpiredCallback = (reason: "unauthorized" | "forbidden") => void;

const AUTH_EXPIRED_EVENT = "virtualnet:auth_expired";

/** Fire once when a 401 / 403 lands. */
export function emitAuthExpired(reason: "unauthorized" | "forbidden" = "unauthorized") {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT, { detail: { reason } }));
}

/** Subscribe to the event. Returns an unsubscribe function. */
export function onAuthExpired(cb: AuthExpiredCallback): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const detail = (e as CustomEvent<{ reason: "unauthorized" | "forbidden" }>).detail;
    cb(detail.reason);
  };

  window.addEventListener(AUTH_EXPIRED_EVENT, handler);
  return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handler);
}
