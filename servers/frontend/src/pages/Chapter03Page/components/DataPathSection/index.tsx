import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const DataPathSection = memo(() => {
  const { t } = useTranslation("chapter03");

  return (
      <section>
          <h2>{t("dataPath.title")}</h2>
          <p>{t("dataPath.description")}</p>

          <div>
            <h3>{t("dataPath.structure.title")}</h3>
            <p>{t("dataPath.structure.description")}</p>
            <pre><code>{t("dataPath.structure.tree")}</code></pre>
            <p dangerouslySetInnerHTML={{ __html: t("dataPath.structure.note") }} />
          </div>

          <div>
            <h3>{t("dataPath.config.title")}</h3>
            <p>{t("dataPath.config.description")}</p>
            <pre><code>{t("dataPath.config.template")}</code></pre>
            <p dangerouslySetInnerHTML={{ __html: t("dataPath.config.example") }} />
            <pre><code>{t("dataPath.config.example")}</code></pre>
            <p dangerouslySetInnerHTML={{ __html: t("dataPath.config.renameNote") }} />
          </div>

          <div>
            <h3>{t("dataPath.custom.title")}</h3>
            <p>{t("dataPath.custom.description")}</p>
            <ul>
              {tList(t, "dataPath.custom.examples").map((example, index) => (
                <li key={index}>{example}</li>
              ))}
            </ul>
            <ul>
              {tList(t, "dataPath.custom.notes").map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3>{t("dataPath.create.title")}</h3>
            <p>{t("dataPath.create.description")}</p>
            <pre><code>{t("dataPath.create.command")}</code></pre>
            <p>{t("dataPath.create.example")}</p>
            <pre><code>{t("dataPath.create.example")}</code></pre>
          </div>
        </section>
  );
});

DataPathSection.displayName = "DataPathSection";
export default DataPathSection;
