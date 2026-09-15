import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const WhySection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("why.title")}</h2>
          <p>{t("why.description")}</p>
          <ul>
            {tList(t, "why.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
          </ul>
        </section>
  );
});

WhySection.displayName = "WhySection";
export default WhySection;
