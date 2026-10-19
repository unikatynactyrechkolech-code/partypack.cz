import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventForm, type EventFormValues } from "@/components/admin/EventForm";
import { DeleteEventButton } from "@/components/admin/DeleteEventButton";
import { sessionClient } from "@/lib/supabase/server";
import { isAdminRequest } from "@/lib/admin";

export const metadata: Metadata = { title: "Upravit akci" };

export default async function EditEventPage(props: PageProps<"/admin/akce/[id]">) {
  const { id } = await props.params;
  const sp = (await props.searchParams) as { chyba?: string };
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  if (!(await isAdminRequest())) return null;
  const supabase = await sessionClient();
  const { data } = await supabase
    .from("events")
    .select("id,title,slug,event_date,service,event_type,album_url,description,published,cover_key")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const values = data as EventFormValues & { id: string };

  return (
    <div>
      <Link href="/admin" className="text-sm font-medium underline underline-offset-4">
        Zpět na akce
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">{values.title}</h1>
        {values.published ? (
          <a href={`/portfolio/${values.slug}`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium underline underline-offset-4">
            Zobrazit na webu
          </a>
        ) : null}
      </div>
      {sp.chyba ? <p className="mt-4 text-sm font-medium text-red-600">Smazání se nepovedlo.</p> : null}
      <div className="mt-6">
        <EventForm values={values} />
      </div>
      <div className="mt-8">
        <DeleteEventButton id={values.id} title={values.title} />
      </div>
    </div>
  );
}
