import type { BookLocale } from "@/books/types";

export const ROUTES = {
  HOME: "/",
  REPO: "/repo",
  ABOUT: "/about",
  NOT_FOUND: "/404",
} as const;

export function chapterPath(locale: BookLocale, slug: string): string {
  return `/${locale}/${slug}`;
}
