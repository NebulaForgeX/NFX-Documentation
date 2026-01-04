<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.startService.title') }}</h2>
    <p>{{ $t('chapter04.startService.description') }}</p>
    <pre><code>{{ $t('chapter04.startService.command') }}</code></pre>
    <p>{{ $t('chapter04.startService.description2') }}</p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

