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
        <NextPageButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BackButton, NextPageButton } from '@/components'
import styles from './styles.module.css'
import PrerequisitesSection from './components/PrerequisitesSection/index.vue'
import RouterConfigSection from './components/RouterConfigSection/index.vue'
import SecurityStrategySection from './components/SecurityStrategySection/index.vue'
</script>
