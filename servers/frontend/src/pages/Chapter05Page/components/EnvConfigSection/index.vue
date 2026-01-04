<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.envConfig.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step1.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step1.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step1.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step1.note') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step2.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step2.description') }}</p>
      <pre v-for="(cmd, index) in $tm('chapter05.envConfig.step2.commands')" :key="index"><code>{{ cmd }}</code></pre>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step3.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step3.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step3.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step3.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step4.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step4.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step4.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step4.description2') }}</p>
      <p>{{ $t('chapter05.envConfig.step4.note') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step5.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step5.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step5.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step5.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step6.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step6.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step6.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step6.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step7.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step7.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step7.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step7.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.envConfig.step8.title') }}</h3>
      <p>{{ $t('chapter05.envConfig.step8.description') }}</p>
      <pre><code>{{ $t('chapter05.envConfig.step8.command') }}</code></pre>
      <p>{{ $t('chapter05.envConfig.step8.description2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

