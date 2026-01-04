<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.clone.title') }}</h2>
    <p>{{ $t('chapter03.clone.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.clone.step1.title') }}</h3>
      <p>{{ $t('chapter03.clone.step1.description') }}</p>
      <pre><code>{{ $t('chapter03.clone.step1.command') }}</code></pre>
      <ul>
        <li v-for="(note, index) in $tm('chapter03.clone.step1.notes')" :key="index">
          {{ note }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.clone.step2.title') }}</h3>
      <p v-html="$t('chapter03.clone.step2.description')"></p>
      <pre><code>{{ $t('chapter03.clone.step2.command') }}</code></pre>
      <ul>
        <li v-for="(note, index) in $tm('chapter03.clone.step2.notes')" :key="index" v-html="note"></li>
      </ul>
      <div :class="styles.nested">
        <h4>{{ $t('chapter03.clone.step2.optional.title') }}</h4>
        <p>{{ $t('chapter03.clone.step2.optional.description') }}</p>
        <pre v-for="(cmd, index) in $tm('chapter03.clone.step2.optional.commands')" :key="index"><code>{{ cmd }}</code></pre>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.clone.step3.title') }}</h3>
      <pre><code>{{ $t('chapter03.clone.step3.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

