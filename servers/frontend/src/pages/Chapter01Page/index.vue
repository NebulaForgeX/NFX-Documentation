<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <BackButton />
      <h1>{{ $t('chapter01.title') }}</h1>
    </div>
    <div :class="styles.content">
      <p :class="styles.intro">{{ $t('chapter01.intro') }}</p>

      <PrerequisitesSection />
      <RouterConfigSection />
      <SecurityStrategySection />

      <!-- Conclusion -->
      <section :class="styles.conclusionSection">
        <p v-html="$t('chapter01.conclusion')"></p>
      </section>

      <!-- Next Chapter Button -->
      <div :class="styles.nextButtonContainer">
        <NextPageButton 
          v-if="$t('chapter01.nextChapterPath')"
          :to="`/${locale}/${$t('chapter01.nextChapterPath')}`"
          :text="$t('chapter01.nextChapterText')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BackButton, NextPageButton } from '@/components'
import styles from './styles.module.css'
import PrerequisitesSection from './components/PrerequisitesSection/index.vue'
import RouterConfigSection from './components/RouterConfigSection/index.vue'
import SecurityStrategySection from './components/SecurityStrategySection/index.vue'

const { locale } = useI18n()
</script>
