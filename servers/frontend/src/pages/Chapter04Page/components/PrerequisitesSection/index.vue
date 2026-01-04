<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.prerequisites.title') }}</h2>
    <p>{{ $t('chapter04.prerequisites.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.prerequisites.router.title') }}</h3>
      <p>{{ $t('chapter04.prerequisites.router.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.prerequisites.nas.title') }}</h3>
      <p>{{ $t('chapter04.prerequisites.nas.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.prerequisites.stack.title') }}</h3>
      <p>{{ $t('chapter04.prerequisites.stack.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.prerequisites.dns.title') }}</h3>
      <p>{{ $t('chapter04.prerequisites.dns.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

