import { memo } from "react";
import { useTranslation } from "react-i18next";

import { tList, tObject } from "@/utils/i18nContent";


const CloneSection = memo(() => {
  const { t } = useTranslation("chapter04");
  const optional = tObject(t, "clone.step2.optional");

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
        {optional ? (
          <div>
            <h4>{t("clone.step2.optional.title")}</h4>
            <p>{t("clone.step2.optional.description")}</p>
            {tList(t, "clone.step2.optional.commands").map((cmd, index) => (
              <pre key={index}>
                <code>{cmd}</code>
              </pre>
            ))}
          </div>
        ) : null}
      </div>
      <div>
        <h3>{t("clone.step3.title")}</h3>
        <pre>
          <code>{t("clone.step3.command")}</code>
        </pre>
      </div>
    </section>
  );
});

CloneSection.displayName = "CloneSection";
export default CloneSection;
