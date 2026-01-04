<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.clone.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.clone.step1.title') }}</h3>
      <p>{{ $t('chapter04.clone.step1.description') }}</p>
      <pre><code>{{ $t('chapter04.clone.step1.command') }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.clone.step2.title') }}</h3>
      <p v-html="$t('chapter04.clone.step2.description')"></p>
      <pre><code>{{ $t('chapter04.clone.step2.command') }}</code></pre>
      <p>{{ $t('chapter04.clone.step2.description2') }}</p>
      <div :class="styles.nested" v-if="$t('chapter04.clone.step2.optional')">
        <h4>{{ $t('chapter04.clone.step2.optional.title') }}</h4>
        <p>{{ $t('chapter04.clone.step2.optional.description') }}</p>
        <pre v-for="(cmd, index) in $tm('chapter04.clone.step2.optional.commands')" :key="index"><code>{{ cmd }}</code></pre>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.clone.step3.title') }}</h3>
      <pre><code>{{ $t('chapter04.clone.step3.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

