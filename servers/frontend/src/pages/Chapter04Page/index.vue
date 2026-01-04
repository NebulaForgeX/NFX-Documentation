<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <BackButton />
      <h1>{{ $t('chapter04.title') }}</h1>
    </div>
    <div :class="styles.content">
      <p :class="styles.intro" v-html="$t('chapter04.intro')"></p>

      <WhySection />
      <PrerequisitesSection />
      <CloneSection />
      <ConfigFilesSection />
      <DockerComposeSection />
      <CertificatesSection />
      <VerifyConfigSection />
      <StartServiceSection />
      <VerifyDeploymentSection />
      <AddNewSiteSection />
      <CommonOperationsSection />
      <DocsSection />
      <NextStepsSection />

      <!-- Next Chapter Button -->
      <div :class="styles.nextButtonContainer">
        <NextPageButton 
          v-if="$t('chapter04.nextChapterPath')"
          :to="`/${locale}/${$t('chapter04.nextChapterPath')}`"
          :text="$t('chapter04.nextChapterText')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BackButton, NextPageButton } from '@/components'
import styles from './styles.module.css'
import WhySection from './components/WhySection/index.vue'
import PrerequisitesSection from './components/PrerequisitesSection/index.vue'
import CloneSection from './components/CloneSection/index.vue'
import ConfigFilesSection from './components/ConfigFilesSection/index.vue'
import DockerComposeSection from './components/DockerComposeSection/index.vue'
import CertificatesSection from './components/CertificatesSection/index.vue'
import VerifyConfigSection from './components/VerifyConfigSection/index.vue'
import StartServiceSection from './components/StartServiceSection/index.vue'
import VerifyDeploymentSection from './components/VerifyDeploymentSection/index.vue'
import AddNewSiteSection from './components/AddNewSiteSection/index.vue'
import CommonOperationsSection from './components/CommonOperationsSection/index.vue'
import DocsSection from './components/DocsSection/index.vue'
import NextStepsSection from './components/NextStepsSection/index.vue'

const { locale } = useI18n()
</script>
