<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.password.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.password.strong.title') }}</h3>
      <p>{{ $t('chapter03.password.strong.description') }}</p>
      <ul>
        <li v-for="(item, index) in $tm('chapter03.password.strong.items')" :key="index" v-html="item"></li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.password.management.title') }}</h3>
      <ul>
        <li v-for="(item, index) in $tm('chapter03.password.management.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

