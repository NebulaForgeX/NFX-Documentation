<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter05.commonOperations.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.commonOperations.viewList.title') }}</h3>
      <p>{{ $t('chapter05.commonOperations.viewList.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.commonOperations.apply.title') }}</h3>
      <p>{{ $t('chapter05.commonOperations.apply.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.commonOperations.export.title') }}</h3>
      <p>{{ $t('chapter05.commonOperations.export.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.commonOperations.refresh.title') }}</h3>
      <p>{{ $t('chapter05.commonOperations.refresh.description') }}</p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter05.commonOperations.cli.title') }}</h3>
      <p>{{ $t('chapter05.commonOperations.cli.description') }}</p>
      <pre><code>{{ $t('chapter05.commonOperations.cli.command') }}</code></pre>
      <p>{{ $t('chapter05.commonOperations.cli.description2') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

