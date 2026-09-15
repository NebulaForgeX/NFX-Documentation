import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const DocsSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("docs.title")}</h2>
          <p dangerouslySetInnerHTML={{ __html: t("docs.description") }} />
          <ul>
            {tList(t, "docs.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
          <p>{t("docs.note")}</p>
        </section>
  );
});

DocsSection.displayName = "DocsSection";
export default DocsSection;
