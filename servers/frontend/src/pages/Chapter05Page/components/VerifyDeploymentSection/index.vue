<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.verifyDeployment.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.verifyDeployment.step1.title') }}</h3>
      <p>{{ $t('chapter05.verifyDeployment.step1.description') }}</p>
      <pre><code>{{ $t('chapter05.verifyDeployment.step1.command') }}</code></pre>
      <p>{{ $t('chapter05.verifyDeployment.step1.description2') }}</p>
      <p>{{ $t('chapter05.verifyDeployment.step1.note') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.verifyDeployment.step2.title') }}</h3>
      <p>{{ $t('chapter05.verifyDeployment.step2.description') }}</p>
      <pre v-for="(cmd, index) in $tm('chapter05.verifyDeployment.step2.commands')" :key="index"><code>{{ cmd }}</code></pre>
      <p>{{ $t('chapter05.verifyDeployment.step2.description2') }}</p>
      <p>{{ $t('chapter05.verifyDeployment.step2.note') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.verifyDeployment.step3.title') }}</h3>
      <p>{{ $t('chapter05.verifyDeployment.step3.description') }}</p>
      <pre><code>{{ $t('chapter05.verifyDeployment.step3.command') }}</code></pre>
      <p>{{ $t('chapter05.verifyDeployment.step3.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.verifyDeployment.step4.title') }}</h3>
      <p>{{ $t('chapter05.verifyDeployment.step4.description') }}</p>
      <pre v-for="(cmd, index) in $tm('chapter05.verifyDeployment.step4.commands')" :key="index"><code>{{ cmd }}</code></pre>
      <p>{{ $t('chapter05.verifyDeployment.step4.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.verifyDeployment.step5.title') }}</h3>
      <p>{{ $t('chapter05.verifyDeployment.step5.description') }}</p>
      <pre v-for="(cmd, index) in $tm('chapter05.verifyDeployment.step5.commands')" :key="index"><code>{{ cmd }}</code></pre>
      <p>{{ $t('chapter05.verifyDeployment.step5.description2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

