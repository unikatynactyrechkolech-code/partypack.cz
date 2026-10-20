import { NextResponse } from "next/server";
import { INQUIRY_SERVICES } from "@/lib/services";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/config";
import { serviceClient } from "@/lib/supabase/service";
import { publicClient } from "@/lib/supabase/public";
import { RPC, T } from "@/lib/supabase/tables";
import { isEmailConfigured, sendInquiryEmail, type InquiryEmail } from "@/lib/notify";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  // Ochrana proti spamu: vyplněné skryté pole nebo odeslání rychleji než za 2,5 s.
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : null;
  if (str(body.web, 200) || (elapsed !== null && elapsed < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const inquiry: InquiryEmail = {
    name: str(body.name, 200),
    email: str(body.email, 320),
    phone: str(body.phone, 50),
    source: str(body.source, 200) || null,
    services: Array.isArray(body.services)
      ? [...new Set(body.services.filter((s): s is string => typeof s === "string" && (INQUIRY_SERVICES as readonly string[]).includes(s)))]
      : [],
    message: str(body.message, 2000) || null,
    page: (() => {
      const p = str(body.page, 300);
      return p.startsWith("/") ? p : null;
    })(),
  };

  if (!inquiry.name || !EMAIL_RE.test(inquiry.email) || inquiry.phone.length < 3 || !inquiry.source || inquiry.services.length === 0) {
    return NextResponse.json({ ok: false, error: "invalid input" }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  const channels = { db: isServiceRoleConfigured() || isSupabaseConfigured(), email: isEmailConfigured(), webhook: Boolean(webhook) };
  const delivered = { db: false, email: false, webhook: false };

  if (channels.db) {
    // S tajným klíčem zapisujeme přímo, jinak přes databázovou funkci s veřejným klíčem.
    const { error } = isServiceRoleConfigured()
      ? await serviceClient().from(T.inquiries).insert(inquiry)
      : await publicClient().rpc(RPC.submitInquiry, {
          p_name: inquiry.name,
          p_email: inquiry.email,
          p_phone: inquiry.phone,
          p_source: inquiry.source,
          p_services: inquiry.services,
          p_message: inquiry.message,
          p_page: inquiry.page,
        });
    if (error) console.error("[contact] db insert failed:", error.message);
    else delivered.db = true;
  }
  if (channels.email) {
    try {
      await sendInquiryEmail(inquiry);
      delivered.email = true;
    } catch (e) {
      console.error("[contact] email failed:", e instanceof Error ? e.message : e);
    }
  }
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...inquiry, receivedAt: new Date().toISOString() }),
      });
      delivered.webhook = res.ok;
    } catch (e) {
      console.error("[contact] webhook failed:", e instanceof Error ? e.message : e);
    }
  }

  if (!channels.db && !channels.email && !channels.webhook) {
    console.warn("[contact] no delivery channel configured, inquiry only logged:", JSON.stringify(inquiry));
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "not configured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, delivered });
  }
  if (!delivered.db && !delivered.email && !delivered.webhook) {
    return NextResponse.json({ ok: false, error: "delivery failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
