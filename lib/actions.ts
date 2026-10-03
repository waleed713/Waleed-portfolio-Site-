"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin } from "./auth";
import { messagesDb, postsDb, projectsDb } from "./content";
import { uniqueSlug } from "./db";

export type FormState = { error?: string } | undefined;

const str = (f: FormData, k: string, max = 5000) => String(f.get(k) ?? "").trim().slice(0, max);
const tags = (f: FormData) =>
  str(f, "tags", 400).split(",").map((t) => t.trim()).filter(Boolean).slice(0, 12);
const imageOk = (v: string) => v === "" || v.startsWith("/") || /^https?:\/\//.test(v);

function refresh() {
  revalidatePath("/", "layout");
}

/* ---------- auth ---------- */
let failures = 0;
export async function login(_: FormState, f: FormData): Promise<FormState> {
  if (failures >= 8) return { error: "Too many attempts. Restart the server or wait a while." };
  if (!checkPassword(str(f, "password", 200))) {
    failures++;
    await new Promise((r) => setTimeout(r, 700));
    return { error: "Incorrect password." };
  }
  failures = 0;
  await createSession();
  redirect("/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}

/* ---------- projects ---------- */
export async function saveProject(id: string | null, _: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const title = str(f, "title", 140);
  const image = str(f, "image", 500);
  if (!title) return { error: "Title is required." };
  if (!image || !imageOk(image)) return { error: "Please upload a project image." };

  const liveUrl = str(f, "liveUrl", 300);
  if (liveUrl && !/^https?:\/\//.test(liveUrl)) return { error: "Live URL must start with http:// or https://" };

  const data = {
    title,
    category: str(f, "category", 60) || "WordPress",
    description: str(f, "description", 400),
    details: str(f, "details", 20000),
    image,
    tags: tags(f),
    liveUrl,
    client: str(f, "client", 100),
    year: str(f, "year", 10),
    featured: f.get("featured") === "on",
    published: f.get("published") === "on",
  };

  if (id) {
    const existing = await projectsDb.byId(id);
    if (!existing) return { error: "Project not found." };
    await projectsDb.update(id, { ...data, slug: await uniqueSlug(projectsDb, str(f, "slug", 90) || title, id) });
  } else {
    await projectsDb.insert({ ...data, slug: await uniqueSlug(projectsDb, str(f, "slug", 90) || title), updatedAt: new Date().toISOString() });
  }
  refresh();
  redirect("/admin/projects");
}

export async function deleteProject(id: string) {
  await requireAdmin();
  await projectsDb.remove(id);
  refresh();
  redirect("/admin/projects");
}

export async function toggleProject(id: string, field: "published" | "featured") {
  await requireAdmin();
  const p = await projectsDb.byId(id);
  if (p) await projectsDb.update(id, { [field]: !p[field] });
  refresh();
}

/* ---------- posts ---------- */
export async function savePost(id: string | null, _: FormState, f: FormData): Promise<FormState> {
  await requireAdmin();
  const title = str(f, "title", 160);
  const content = str(f, "content", 100000);
  const cover = str(f, "cover", 500);
  if (!title) return { error: "Title is required." };
  if (!content) return { error: "Write some content first." };
  if (!imageOk(cover)) return { error: "Invalid cover image." };

  const excerpt = str(f, "excerpt", 300) || content.replace(/[#*_`>\[\]()!-]/g, "").replace(/\s+/g, " ").slice(0, 160).trim() + "…";
  const data = { title, excerpt, content, cover, tags: tags(f), published: f.get("published") === "on" };

  if (id) {
    if (!(await postsDb.byId(id))) return { error: "Post not found." };
    await postsDb.update(id, { ...data, slug: await uniqueSlug(postsDb, str(f, "slug", 90) || title, id) });
  } else {
    await postsDb.insert({ ...data, slug: await uniqueSlug(postsDb, str(f, "slug", 90) || title), updatedAt: new Date().toISOString() });
  }
  refresh();
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  await requireAdmin();
  await postsDb.remove(id);
  refresh();
  redirect("/admin/posts");
}

export async function togglePost(id: string) {
  await requireAdmin();
  const p = await postsDb.byId(id);
  if (p) await postsDb.update(id, { published: !p.published });
  refresh();
}

/* ---------- messages ---------- */
export async function toggleMessageRead(id: string) {
  await requireAdmin();
  const m = await messagesDb.byId(id);
  if (m) await messagesDb.update(id, { read: !m.read });
  revalidatePath("/admin", "layout");
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  await messagesDb.remove(id);
  revalidatePath("/admin", "layout");
}
