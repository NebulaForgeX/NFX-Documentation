import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Card, Container, Flex, Grid, Heading, Text } from "nfx-ui/components";
import { PageFrame } from "nfx-ui/layouts";

const RepoPage = memo(() => {
  const { t } = useTranslation("repo");

  const repos = [
    {
      name: "NFX-Stack",
      description: t("nfxStack.description"),
      url: "https://github.com/NebulaForgeX/NFX-Stack",
      language: "Docker Compose",
    },
    {
      name: "NFX-Edge",
      description: t("nfxEdge.description"),
      url: "https://github.com/NebulaForgeX/NFX-Edge",
      language: "Docker Compose",
    },
    {
      name: "NFX-Vault",
      description: t("nfxVault.description"),
      url: "https://github.com/NebulaForgeX/NFX-Vault",
      language: "Python / React",
    },
    {
      name: "NFX-Documentation",
      description: t("nfxDocumentation.description"),
      url: "https://github.com/NebulaForgeX/NFX-Documentation",
      language: "React / TypeScript",
    },
    {
      name: "NFX-UI",
      description: t("nfxUi.description"),
      url: "https://github.com/NebulaForgeX/NFX-UI",
      language: "React / TypeScript",
    },
    {
      name: "NFX-News",
      description: t("nfxNews.description"),
      url: "https://github.com/NebulaForgeX/NFX-News",
      language: "Python / TypeScript",
    },
    {
      name: "NFX-Identity",
      description: t("nfxIdentity.description"),
      url: "https://github.com/NebulaForgeX/NFX-Identity",
      language: "Go",
    },
  ];

  return (
    <PageFrame>
      <Container size="3" py="6">
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="2">
            <Heading size="8">{t("title")}</Heading>
            <Text as="p" size="4" color="gray">
              {t("description")}
            </Text>
          </Flex>
          <Grid columns={{ initial: "1", sm: "2" }} gap="4">
            {repos.map((repo) => (
              <Card asChild key={repo.name}>
                <a href={repo.url} target="_blank" rel="noopener noreferrer">
                  <Flex direction="column" gap="2">
                    <Heading size="4">{repo.name}</Heading>
                    <Text as="p" size="2" color="gray">
                      {repo.description}
                    </Text>
                    <Text size="1" color="gray">
                      {repo.language}
                    </Text>
                  </Flex>
                </a>
              </Card>
            ))}
          </Grid>
        </Flex>
      </Container>
    </PageFrame>
  );
});

RepoPage.displayName = "RepoPage";
export default RepoPage;
