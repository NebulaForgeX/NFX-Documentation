import { memo } from "react";
import { useTranslation } from "react-i18next";


const StartServiceSection = memo(() => {
  const { t } = useTranslation("chapter04");

  return (
    <section>
      <h2>{t("startService.title")}</h2>
      <p>{t("startService.description")}</p>
      <pre>
        <code>{t("startService.command")}</code>
      </pre>
      <p>{t("startService.description2")}</p>
    </section>
  );
});

StartServiceSection.displayName = "StartServiceSection";
export default StartServiceSection;
