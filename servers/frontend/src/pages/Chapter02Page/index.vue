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
        <NextPageButton />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BackButton, NextPageButton } from '@/components'
import styles from './styles.module.css'
import WebCenterSection from './components/WebCenterSection/index.vue'
import SSHSection from './components/SSHSection/index.vue'
import ApplicationsSection from './components/ApplicationsSection/index.vue'
import BashConfigSection from './components/BashConfigSection/index.vue'
import SSHClientsSection from './components/SSHClientsSection/index.vue'
import ChecklistSection from './components/ChecklistSection/index.vue'
</script>
