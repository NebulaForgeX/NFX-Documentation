<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.integrateEdge.title') }}</h2>
    <p>{{ $t('chapter05.integrateEdge.description') }}</p>

    <div :class="styles.subsection">
      <h4>{{ $t('chapter05.integrateEdge.step1.title') }}</h4>
      <p>{{ $t('chapter05.integrateEdge.step1.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h4>{{ $t('chapter05.integrateEdge.step2.title') }}</h4>
      <p>{{ $t('chapter05.integrateEdge.step2.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h4>{{ $t('chapter05.integrateEdge.step3.title') }}</h4>
      <p>{{ $t('chapter05.integrateEdge.step3.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h4>{{ $t('chapter05.integrateEdge.step4.title') }}</h4>
      <p>{{ $t('chapter05.integrateEdge.step4.description') }}</p>
    </div>

    <p v-html="$t('chapter05.integrateEdge.conclusion')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

