<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.docs.title') }}</h2>
    <p v-html="$t('chapter05.docs.description')"></p>
    <p v-html="$t('chapter05.docs.description2')"></p>
    <p v-html="$t('chapter05.docs.description3')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

