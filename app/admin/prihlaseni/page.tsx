import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Img } from "@/components/Img";
import { LoginForm } from "@/components/admin/LoginForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getAdminStatus } from "@/lib/admin";

export const metadata: Metadata = { title: "Přihlášení" };

export default async function LoginPage() {
  const status = await getAdminStatus();
  if (status.state === "not-configured") return <SetupNotice />;
  if (status.state === "ok") redirect("/admin");
  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-lg border border-line bg-white p-8">
        <Img k="2022/01/cropped-cropped-logo-znak-png-male" alt="PARTYPACK" className="h-8 w-auto" sizes="120px" />
        <h1 className="mt-6 text-xl font-semibold">Přihlášení do administrace</h1>
        {status.state === "forbidden" ? (
          <p className="mt-3 text-sm">
            Účet {status.email} nemá přístup. Přihlaste se jiným účtem.
          </p>
        ) : null}
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
