import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getChildSession } from "@/lib/auth";

// A child who is already logged in (e.g. tapping "Child" in the top nav)
// goes straight to the library instead of re-entering their PIN. The DB
// check avoids a redirect loop for a cookie whose child no longer exists.
export default async function ChildLoginLayout({ children }: { children: React.ReactNode }) {
  const session = await getChildSession();
  if (session.childId && (await prisma.child.findUnique({ where: { id: session.childId } }))) {
    redirect("/child/library");
  }
  return children;
}
