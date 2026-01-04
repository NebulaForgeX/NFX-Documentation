<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.checklist.title') }}</h2>
    <p>{{ $t('chapter02.checklist.description') }}</p>
    <ul :class="styles.checklist">
      <li v-for="(item, index) in $tm('chapter02.checklist.items')" :key="index" v-html="item"></li>
    </ul>
    <p v-html="$t('chapter02.checklist.conclusion')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

