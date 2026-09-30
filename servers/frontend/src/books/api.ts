import type { BookLocale, BooksManifest } from "./types";

async function readOk(response: Response, label: string): Promise<string> {
  if (!response.ok) {
    throw new Error(`${label} ${response.status}`);
  }
  return response.text();
}

function booksUrl(path: string): string {
  const base = import.meta.env.BASE_URL || "/";
  return `${base}books/${path}`;
}

export async function fetchBooksManifest(): Promise<BooksManifest> {
  const response = await fetch(booksUrl("manifest.json"));
  const text = await readOk(response, "manifest");
  return JSON.parse(text) as BooksManifest;
}

export async function fetchChapterMarkdown(locale: BookLocale, slug: string): Promise<string> {
  const response = await fetch(booksUrl(`${locale}/${slug}.md`));
  return readOk(response, slug);
}
