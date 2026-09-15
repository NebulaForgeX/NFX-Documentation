import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const ChecklistSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("checklist.title")}</h2>
          <p>{t("checklist.description")}</p>
          <ul>
            {tList(t, "checklist.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
          </ul>
          <p dangerouslySetInnerHTML={{ __html: t("checklist.conclusion") }} />
        </section>
  );
});

ChecklistSection.displayName = "ChecklistSection";
export default ChecklistSection;
