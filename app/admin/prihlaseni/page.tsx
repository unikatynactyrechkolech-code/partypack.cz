import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Img } from "@/components/Img";
import { LoginForm } from "@/components/admin/LoginForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getAdminStatus } from "@/lib/admin";

export const metadata: Metadata = { title: "Přihlášení" };

export default async function LoginPage(props: PageProps<"/admin/prihlaseni">) {
  const sp = await props.searchParams;
  const confirmed = sp.potvrzeno === "1" && !sp.error;
  const linkError = typeof sp.error_description === "string" || typeof sp.error === "string";
  const status = await getAdminStatus();
  if (status.state === "not-configured") return <SetupNotice />;
  if (status.state === "ok") redirect("/admin");
  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-lg border border-line bg-white p-8">
        <Img k="2022/01/cropped-cropped-logo-znak-png-male" alt="PARTYPACK" className="h-8 w-auto" sizes="120px" />
        <h1 className="mt-6 text-xl font-semibold">Přihlášení do administrace</h1>
        {confirmed ? <p className="mt-3 text-sm" role="status">E-mail je potvrzený. Teď se přihlaste.</p> : null}
        {linkError ? (
          <p className="mt-3 text-sm" role="alert">
            Odkaz z e-mailu už neplatí. Přihlaste se a nechte si poslat nový.
          </p>
        ) : null}
        {status.state === "forbidden" ? (
          <p className="mt-3 text-sm">
            Účet {status.email} nemá přístup. Přihlaste se jiným účtem.
          </p>
        ) : null}
        <div className="mt-6">
          <LoginForm />
        </div>
        <p className="mt-6 text-sm">
          Poprvé tady?{" "}
          <Link href="/admin/registrace" className="font-medium underline underline-offset-4">
            Nastavit heslo
          </Link>
        </p>
      </div>
    </div>
  );
}
