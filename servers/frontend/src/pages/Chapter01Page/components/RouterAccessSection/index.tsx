import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const RouterAccessSection = memo(() => {
  const { t } = useTranslation("chapter01");

  return (
      <div>
          <h3>{t("router.access.title")}</h3>
          <p>{t("router.access.description")}</p>
          <ul>
            {tList(t, "router.access.items").map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
          </ul>
          <img src={t("router.access.image")} alt={t("router.access.imageAlt")} />
        </div>
  );
});

RouterAccessSection.displayName = "RouterAccessSection";
export default RouterAccessSection;
