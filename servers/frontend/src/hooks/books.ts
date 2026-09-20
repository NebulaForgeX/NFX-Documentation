import { useUnifiedQuery } from "nfx-ui/hooks";

import { fetchBooksManifest, fetchChapterMarkdown } from "@/books/api";
import type { BookLocale } from "@/books/types";

export function useBooksManifest() {
  return useUnifiedQuery(() => fetchBooksManifest(), ["books", "manifest"]);
}

export function useChapterMarkdown(locale: BookLocale, slug: string, enabled: boolean) {
  return useUnifiedQuery(
    () => fetchChapterMarkdown(locale, slug),
    ["books", "chapter", locale, slug],
    undefined,
    { enabled },
  );
}
