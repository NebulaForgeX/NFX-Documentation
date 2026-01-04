<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.docs.title') }}</h2>
    <p v-html="$t('chapter04.docs.description')"></p>
    <p v-html="$t('chapter04.docs.description2')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

