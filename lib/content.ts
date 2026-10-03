import "server-only";
import { collection } from "./db";
import type { Message, Post, Project } from "./types";

export const projectsDb = collection<Project>("projects");
export const postsDb = collection<Post>("posts");
export const messagesDb = collection<Message>("messages");

export async function getPublishedProjects() {
  const all = await projectsDb.all();
  return all.filter((p) => p.published);
}
export async function getPublishedPosts() {
  const all = await postsDb.all();
  return all.filter((p) => p.published);
}
export function readingTime(text: string) {
  return Math.max(1, Math.round(text.trim().split(/\s+/).length / 210));
}
