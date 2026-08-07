import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { ADMIN_COOKIE_NAME, isAdminSessionValid } from "@/lib/admin-auth";

export default async function AdminSiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();

  if (!(await isAdminSessionValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value))) {
    redirect("/admin?next=/admin/site");
  }

  return children;
}
