import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const NextStepsSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("nextSteps.title")}</h2>
          <p>{t("nextSteps.description")}</p>
          <ol>
            {tList(t, "nextSteps.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
          </ol>
          <p dangerouslySetInnerHTML={{ __html: t("nextSteps.conclusion") }} />
        </section>
  );
});

NextStepsSection.displayName = "NextStepsSection";
export default NextStepsSection;
