<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.verifyConfig.title') }}</h2>
    <p>{{ $t('chapter04.verifyConfig.description') }}</p>

    <ul>
      <li v-for="(check, index) in $tm('chapter04.verifyConfig.checks')" :key="index" v-html="check"></li>
    </ul>

    <div :class="styles.subsection" v-if="$t('chapter04.verifyConfig.portCheck')">
      <h3>{{ $t('chapter04.verifyConfig.portCheck.title') }}</h3>
      <pre><code>{{ $t('chapter04.verifyConfig.portCheck.command') }}</code></pre>
      <p>{{ $t('chapter04.verifyConfig.portCheck.note') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

