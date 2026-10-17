import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  phone?: string;
  source?: string;
  product?: string;
  message?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const required: (keyof Payload)[] = ["name", "email", "phone", "source", "product"];
  for (const key of required) {
    if (!body[key] || String(body[key]).trim() === "") {
      return NextResponse.json({ ok: false, error: `missing ${key}` }, { status: 400 });
    }
  }

  // Forward the submission to a webhook (e.g. Make, Zapier, n8n, Slack, or your own mail endpoint)
  // when CONTACT_WEBHOOK_URL is configured. Without it the submission is only logged on the server.
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "webhook failed" }, { status: 502 });
    }
  } else {
    console.log("[contact]", JSON.stringify(body));
  }

  return NextResponse.json({ ok: true });
}
