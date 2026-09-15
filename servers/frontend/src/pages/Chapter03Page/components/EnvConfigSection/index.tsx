import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const EnvConfigSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("envConfig.title")}</h2>

          <div>
            <h3>{t("envConfig.step1.title")}</h3>
            <p>{t("envConfig.step1.description")}</p>
            <pre><code>{t("envConfig.step1.command")}</code></pre>
            <p dangerouslySetInnerHTML={{ __html: t("envConfig.step1.important.0") }} />
            <ul>
              {tList(t, "envConfig.step1.important").slice(1).map((item, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("envConfig.step2.title")}</h3>
            <p>{t("envConfig.step2.description")}</p>
            {tList(t, "envConfig.step2.commands").map((cmd, index) => (
              <pre key={index}><code>{cmd}</code></pre>
            ))}
          </div>
        </section>
  );
});

EnvConfigSection.displayName = "EnvConfigSection";
export default EnvConfigSection;
