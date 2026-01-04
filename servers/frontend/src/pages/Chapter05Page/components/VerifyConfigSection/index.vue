<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.verifyConfig.title') }}</h2>
    <p>{{ $t('chapter05.verifyConfig.description') }}</p>

    <ul>
      <li v-for="(check, index) in $tm('chapter05.verifyConfig.checks')" :key="index" v-html="check"></li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

