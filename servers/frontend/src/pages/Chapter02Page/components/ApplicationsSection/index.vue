<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter02.applications.title') }}</h2>
    <p>{{ $t('chapter02.applications.description') }}</p>
    <img :src="$t('chapter02.applications.image')" :alt="$t('chapter02.applications.imageAlt')" :class="styles.image" />

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.applications.list.title') }}</h3>
      
      <div :class="styles.appItem">
        <h4>{{ $t('chapter02.applications.list.docker.name') }}</h4>
        <p><strong>{{ $t('chapter02.applications.list.docker.purpose') }}</strong>：{{ $t('chapter02.applications.list.docker.description') }}</p>
        <p>{{ $t('chapter02.applications.list.docker.version') }}</p>
        <p><code>{{ $t('chapter02.applications.list.docker.verify') }}</code></p>
      </div>

      <div :class="styles.appItem">
        <h4>{{ $t('chapter02.applications.list.git.name') }}</h4>
        <p><strong>{{ $t('chapter02.applications.list.git.purpose') }}</strong>：{{ $t('chapter02.applications.list.git.description') }}</p>
        <p><code>{{ $t('chapter02.applications.list.git.verify') }}</code></p>
      </div>

      <div :class="styles.appItem">
        <h4>{{ $t('chapter02.applications.list.entware.name') }}</h4>
        <p><strong>{{ $t('chapter02.applications.list.entware.purpose') }}</strong>：{{ $t('chapter02.applications.list.entware.description') }}</p>
        <p><code>{{ $t('chapter02.applications.list.entware.verify') }}</code></p>
        <p><strong>{{ $t('chapter02.applications.list.entware.importance') }}</strong></p>
      </div>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter02.applications.order.title') }}</h3>
      <ol>
        <li v-for="(item, index) in $tm('chapter02.applications.order.items')" :key="index" v-html="item"></li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

