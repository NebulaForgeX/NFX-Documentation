<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.dataPath.title') }}</h2>
    <p>{{ $t('chapter03.dataPath.description') }}</p>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.dataPath.structure.title') }}</h3>
      <p>{{ $t('chapter03.dataPath.structure.description') }}</p>
      <pre><code>{{ $t('chapter03.dataPath.structure.tree') }}</code></pre>
      <p v-html="$t('chapter03.dataPath.structure.note')"></p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.dataPath.config.title') }}</h3>
      <p>{{ $t('chapter03.dataPath.config.description') }}</p>
      <pre><code>{{ $t('chapter03.dataPath.config.template') }}</code></pre>
      <p v-html="$t('chapter03.dataPath.config.example')"></p>
      <pre><code>{{ $t('chapter03.dataPath.config.example') }}</code></pre>
      <p v-html="$t('chapter03.dataPath.config.renameNote')"></p>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.dataPath.custom.title') }}</h3>
      <p>{{ $t('chapter03.dataPath.custom.description') }}</p>
      <ul>
        <li v-for="(example, index) in $tm('chapter03.dataPath.custom.examples')" :key="index">
          {{ example }}
        </li>
      </ul>
      <ul>
        <li v-for="(note, index) in $tm('chapter03.dataPath.custom.notes')" :key="index">
          {{ note }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.dataPath.create.title') }}</h3>
      <p>{{ $t('chapter03.dataPath.create.description') }}</p>
      <pre><code>{{ $t('chapter03.dataPath.create.command') }}</code></pre>
      <p>{{ $t('chapter03.dataPath.create.example') }}</p>
      <pre><code>{{ $t('chapter03.dataPath.create.example') }}</code></pre>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

