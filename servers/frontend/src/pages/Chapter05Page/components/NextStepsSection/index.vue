<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.nextSteps.title') }}</h2>
    <p>{{ $t('chapter05.nextSteps.description') }}</p>
    <p>{{ $t('chapter05.nextSteps.description2') }}</p>
    <p v-html="$t('chapter05.nextSteps.conclusion')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

