"use client";

import { deleteEvent } from "@/app/admin/actions";

export function DeleteEventButton({ id, title }: { id: string; title: string }) {
  return (
    <form
      action={deleteEvent}
      onSubmit={(e) => {
        if (!window.confirm(`Opravdu smazat akci „${title}“? Tuto akci nelze vrátit.`)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button type="submit" className="rounded-lg border border-red-600 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50">
        Smazat akci
      </button>
    </form>
  );
}
