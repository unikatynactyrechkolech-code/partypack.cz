import type { Metadata } from "next";
import Link from "next/link";
import { EventForm } from "@/components/admin/EventForm";
import { isAdminRequest } from "@/lib/admin";

export const metadata: Metadata = { title: "Nová akce" };

export default async function NewEventPage() {
  if (!(await isAdminRequest())) return null;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div>
      <Link href="/admin" className="text-sm font-medium underline underline-offset-4">
        Zpět na akce
      </Link>
      <h1 className="mt-4 text-2xl font-semibold">Nová akce</h1>
      <div className="mt-6">
        <EventForm
          values={{ title: "", slug: "", event_date: today, service: "fotokoutek", event_type: "event", album_url: null, description: null, published: true, cover_key: null }}
        />
      </div>
    </div>
  );
}
