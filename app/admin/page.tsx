import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/AdminLoginForm";
import { ADMIN_COOKIE_NAME, isAdminSessionValid } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Private Shop Access",
  robots: { index: false, follow: false, nocache: true },
};

export default async function AdminPage() {
  const cookieStore = await cookies();

  if (await isAdminSessionValid(cookieStore.get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin/site");
  }

  return (
    <main className="admin-login-page" id="main-content">
      <Link className="admin-login__back" href="/">
        <span aria-hidden="true">←</span> Back to the landing page
      </Link>

      <section className="admin-login__panel" aria-labelledby="admin-login-title">
        <Image
          className="admin-login__mark"
          src="/logo/snapdraken-hero-exact.png"
          width={166}
          height={180}
          alt="Snapdraken dragon mark"
          priority
        />
        <p className="admin-login__eyebrow">Private build / authorized eyes only</p>
        <h1 id="admin-login-title">The public door is closed. The shop door isn’t.</h1>
        <p className="admin-login__lede">
          Enter the project code to preview the working Snapdraken site.
        </p>
        <AdminLoginForm />
      </section>
    </main>
  );
}
