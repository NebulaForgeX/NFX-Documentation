<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter04.dockerCompose.title') }}</h2>
    <p>{{ $t('chapter04.dockerCompose.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.dockerCompose.step1.title') }}</h3>
      <p>{{ $t('chapter04.dockerCompose.step1.description') }}</p>
      <pre><code>{{ $t('chapter04.dockerCompose.step1.yaml') }}</code></pre>
      <div :class="styles.nested" v-if="$t('chapter04.dockerCompose.step1.generateHash')">
        <h4>{{ $t('chapter04.dockerCompose.step1.generateHash.title') }}</h4>
        <pre v-for="(cmd, index) in $tm('chapter04.dockerCompose.step1.generateHash.commands')" :key="index"><code>{{ cmd }}</code></pre>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.dockerCompose.step2.title') }}</h3>
      <p>{{ $t('chapter04.dockerCompose.step2.description') }}</p>
      <pre><code>{{ $t('chapter04.dockerCompose.step2.yaml') }}</code></pre>
      <p>{{ $t('chapter04.dockerCompose.step2.description2') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter04.dockerCompose.step3.title') }}</h3>
      <p>{{ $t('chapter04.dockerCompose.step3.description') }}</p>
      <pre><code>{{ $t('chapter04.dockerCompose.step3.command') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

