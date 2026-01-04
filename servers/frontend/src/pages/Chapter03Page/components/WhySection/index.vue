<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.why.title') }}</h2>
    <p>{{ $t('chapter03.why.description') }}</p>
    <ul>
      <li v-for="(item, index) in $tm('chapter03.why.items')" :key="index" v-html="item"></li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

