import Link from "next/link";
import { redirect } from "next/navigation";
import { SetupNotice } from "@/components/admin/SetupNotice";
import { signOut } from "@/app/admin/actions";
import { getAdminStatus } from "@/lib/admin";
import { Logo } from "@/components/Logo";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const status = await getAdminStatus();
  if (status.state === "not-configured") return <SetupNotice />;
  if (status.state === "signed-out") redirect("/admin/prihlaseni");
  if (status.state === "forbidden") {
    return (
      <div className="mx-auto max-w-xl px-5 py-20">
        <h1 className="text-2xl font-semibold">Bez přístupu</h1>
        <p className="mt-4">
          Účet {status.email} není v seznamu administrátorů. Přidejte jeho e-mail do tabulky partypack.admins.
        </p>
        <form action={signOut} className="mt-6">
          <button className="rounded-lg border border-ink px-5 py-2.5 text-sm font-medium">Odhlásit se</button>
        </form>
      </div>
    );
  }

  const link = "rounded-md px-3 py-2 text-sm font-medium hover:bg-paper-soft";
  return (
    <>
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-5 py-3">
          <Link href="/admin" className="flex items-center gap-3">
            <Logo className="h-[18px]" />
            <span className="text-sm font-semibold">Administrace</span>
          </Link>
          <nav className="flex flex-1 items-center gap-1">
            <Link href="/admin" className={link}>Akce</Link>
            <Link href="/admin/poptavky" className={link}>Poptávky</Link>
            <a href="/" target="_blank" rel="noopener noreferrer" className={link}>Zobrazit web</a>
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <span className="hidden sm:inline">{status.email}</span>
            <form action={signOut}>
              <button className="rounded-lg border border-line px-3 py-1.5 font-medium hover:border-ink">Odhlásit</button>
            </form>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-5 py-10">{children}</div>
    </>
  );
}
