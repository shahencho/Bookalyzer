import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getParentSession } from "@/lib/auth";

// An already-logged-in parent goes straight to the dashboard. The DB check
// avoids a redirect loop for a cookie whose parent no longer exists.
export default async function ParentLoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getParentSession();
  if (session.parentId && (await prisma.parent.findUnique({ where: { id: session.parentId } }))) {
    redirect("/parent/dashboard");
  }
  return children;
}
