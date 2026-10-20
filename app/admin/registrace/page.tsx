import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Img } from "@/components/Img";
import { RegisterForm } from "@/components/admin/RegisterForm";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { getAdminStatus } from "@/lib/admin";

export const metadata: Metadata = { title: "Nastavení hesla" };

export default async function RegisterPage() {
  const status = await getAdminStatus();
  if (status.state === "not-configured") return <SetupNotice />;
  if (status.state === "ok") redirect("/admin");
  return (
    <div className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-sm rounded-lg border border-line bg-white p-8">
        <Img k="2022/01/cropped-cropped-logo-znak-png-male" alt="PARTYPACK" className="h-8 w-auto" sizes="120px" />
        <h1 className="mt-6 text-xl font-semibold">Nastavení hesla do administrace</h1>
        <p className="mt-2 text-sm">Funguje jen pro e-maily, které mají do administrace přístup.</p>
        <div className="mt-6">
          <RegisterForm />
        </div>
        <p className="mt-6 text-sm">
          Už máte heslo?{" "}
          <Link href="/admin/prihlaseni" className="font-medium underline underline-offset-4">
            Přihlásit se
          </Link>
        </p>
      </div>
    </div>
  );
}
