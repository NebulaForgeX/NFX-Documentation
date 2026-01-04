<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.prerequisites.title') }}</h2>
    <p>{{ $t('chapter05.prerequisites.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.prerequisites.router.title') }}</h3>
      <p>{{ $t('chapter05.prerequisites.router.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.prerequisites.nas.title') }}</h3>
      <p>{{ $t('chapter05.prerequisites.nas.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.prerequisites.stack.title') }}</h3>
      <p>{{ $t('chapter05.prerequisites.stack.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.prerequisites.edge.title') }}</h3>
      <p>{{ $t('chapter05.prerequisites.edge.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.prerequisites.resources.title') }}</h3>
      <p>{{ $t('chapter05.prerequisites.resources.description') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

