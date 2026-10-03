import en from "./en";
import fr from "./fr";
import zh from "./zh";

const NAME_SPACES_MAP = {
  language: "language",
  layout: "layout",
  preference: "preference",
  theme: "theme",
  home: "home",
  chapter: "chapter",
  architecture: "architecture",
  repo: "repo",
  about: "about",
  notFound: "notFound",
} as const;

export function getBuiltinI18nBundles() {
  return {
    RESOURCES: {
      en: { ...en },
      zh: { ...zh },
      fr: { ...fr },
    },
    NAME_SPACES_MAP: { ...NAME_SPACES_MAP },
    NAME_SPACES: Object.values(NAME_SPACES_MAP),
  };
}

export { NAME_SPACES_MAP };
