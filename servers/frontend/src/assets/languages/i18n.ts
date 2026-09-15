import { changeLanguage } from "nfx-ui/languages";
import type { LanguageEnum } from "nfx-ui/enums";

export const ChangeLanguage = (lng: LanguageEnum) => {
  changeLanguage(lng);
};
