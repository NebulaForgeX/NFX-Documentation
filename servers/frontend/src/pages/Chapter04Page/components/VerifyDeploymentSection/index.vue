<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.verifyDeployment.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.verifyDeployment.step1.title') }}</h3>
      <pre><code>{{ $t('chapter04.verifyDeployment.step1.command') }}</code></pre>
      <div :class="styles.nested" v-if="$t('chapter04.verifyDeployment.step1.expectedOutput')">
        <h4>{{ $t('chapter04.verifyDeployment.step1.expectedOutput.title') }}</h4>
        <pre><code>{{ $t('chapter04.verifyDeployment.step1.expectedOutput.output') }}</code></pre>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.verifyDeployment.step2.title') }}</h3>
      <pre v-for="(cmd, index) in $tm('chapter04.verifyDeployment.step2.commands')" :key="index"><code>{{ cmd }}</code></pre>
      <p>{{ $t('chapter04.verifyDeployment.step2.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.verifyDeployment.step3.title') }}</h3>
      <p>{{ $t('chapter04.verifyDeployment.step3.description') }}</p>
      <ul>
        <li v-for="(site, index) in $tm('chapter04.verifyDeployment.step3.sites')" :key="index" v-html="site"></li>
      </ul>
      <p>{{ $t('chapter04.verifyDeployment.step3.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.verifyDeployment.step4.title') }}</h3>
      <p>{{ $t('chapter04.verifyDeployment.step4.description') }}</p>
      <pre><code>{{ $t('chapter04.verifyDeployment.step4.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

