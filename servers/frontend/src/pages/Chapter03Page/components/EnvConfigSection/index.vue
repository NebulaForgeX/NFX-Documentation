<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.envConfig.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.envConfig.step1.title') }}</h3>
      <p>{{ $t('chapter03.envConfig.step1.description') }}</p>
      <pre><code>{{ $t('chapter03.envConfig.step1.command') }}</code></pre>
      <p v-html="$t('chapter03.envConfig.step1.important.0')"></p>
      <ul>
        <li v-for="(item, index) in $tm('chapter03.envConfig.step1.important').slice(1)" :key="index" v-html="item"></li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.envConfig.step2.title') }}</h3>
      <p>{{ $t('chapter03.envConfig.step2.description') }}</p>
      <pre v-for="(cmd, index) in $tm('chapter03.envConfig.step2.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

