<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.webCenter.title') }}</h2>
    <p v-html="$t('chapter02.webCenter.important')"></p>
    <img :src="$t('chapter02.webCenter.image')" :alt="$t('chapter02.webCenter.imageAlt')" :class="styles.image" />

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.webCenter.why.title') }}</h3>
      <p>{{ $t('chapter02.webCenter.why.description') }}</p>
      <ul>
        <li v-for="(port, index) in $tm('chapter02.webCenter.why.ports')" :key="index" v-html="port"></li>
      </ul>
      <p v-html="$t('chapter02.webCenter.why.conflict')"></p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.webCenter.steps.title') }}</h3>
      <ol>
        <li v-for="(step, index) in $tm('chapter02.webCenter.steps.items')" :key="index">
          {{ step }}
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

