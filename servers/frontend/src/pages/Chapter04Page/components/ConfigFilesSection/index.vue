<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.configFiles.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.configFiles.step1.title') }}</h3>
      <p>{{ $t('chapter04.configFiles.step1.description') }}</p>
      <pre><code>{{ $t('chapter04.configFiles.step1.command') }}</code></pre>
      <p>{{ $t('chapter04.configFiles.step1.important') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.configFiles.step2.title') }}</h3>
      <p>{{ $t('chapter04.configFiles.step2.description') }}</p>
      <pre><code>{{ $t('chapter04.configFiles.step2.command') }}</code></pre>
      <p>{{ $t('chapter04.configFiles.step2.description2') }}</p>
      <p>{{ $t('chapter04.configFiles.step2.description3') }}</p>
      <div :class="styles.nested" v-if="$t('chapter04.configFiles.step2.example')">
        <h4>{{ $t('chapter04.configFiles.step2.example.title') }}</h4>
        <p>{{ $t('chapter04.configFiles.step2.example.description') }}</p>
        <pre><code>{{ $t('chapter04.configFiles.step2.example.command') }}</code></pre>
        <p v-html="$t('chapter04.configFiles.step2.example.note')"></p>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.configFiles.step3.title') }}</h3>
      <p>{{ $t('chapter04.configFiles.step3.description') }}</p>
      <pre><code>{{ $t('chapter04.configFiles.step3.command') }}</code></pre>
      <p>{{ $t('chapter04.configFiles.step3.description2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

