<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.docs.title') }}</h2>
    <p v-html="$t('chapter03.docs.description')"></p>
    <ul>
      <li v-for="(item, index) in $tm('chapter03.docs.items')" :key="index">
        {{ item }}
      </li>
    </ul>
    <p>{{ $t('chapter03.docs.note') }}</p>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

