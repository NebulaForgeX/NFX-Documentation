import { memo } from "react";
import { useTranslation } from "react-i18next";


const CloneSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("clone.title")}</h2>
      <div>
        <h3>{t("clone.step1.title")}</h3>
        <p>{t("clone.step1.description")}</p>
        <pre>
          <code>{t("clone.step1.command")}</code>
        </pre>
      </div>
      <div>
        <h3>{t("clone.step2.title")}</h3>
        <p dangerouslySetInnerHTML={{ __html: t("clone.step2.description") }} />
        <pre>
          <code>{t("clone.step2.command")}</code>
        </pre>
        <p>{t("clone.step2.description2")}</p>
        <p>{t("clone.step2.note")}</p>
      </div>
      <div>
        <h3>{t("clone.step3.title")}</h3>
        <p>{t("clone.step3.description")}</p>
        <pre>
          <code>{t("clone.step3.command")}</code>
        </pre>
      </div>
    </section>
  );
});

CloneSection.displayName = "CloneSection";
export default CloneSection;
