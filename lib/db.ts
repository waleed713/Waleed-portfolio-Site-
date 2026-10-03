import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * Tiny JSON-file store. Everything the admin panel edits lives in /data/*.json
 * and uploaded images in /data/uploads.
 *
 * NOTE: this needs a writable, persistent disk (VPS, Railway, Render, Docker
 * volume, local). On serverless hosts such as Vercel the filesystem is
 * read-only — swap the two functions below (readCollection / writeCollection)
 * for Supabase, Neon, Turso or Vercel Blob and nothing else has to change.
 */
export const DATA_DIR = path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

async function readCollection<T>(name: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, `${name}.json`), "utf8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

async function writeCollection<T>(name: string, rows: T[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const file = path.join(DATA_DIR, `${name}.json`);
  const tmp = `${file}.${process.pid}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(rows, null, 2), "utf8");
  await fs.rename(tmp, file); // atomic swap so a crash never leaves half a file
}

type Row = { id: string; slug?: string; createdAt: string };

export function collection<T extends Row>(name: string) {
  return {
    async all(): Promise<T[]> {
      const rows = await readCollection<T>(name);
      return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async byId(id: string): Promise<T | undefined> {
      return (await readCollection<T>(name)).find((r) => r.id === id);
    },
    async bySlug(slug: string): Promise<T | undefined> {
      return (await readCollection<T>(name)).find((r) => r.slug === slug);
    },
    async insert(data: Omit<T, "id" | "createdAt">): Promise<T> {
      const rows = await readCollection<T>(name);
      const row = { ...data, id: randomUUID(), createdAt: new Date().toISOString() } as T;
      rows.push(row);
      await writeCollection(name, rows);
      return row;
    },
    async update(id: string, patch: Partial<T>): Promise<T | undefined> {
      const rows = await readCollection<T>(name);
      const i = rows.findIndex((r) => r.id === id);
      if (i === -1) return undefined;
      rows[i] = { ...rows[i], ...patch, id, updatedAt: new Date().toISOString() } as T;
      await writeCollection(name, rows);
      return rows[i];
    },
    async remove(id: string): Promise<void> {
      const rows = await readCollection<T>(name);
      await writeCollection(name, rows.filter((r) => r.id !== id));
    },
  };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "untitled";
}

/** Returns a slug that no other row uses (adds -2, -3 … when needed). */
export async function uniqueSlug(
  col: { all(): Promise<{ id: string; slug?: string }[]> },
  wanted: string,
  ignoreId?: string
): Promise<string> {
  const base = slugify(wanted);
  const taken = new Set((await col.all()).filter((r) => r.id !== ignoreId).map((r) => r.slug));
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n++;
  return `${base}-${n}`;
}
