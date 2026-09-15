import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const CloneSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("clone.title")}</h2>
          <p>{t("clone.description")}</p>

          <div>
            <h3>{t("clone.step1.title")}</h3>
            <p>{t("clone.step1.description")}</p>
            <pre><code>{t("clone.step1.command")}</code></pre>
            <ul>
              {tList(t, "clone.step1.notes").map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("clone.step2.title")}</h3>
            <p dangerouslySetInnerHTML={{ __html: t("clone.step2.description") }} />
            <pre><code>{t("clone.step2.command")}</code></pre>
            <ul>
              {tList(t, "clone.step2.notes").map((note, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: note }} />
              ))}
            </ul>
            <div>
              <h4>{t("clone.step2.optional.title")}</h4>
              <p>{t("clone.step2.optional.description")}</p>
              {tList(t, "clone.step2.optional.commands").map((cmd, index) => (
              <pre key={index}><code>{cmd}</code></pre>
            ))}
            </div>
          </div>

          <div>
            <h3>{t("clone.step3.title")}</h3>
            <pre><code>{t("clone.step3.command")}</code></pre>
          </div>
        </section>
  );
});

CloneSection.displayName = "CloneSection";
export default CloneSection;
