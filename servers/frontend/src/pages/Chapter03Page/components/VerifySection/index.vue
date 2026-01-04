<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.verify.title') }}</h2>
    <p>{{ $t('chapter03.verify.description') }}</p>
    <ol>
      <li v-for="(item, index) in $tm('chapter03.verify.items')" :key="index" v-html="item"></li>
    </ol>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

