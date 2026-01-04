<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.why.title') }}</h2>
    <p>{{ $t('chapter04.why.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.unifiedEntry.title') }}</h3>
      <p>{{ $t('chapter04.why.unifiedEntry.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.httpsSupport.title') }}</h3>
      <p>{{ $t('chapter04.why.httpsSupport.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.certificateUsage.title') }}</h3>
      <p v-html="$t('chapter04.why.certificateUsage.description')"></p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.multiSiteManagement.title') }}</h3>
      <p>{{ $t('chapter04.why.multiSiteManagement.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.easyDeployment.title') }}</h3>
      <p>{{ $t('chapter04.why.easyDeployment.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.why.productionOptimization.title') }}</h3>
      <p>{{ $t('chapter04.why.productionOptimization.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

