import en from "./en";
import zh from "./zh";

const NAME_SPACES_MAP = {
  common: "common",
  repo: "repo",
  about: "about",
  notFound: "notFound",
} as const;

export function getBuiltinI18nBundles() {
  return {
    RESOURCES: {
      en: { ...en },
      zh: { ...zh },
    },
    NAME_SPACES_MAP: { ...NAME_SPACES_MAP },
    NAME_SPACES: Object.values(NAME_SPACES_MAP),
  };
}

export { NAME_SPACES_MAP };
