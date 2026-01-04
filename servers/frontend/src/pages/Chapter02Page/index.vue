<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <BackButton />
      <h1>{{ $t('chapter02.title') }}</h1>
    </div>
    <div :class="styles.content">
      <p :class="styles.intro">{{ $t('chapter02.intro') }}</p>

      <WebCenterSection />
      <SSHSection />
      <ApplicationsSection />
      <BashConfigSection />
      <SSHClientsSection />
      <ChecklistSection />

      <!-- Next Chapter Button -->
      <div :class="styles.nextButtonContainer">
        <NextPageButton 
          v-if="$t('chapter02.nextChapterPath')"
          :to="`/${locale}/${$t('chapter02.nextChapterPath')}`"
          :text="$t('chapter02.nextChapterText')"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { BackButton, NextPageButton } from '@/components'
import styles from './styles.module.css'
import WebCenterSection from './components/WebCenterSection/index.vue'
import SSHSection from './components/SSHSection/index.vue'
import ApplicationsSection from './components/ApplicationsSection/index.vue'
import BashConfigSection from './components/BashConfigSection/index.vue'
import SSHClientsSection from './components/SSHClientsSection/index.vue'
import ChecklistSection from './components/ChecklistSection/index.vue'

const { locale } = useI18n()
</script>
