<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.commonOperations.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.commonOperations.restart.title') }}</h3>
      <pre v-for="(cmd, index) in $tm('chapter04.commonOperations.restart.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.commonOperations.stop.title') }}</h3>
      <pre v-for="(cmd, index) in $tm('chapter04.commonOperations.stop.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.commonOperations.update.title') }}</h3>
      <pre v-for="(cmd, index) in $tm('chapter04.commonOperations.update.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.commonOperations.updateContent.title') }}</h3>
      <p>{{ $t('chapter04.commonOperations.updateContent.description') }}</p>
      <pre><code>{{ $t('chapter04.commonOperations.updateContent.command') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.commonOperations.viewStatus.title') }}</h3>
      <pre v-for="(cmd, index) in $tm('chapter04.commonOperations.viewStatus.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

