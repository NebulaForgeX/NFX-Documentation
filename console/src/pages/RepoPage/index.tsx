import type { AnimatedIconComponent } from "nfx-ui/icons";

import { memo } from "react";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import clsx from "clsx";
import {
  AnimatedIcon,
  BookIcon,
  ExternalLinkIcon,
  LayersIcon,
  LockIcon,
  PaintIcon,
  RouterIcon,
  SatelliteDishIcon,
  Stack3Icon,
} from "nfx-ui/icons";
import { useTranslation } from "react-i18next";

import { PageIntro, Panel, PortRuler } from "@/components";
import { blockRange, PORT_BLOCKS } from "@/constants";
import { PageFrame } from "@/layouts";

import styles from "./s.module.css";

type Repo = {
  key: string;
  name: string;
  stack: string;
  block?: string;
  icon: AnimatedIconComponent;
  span: "wide" | "narrow" | "third" | "half";
};

const REPOS: Repo[] = [
  { key: "nfxStack", name: "NFX-Stack", stack: "Docker Compose", block: "stack", icon: Stack3Icon, span: "wide" },
  { key: "nfxEdge", name: "NFX-Edge", stack: "Traefik · Go · React", block: "edge", icon: RouterIcon, span: "narrow" },
  { key: "nfxIdentity", name: "NFX-Identity", stack: "Go · React", block: "identity", icon: LockIcon, span: "third" },
  { key: "nfxUi", name: "NFX-UI", stack: "React · TypeScript", icon: PaintIcon, span: "third" },
  { key: "nfxNews", name: "NFX-News", stack: "Go · React", block: "news", icon: SatelliteDishIcon, span: "third" },
  { key: "nfxStorages", name: "NFX-Storages", stack: "Go · React", block: "storages", icon: LayersIcon, span: "half" },
  {
    key: "nfxDocumentation",
    name: "NFX-Documentation",
    stack: "React · TypeScript",
    block: "documentation",
    icon: BookIcon,
    span: "half",
  },
];

const RepoPage = memo(() => {
  const { t } = useTranslation("repo");

  return (
    <PageFrame>
      <PageIntro eyebrow={t("eyebrow", { count: REPOS.length })} title={t("title")} lead={t("description")} />
      <Grid columns={{ initial: "1", sm: "2", lg: "6" }} gap="5">
        {REPOS.map((repo) => {
          const block = PORT_BLOCKS.find((item) => item.id === repo.block);
          return (
            <Flex key={repo.key} asChild minWidth="0">
              <a
                href={`https://github.com/NebulaForgeX/${repo.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx(styles.card, styles[repo.span])}
                data-reveal
              >
                <Panel py="5" px="5" interactive reveal={false} className={styles.panel}>
                  <Flex direction="column" gap="4" height="100%" justify="between">
                    <Flex direction="column" gap="3">
                      <Flex align="center" justify="between" gap="3">
                        <Flex align="center" justify="center" className={styles.icon}>
                          <AnimatedIcon icon={repo.icon} size={20} />
                        </Flex>
                        <Text as="span" size="1" className={styles.stack}>
                          {repo.stack}
                        </Text>
                      </Flex>
                      <Heading as="h2" size={repo.span === "wide" ? "7" : "5"} className={styles.name}>
                        {repo.name}
                      </Heading>
                      <Text as="p" size="2" color="gray" className={styles.description}>
                        {t(`${repo.key}.description`)}
                      </Text>
                    </Flex>
                    <Flex direction="column" gap="2">
                      {block ? (
                        <>
                          <Flex justify="between" gap="3">
                            <Text as="span" size="1" className={styles.mono}>
                              {blockRange(block)}
                            </Text>
                            <Flex align="center" gap="1" className={styles.open}>
                              <Text as="span" size="1">
                                {t("open")}
                              </Text>
                              <AnimatedIcon icon={ExternalLinkIcon} size={12} />
                            </Flex>
                          </Flex>
                          <PortRuler block={block} />
                        </>
                      ) : (
                        <Flex justify="between" gap="3">
                          <Text as="span" size="1" className={styles.mono}>
                            {t("noPorts")}
                          </Text>
                          <Flex align="center" gap="1" className={styles.open}>
                            <Text as="span" size="1">
                              {t("open")}
                            </Text>
                            <AnimatedIcon icon={ExternalLinkIcon} size={12} />
                          </Flex>
                        </Flex>
                      )}
                    </Flex>
                  </Flex>
                </Panel>
              </a>
            </Flex>
          );
        })}
      </Grid>
    </PageFrame>
  );
});

RepoPage.displayName = "RepoPage";
export default RepoPage;
