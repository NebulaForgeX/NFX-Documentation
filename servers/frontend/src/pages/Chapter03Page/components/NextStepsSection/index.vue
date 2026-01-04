<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.nextSteps.title') }}</h2>
    <p>{{ $t('chapter03.nextSteps.description') }}</p>
    <ol>
      <li v-for="(item, index) in $tm('chapter03.nextSteps.items')" :key="index" v-html="item"></li>
    </ol>
    <p v-html="$t('chapter03.nextSteps.conclusion')"></p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

