import type { RouteKey as RouteKeyGeneric, RoutePath as RoutePathGeneric } from "nfx-ui/navigations";

import { createRouter, defineRouter } from "nfx-ui/navigations";

const routeMap = defineRouter({
  HOME: "/",
  REPO: "/repo",
  ABOUT: "/about",
  CHAPTER_01_ZH: "/zh/chapter-01-router-configuration",
  CHAPTER_02_ZH: "/zh/chapter-02-nas-setup",
  CHAPTER_03_ZH: "/zh/chapter-03-nfx-stack-deployment",
  CHAPTER_04_ZH: "/zh/chapter-04-nfx-edge-deployment",
  CHAPTER_05_ZH: "/zh/chapter-05-nfx-vault-deployment",
  CHAPTER_01_EN: "/en/chapter-01-router-configuration",
  CHAPTER_02_EN: "/en/chapter-02-nas-setup",
  CHAPTER_03_EN: "/en/chapter-03-nfx-stack-deployment",
  CHAPTER_04_EN: "/en/chapter-04-nfx-edge-deployment",
  CHAPTER_05_EN: "/en/chapter-05-nfx-vault-deployment",
});

const { ROUTES, matchRoute, isActiveRoute, getRouteByKey } = createRouter(routeMap);
type RouteKey = RouteKeyGeneric<typeof routeMap>;
type RoutePath = RoutePathGeneric<typeof routeMap>;

export { ROUTES, matchRoute, isActiveRoute, getRouteByKey, type RouteKey, type RoutePath };

export const CHAPTER_SLUGS = [
  "chapter-01-router-configuration",
  "chapter-02-nas-setup",
  "chapter-03-nfx-stack-deployment",
  "chapter-04-nfx-edge-deployment",
  "chapter-05-nfx-vault-deployment",
] as const;

export type ChapterSlug = (typeof CHAPTER_SLUGS)[number];

export function chapterPath(locale: "zh" | "en", slug: string): string {
  return `/${locale}/${slug}`;
}
