<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.otherConfig.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.otherConfig.kafka.title') }}</h3>
      <p v-html="$t('chapter03.otherConfig.kafka.description')"></p>
      <ul>
        <li v-for="(item, index) in $tm('chapter03.otherConfig.kafka.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

