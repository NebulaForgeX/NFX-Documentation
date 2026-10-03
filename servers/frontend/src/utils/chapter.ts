export function chapterNumber(slug: string): string {
  const match = slug.match(/^chapter-(\d+)/);
  return match ? match[1].padStart(2, "0") : "--";
}

export function chapterShortTitle(title: string): string {
  return title.replace(/^[^：:]+[：:]\s*/, "");
}
