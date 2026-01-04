<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.clone.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.clone.step1.title') }}</h3>
      <p>{{ $t('chapter05.clone.step1.description') }}</p>
      <pre><code>{{ $t('chapter05.clone.step1.command') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.clone.step2.title') }}</h3>
      <p v-html="$t('chapter05.clone.step2.description')"></p>
      <pre><code>{{ $t('chapter05.clone.step2.command') }}</code></pre>
      <p>{{ $t('chapter05.clone.step2.description2') }}</p>
      <p>{{ $t('chapter05.clone.step2.note') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.clone.step3.title') }}</h3>
      <p>{{ $t('chapter05.clone.step3.description') }}</p>
      <pre><code>{{ $t('chapter05.clone.step3.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

