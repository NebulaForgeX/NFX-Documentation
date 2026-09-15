import { memo } from "react";
import { useTranslation } from "react-i18next";


const CreateDirsSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("createDirs.title")}</h2>
      <p>{t("createDirs.description")}</p>
      <p>{t("createDirs.description2")}</p>
      <p>{t("createDirs.description3")}</p>
      <pre>
        <code>{t("createDirs.command")}</code>
      </pre>
      <p>{t("createDirs.permissions")}</p>
    </section>
  );
});

CreateDirsSection.displayName = "CreateDirsSection";
export default CreateDirsSection;
