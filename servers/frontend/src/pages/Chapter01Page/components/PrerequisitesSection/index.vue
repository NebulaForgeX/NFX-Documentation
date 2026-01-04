<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter01.prerequisites.title') }}</h2>
    <p>{{ $t('chapter01.prerequisites.description') }}</p>
    
    <div :class="styles.subsection">
      <h3>{{ $t('chapter01.prerequisites.network.title') }}</h3>
      <ul>
        <li v-for="(item, index) in $tm('chapter01.prerequisites.network.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter01.prerequisites.china.title') }}</h3>
      <ul>
        <li v-for="(item, index) in $tm('chapter01.prerequisites.china.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter01.prerequisites.other.title') }}</h3>
      <ul>
        <li v-for="(item, index) in $tm('chapter01.prerequisites.other.items')" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

