import type { useRouter } from "next/navigation";

/**
 * Session-aware fetch for client components. API routes return
 * {error: "Not logged in"} with a 401 when the session cookie is missing or
 * expired — without this, callers were doing `.then(setState)` directly and
 * crashing (`x.map is not a function`) when state got set to that error
 * object instead of the expected array/object.
 */
export async function fetchOrRedirect<T>(
  url: string,
  router: ReturnType<typeof useRouter>,
  loginPath: string,
  fallback: T
): Promise<T> {
  const res = await fetch(url);
  if (res.status === 401) {
    router.push(loginPath);
    return fallback;
  }
  if (!res.ok) return fallback;
  return res.json();
}
