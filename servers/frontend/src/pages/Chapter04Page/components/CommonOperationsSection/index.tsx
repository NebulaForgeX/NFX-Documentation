import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList } from "@/utils/i18nContent";


const CommonOperationsSection = memo(() => {
  const { t } = useTranslation("chapter04");

  return (
    <section>
      <h2>{t("commonOperations.title")}</h2>
      <div>
        <h3>{t("commonOperations.restart.title")}</h3>
        {tList(t, "commonOperations.restart.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
      </div>
      <div>
        <h3>{t("commonOperations.stop.title")}</h3>
        {tList(t, "commonOperations.stop.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
      </div>
      <div>
        <h3>{t("commonOperations.update.title")}</h3>
        {tList(t, "commonOperations.update.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
      </div>
      <div>
        <h3>{t("commonOperations.updateContent.title")}</h3>
        <p>{t("commonOperations.updateContent.description")}</p>
        <pre>
          <code>{t("commonOperations.updateContent.command")}</code>
        </pre>
      </div>
      <div>
        <h3>{t("commonOperations.viewStatus.title")}</h3>
        {tList(t, "commonOperations.viewStatus.commands").map((cmd, index) => (
          <pre key={index}>
            <code>{cmd}</code>
          </pre>
        ))}
      </div>
    </section>
  );
});

CommonOperationsSection.displayName = "CommonOperationsSection";
export default CommonOperationsSection;
