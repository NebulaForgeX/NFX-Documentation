<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <BackButton />
      <h1>{{ $t('chapter05.title') }}</h1>
    </div>
    <div :class="styles.content">
      <p :class="styles.intro" v-html="$t('chapter05.intro')"></p>

      <WhySection />
      <PrerequisitesSection />
      <CloneSection />
      <CreateDirsSection />
      <EnvConfigSection />
      <DockerNetworkSection />
      <VerifyConfigSection />
      <StartServiceSection />
      <VerifyDeploymentSection />
      <IntegrateEdgeSection />
      <CommonOperationsSection />
      <DocsSection />
      <NextStepsSection />


    </div>
  </div>
</template>

<script setup lang="ts">
import { BackButton } from '@/components'
import styles from './styles.module.css'
import WhySection from './components/WhySection/index.vue'
import PrerequisitesSection from './components/PrerequisitesSection/index.vue'
import CloneSection from './components/CloneSection/index.vue'
import CreateDirsSection from './components/CreateDirsSection/index.vue'
import EnvConfigSection from './components/EnvConfigSection/index.vue'
import DockerNetworkSection from './components/DockerNetworkSection/index.vue'
import VerifyConfigSection from './components/VerifyConfigSection/index.vue'
import StartServiceSection from './components/StartServiceSection/index.vue'
import VerifyDeploymentSection from './components/VerifyDeploymentSection/index.vue'
import IntegrateEdgeSection from './components/IntegrateEdgeSection/index.vue'
import CommonOperationsSection from './components/CommonOperationsSection/index.vue'
import DocsSection from './components/DocsSection/index.vue'
import NextStepsSection from './components/NextStepsSection/index.vue'
</script>
