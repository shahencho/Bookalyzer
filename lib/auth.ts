import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";

interface ChildSessionData {
  childId: number;
}
interface ParentSessionData {
  parentId: number;
}
interface AdminSessionData {
  adminId: number;
}

const password = process.env.SESSION_SECRET ?? "dev-only-secret-change-me-please-32chars";

// `secure` must stay false for local http:// dev — with it on, browsers
// (and any HTTP client) silently drop the cookie on a non-https request,
// which breaks login with no visible error.
const cookieOptions = { secure: process.env.NODE_ENV === "production" };

// Each role gets its own distinctly-named cookie so, e.g., an admin testing
// the child login flow in the same browser doesn't get silently logged out
// of their own admin session.
export async function getChildSession(): Promise<IronSession<ChildSessionData>> {
  return getIronSession<ChildSessionData>(await cookies(), { password, cookieName: "child_session", cookieOptions });
}
export async function getParentSession(): Promise<IronSession<ParentSessionData>> {
  return getIronSession<ParentSessionData>(await cookies(), { password, cookieName: "parent_session", cookieOptions });
}
export async function getAdminSession(): Promise<IronSession<AdminSessionData>> {
  return getIronSession<AdminSessionData>(await cookies(), { password, cookieName: "admin_session", cookieOptions });
}
