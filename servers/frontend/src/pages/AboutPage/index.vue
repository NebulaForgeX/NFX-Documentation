<template>
  <div :class="styles.container">
    <header :class="styles.header">
      <h1>{{ $t('about.title') }}</h1>
      <p>{{ $t('about.subtitle') }}</p>
    </header>

    <section :class="styles.section">
      <h2>{{ $t('about.what.title') }}</h2>
      <p v-html="$t('about.what.description')"></p>
    </section>

    <section :class="styles.section">
      <h2>{{ $t('about.ecosystem.title') }}</h2>
      <p v-html="$t('about.ecosystem.description')"></p>
      <ul>
        <li v-for="(item, index) in $tm('about.ecosystem.items')" :key="index" v-html="item"></li>
      </ul>
    </section>

    <section :class="styles.section">
      <h2>{{ $t('about.contribute.title') }}</h2>
      <p v-html="$t('about.contribute.description')"></p>
    </section>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

