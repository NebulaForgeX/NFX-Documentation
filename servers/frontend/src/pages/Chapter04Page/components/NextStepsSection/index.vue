<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.nextSteps.title') }}</h2>
    <p>{{ $t('chapter04.nextSteps.description') }}</p>
    <p>{{ $t('chapter04.nextSteps.description2') }}</p>
    <p>{{ $t('chapter04.nextSteps.description3') }}</p>
    <p>{{ $t('chapter04.nextSteps.description4') }}</p>
    <p v-html="$t('chapter04.nextSteps.conclusion')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

