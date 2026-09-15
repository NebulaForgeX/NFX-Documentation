import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const PasswordSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("password.title")}</h2>

          <div>
            <h3>{t("password.strong.title")}</h3>
            <p>{t("password.strong.description")}</p>
            <ul>
              {tList(t, "password.strong.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("password.management.title")}</h3>
            <ul>
              {tList(t, "password.management.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
  );
});

PasswordSection.displayName = "PasswordSection";
export default PasswordSection;
