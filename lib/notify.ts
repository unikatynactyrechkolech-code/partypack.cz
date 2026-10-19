import "server-only";

const RESEND_API_KEY = process.env.RESEND_API_KEY ?? "";
const TO = process.env.INQUIRY_TO_EMAIL ?? "info@partypack.cz";
// Odesílací adresa musí být na doméně ověřené v Resend (např. poptavky@partypack.cz).
const FROM = process.env.INQUIRY_FROM_EMAIL ?? "Partypack web <onboarding@resend.dev>";

export type InquiryEmail = {
  name: string;
  email: string;
  phone: string;
  source: string | null;
  services: string[];
  message: string | null;
  page: string | null;
};

export function isEmailConfigured() {
  return Boolean(RESEND_API_KEY);
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendInquiryEmail(i: InquiryEmail) {
  const rows: [string, string][] = [
    ["Jméno", i.name],
    ["E-mail", i.email],
    ["Telefon", i.phone],
    ["Služby", i.services.join(", ")],
    ["Kde na nás narazili", i.source ?? ""],
    ["Datum akce a zpráva", i.message ?? ""],
    ["Odesláno ze stránky", i.page ?? ""],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;color:#0b0b0c;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="font-weight:bold;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM,
      to: TO.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: i.email,
      subject: `Nová poptávka: ${i.services.join(", ")} – ${i.name}`,
      text,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}
