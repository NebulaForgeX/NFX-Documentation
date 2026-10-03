import { memo } from "react";
import { Container, Flex, Grid, Heading, Section, Text } from "@radix-ui/themes";
import { useTranslation } from "react-i18next";

import { PageIntro } from "@/components";

import styles from "./s.module.css";

const REPOS = [
  { key: "nfxStack", name: "NFX-Stack", url: "https://github.com/NebulaForgeX/NFX-Stack", stack: "Docker Compose" },
  { key: "nfxEdge", name: "NFX-Edge", url: "https://github.com/NebulaForgeX/NFX-Edge", stack: "Traefik / Go / React" },
  { key: "nfxIdentity", name: "NFX-Identity", url: "https://github.com/NebulaForgeX/NFX-Identity", stack: "Go / React" },
  { key: "nfxUi", name: "NFX-UI", url: "https://github.com/NebulaForgeX/NFX-UI", stack: "React / TypeScript" },
  { key: "nfxNews", name: "NFX-News", url: "https://github.com/NebulaForgeX/NFX-News", stack: "Go / React" },
  { key: "nfxStorages", name: "NFX-Storages", url: "https://github.com/NebulaForgeX/NFX-Storages", stack: "Go / React" },
  {
    key: "nfxDocumentation",
    name: "NFX-Documentation",
    url: "https://github.com/NebulaForgeX/NFX-Documentation",
    stack: "React / TypeScript",
  },
] as const;

const RepoPage = memo(() => {
  const { t } = useTranslation("repo");

  return (
    <Section size="2" py="6" className={styles.page}>
      <Container px="5">
        <Flex direction="column" gap="6">
          <PageIntro title={t("title")}>
            <Text as="p" size="3" color="gray" className={styles.lead}>
              {t("description")}
            </Text>
          </PageIntro>
          <Grid columns={{ initial: "1", sm: "2" }} gap="3">
            {REPOS.map((repo) => (
              <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
                <Section size="1" py="4" className={styles.face}>
                  <Container px="4">
                    <Flex direction="column" align="start" gap="2">
                      <Text size="1" color="gray" className={styles.stack}>
                        {repo.stack}
                      </Text>
                      <Heading size="5" className={styles.name}>
                        {repo.name}
                      </Heading>
                      <Text as="p" size="2" color="gray">
                        {t(`${repo.key}.description`)}
                      </Text>
                    </Flex>
                  </Container>
                </Section>
              </a>
            ))}
          </Grid>
        </Flex>
      </Container>
    </Section>
  );
});

RepoPage.displayName = "RepoPage";
export default RepoPage;
