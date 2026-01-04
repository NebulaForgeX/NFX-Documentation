<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.startService.title') }}</h2>
    <p>{{ $t('chapter05.startService.description') }}</p>
    <pre><code>{{ $t('chapter05.startService.command') }}</code></pre>
    <p>{{ $t('chapter05.startService.description2') }}</p>
    <p>{{ $t('chapter05.startService.description3') }}</p>
    <p>{{ $t('chapter05.startService.description4') }}</p>
    <p>{{ $t('chapter05.startService.description5') }}</p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

