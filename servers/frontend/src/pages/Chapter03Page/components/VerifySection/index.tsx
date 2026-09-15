import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const VerifySection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("verify.title")}</h2>
          <p>{t("verify.description")}</p>
          <ol>
            {tList(t, "verify.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
          </ol>
        </section>
  );
});

VerifySection.displayName = "VerifySection";
export default VerifySection;
