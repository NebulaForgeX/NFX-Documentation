export type BookLocale = "zh" | "en";

export interface BookChapter {
  slug: string;
  title: {
    zh: string;
    en: string;
  };
}

export interface BooksManifest {
  chapters: BookChapter[];
}
