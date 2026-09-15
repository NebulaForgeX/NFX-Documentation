import { memo } from "react";
import { useTranslation } from "react-i18next";


const DocsSection = memo(() => {
  const { t } = useTranslation("chapter04");

  return (
    <section>
      <h2>{t("docs.title")}</h2>
      <p dangerouslySetInnerHTML={{ __html: t("docs.description") }} />
      <p dangerouslySetInnerHTML={{ __html: t("docs.description2") }} />
    </section>
  );
});

DocsSection.displayName = "DocsSection";
export default DocsSection;
