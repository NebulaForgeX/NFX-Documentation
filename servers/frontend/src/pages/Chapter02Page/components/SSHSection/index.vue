<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.ssh.title') }}</h2>
    <p>{{ $t('chapter02.ssh.description') }}</p>
    <img :src="$t('chapter02.ssh.image')" :alt="$t('chapter02.ssh.imageAlt')" :class="styles.image" />

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.ssh.steps.title') }}</h3>
      <ol>
        <li v-for="(step, index) in $tm('chapter02.ssh.steps.items')" :key="index">
          {{ step }}
        </li>
      </ol>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.ssh.security.title') }}</h3>
      <ul>
        <li v-for="(item, index) in $tm('chapter02.ssh.security.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

