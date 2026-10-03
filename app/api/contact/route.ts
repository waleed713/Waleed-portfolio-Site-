import { NextResponse } from "next/server";
import { messagesDb } from "@/lib/content";

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
  if (limited(ip)) return NextResponse.json({ error: "Too many messages — please try again later." }, { status: 429 });

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // honeypot: pretend success to bots

  const name = String(body.name ?? "").trim().slice(0, 100);
  const email = String(body.email ?? "").trim().slice(0, 150);
  const project = String(body.project ?? "").trim().slice(0, 80);
  const message = String(body.message ?? "").trim().slice(0, 3000);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
    return NextResponse.json({ error: "Please fill in your name, a valid email and a short message." }, { status: 400 });
  }

  // Saving is best-effort: on hosts with a read-only disk it reports saved:false
  // and the browser sends the email via Web3Forms instead.
  let saved = false;
  try {
    await messagesDb.insert({ name, email, project, message, read: false });
    saved = true;
  } catch {}

  return NextResponse.json({ ok: true, saved });
}
