<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.why.title') }}</h2>
    <p>{{ $t('chapter05.why.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.unifiedPlatform.title') }}</h3>
      <p>{{ $t('chapter05.why.unifiedPlatform.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.realtimeMonitoring.title') }}</h3>
      <p>{{ $t('chapter05.why.realtimeMonitoring.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.exportFunction.title') }}</h3>
      <p>{{ $t('chapter05.why.exportFunction.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.modernWebInterface.title') }}</h3>
      <p>{{ $t('chapter05.why.modernWebInterface.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.architecture.title') }}</h3>
      <p>{{ $t('chapter05.why.architecture.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.why.automation.title') }}</h3>
      <p>{{ $t('chapter05.why.automation.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

