<template>
  <div :class="styles.container">
    <div :class="styles.header">
      <BackButton />
      <h1>{{ $t('chapter03.title') }}</h1>
    </div>
    <div :class="styles.content">
      <p :class="styles.intro" v-html="$t('chapter03.intro')"></p>

      <WhySection />
      <CloneSection />
      <EnvConfigSection />
      <IPPortSection />
      <DataPathSection />
      <PasswordSection />
      <OtherConfigSection />
      <VerifySection />
      <DocsSection />
      <NextStepsSection />

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
import WhySection from './components/WhySection/index.vue'
import CloneSection from './components/CloneSection/index.vue'
import EnvConfigSection from './components/EnvConfigSection/index.vue'
import IPPortSection from './components/IPPortSection/index.vue'
import DataPathSection from './components/DataPathSection/index.vue'
import PasswordSection from './components/PasswordSection/index.vue'
import OtherConfigSection from './components/OtherConfigSection/index.vue'
import VerifySection from './components/VerifySection/index.vue'
import DocsSection from './components/DocsSection/index.vue'
import NextStepsSection from './components/NextStepsSection/index.vue'
</script>
