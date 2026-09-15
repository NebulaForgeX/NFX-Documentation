import { memo } from "react";
import { useTranslation } from "react-i18next";


import { tList } from "@/utils/i18nContent";

const SSHSection = memo(() => {
  const { t } = useTranslation("chapter02");

  return (
      <section>
          <h2>{t("ssh.title")}</h2>
          <p>{t("ssh.description")}</p>
          <img src={t("ssh.image")} alt={t("ssh.imageAlt")} />

          <div>
            <h3>{t("ssh.steps.title")}</h3>
            <ol>
              {tList(t, "ssh.steps.items").map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>

          <div>
            <h3>{t("ssh.security.title")}</h3>
            <ul>
              {tList(t, "ssh.security.items").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
  );
});

SSHSection.displayName = "SSHSection";
export default SSHSection;
