<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.addNewSite.title') }}</h2>
    <p>{{ $t('chapter04.addNewSite.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.addNewSite.step1.title') }}</h3>
      <p>{{ $t('chapter04.addNewSite.step1.description') }}</p>
      <pre><code>{{ $t('chapter04.addNewSite.step1.yaml') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.addNewSite.step2.title') }}</h3>
      <pre><code>{{ $t('chapter04.addNewSite.step2.command') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.addNewSite.step3.title') }}</h3>
      <p>{{ $t('chapter04.addNewSite.step3.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.addNewSite.step4.title') }}</h3>
      <pre><code>{{ $t('chapter04.addNewSite.step4.yaml') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.addNewSite.step5.title') }}</h3>
      <pre><code>{{ $t('chapter04.addNewSite.step5.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

