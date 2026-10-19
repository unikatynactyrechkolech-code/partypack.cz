"use client";

import { setInquiryStatus } from "@/app/admin/actions";

const OPTIONS = [
  { value: "nova", label: "Nová" },
  { value: "resi-se", label: "Řeší se" },
  { value: "hotovo", label: "Hotovo" },
];

export function InquiryStatusSelect({ id, status }: { id: string; status: string }) {
  return (
    <form action={setInquiryStatus}>
      <input type="hidden" name="id" value={id} />
      <label className="sr-only" htmlFor={`status-${id}`}>
        Stav poptávky
      </label>
      <select
        id={`status-${id}`}
        name="status"
        defaultValue={status}
        onChange={(e) => e.currentTarget.form?.requestSubmit()}
        className="rounded-lg border border-line bg-white px-3 py-2 text-sm font-medium focus:border-ink focus:outline-none"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </form>
  );
}
