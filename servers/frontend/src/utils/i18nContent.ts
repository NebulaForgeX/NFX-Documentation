import type { TFunction } from "i18next";

export function tList(t: TFunction, key: string): string[] {
  const value = t(key, { returnObjects: true });
  if (!Array.isArray(value)) return [];
  return value.map((item) => (typeof item === "string" ? item : String(item)));
}

export function tObjects<T>(t: TFunction, key: string): T[] {
  const value = t(key, { returnObjects: true });
  if (!Array.isArray(value)) return [];
  return value as T[];
}

export function tObject<T>(t: TFunction, key: string): T | undefined {
  const value = t(key, { returnObjects: true });
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as T;
  }
  return undefined;
}

export function chapterLocale(language: string): "zh" | "en" {
  return language.toLowerCase().startsWith("zh") ? "zh" : "en";
}
