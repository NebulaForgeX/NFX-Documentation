<template>
  <div :class="styles.subsection">
    <h3>{{ $t('chapter01.router.access.title') }}</h3>
    <p>{{ $t('chapter01.router.access.description') }}</p>
    <ul>
      <li v-for="(item, index) in $tm('chapter01.router.access.items')" :key="index" v-html="item"></li>
    </ul>
    <img :src="$t('chapter01.router.access.image')" :alt="$t('chapter01.router.access.imageAlt')" :class="styles.image" />
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

