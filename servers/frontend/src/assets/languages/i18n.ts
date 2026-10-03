import type { LanguageEnum } from "nfx-ui/enums";

import { changeLanguage } from "nfx-ui/languages";

export const ChangeLanguage = (lng: LanguageEnum) => {
  changeLanguage(lng);
};
