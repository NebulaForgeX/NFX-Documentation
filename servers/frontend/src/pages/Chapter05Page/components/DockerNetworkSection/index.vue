<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.dockerNetwork.title') }}</h2>
    <p>{{ $t('chapter05.dockerNetwork.description') }}</p>
    <p>{{ $t('chapter05.dockerNetwork.description2') }}</p>
    <pre><code>{{ $t('chapter05.dockerNetwork.command') }}</code></pre>
    <p>{{ $t('chapter05.dockerNetwork.description3') }}</p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

