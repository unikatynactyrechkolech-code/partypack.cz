import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Administrace", template: "%s | Administrace Partypack" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-svh flex-1 bg-paper-soft text-ink">{children}</div>;
}
