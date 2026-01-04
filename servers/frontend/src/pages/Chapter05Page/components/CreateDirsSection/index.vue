<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.createDirs.title') }}</h2>
    <p>{{ $t('chapter05.createDirs.description') }}</p>
    <p>{{ $t('chapter05.createDirs.description2') }}</p>
    <p>{{ $t('chapter05.createDirs.description3') }}</p>
    <pre><code>{{ $t('chapter05.createDirs.command') }}</code></pre>
    <p>{{ $t('chapter05.createDirs.permissions') }}</p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

