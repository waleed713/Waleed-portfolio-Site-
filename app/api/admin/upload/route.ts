import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";
import { UPLOAD_DIR } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const EXT: Record<string, string> = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif", "image/avif": ".avif" };
const MAX = 6 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });
  const ext = EXT[file.type];
  if (!ext) return NextResponse.json({ error: "Only JPG, PNG, WebP, GIF or AVIF images are allowed." }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: "Image must be under 6 MB." }, { status: 400 });

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const name = `${Date.now()}-${randomUUID().slice(0, 8)}${ext}`;
  await fs.writeFile(path.join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${name}` });
}
