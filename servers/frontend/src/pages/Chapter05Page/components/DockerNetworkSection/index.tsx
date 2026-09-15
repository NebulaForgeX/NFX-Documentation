import { memo } from "react";
import { useTranslation } from "react-i18next";


const DockerNetworkSection = memo(() => {
  const { t } = useTranslation("chapter05");

  return (
    <section>
      <h2>{t("dockerNetwork.title")}</h2>
      <p>{t("dockerNetwork.description")}</p>
      <p>{t("dockerNetwork.description2")}</p>
      <pre>
        <code>{t("dockerNetwork.command")}</code>
      </pre>
      <p>{t("dockerNetwork.description3")}</p>
    </section>
  );
});

DockerNetworkSection.displayName = "DockerNetworkSection";
export default DockerNetworkSection;
