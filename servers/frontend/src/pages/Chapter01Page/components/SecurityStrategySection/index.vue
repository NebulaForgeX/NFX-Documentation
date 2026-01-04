<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter01.security.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter01.security.recommended.title') }}</h3>
      <p>{{ $t('chapter01.security.recommended.description') }}</p>

      <!-- Solution 1 -->
      <div :class="styles.subsubsection">
        <h4 v-html="$t('chapter01.security.recommended.solution1.title')"></h4>
        <p v-html="$t('chapter01.security.recommended.solution1.advantages')"></p>
        <ul>
          <li v-for="(item, index) in $tm('chapter01.security.recommended.solution1.items')" :key="index" v-html="item"></li>
        </ul>
        <p v-html="$t('chapter01.security.recommended.solution1.implementation')"></p>
        <p>{{ $t('chapter01.security.recommended.solution1.implementationDesc') }}</p>
        <ul>
          <li v-for="(benefit, index) in $tm('chapter01.security.recommended.solution1.benefits')" :key="index">
            {{ benefit }}
          </li>
        </ul>
      </div>

      <!-- Solution 2 -->
      <div :class="styles.subsubsection">
        <h4>{{ $t('chapter01.security.recommended.solution2.title') }}</h4>
        <p>{{ $t('chapter01.security.recommended.solution2.description') }}</p>
        <ul>
          <li v-for="(item, index) in $tm('chapter01.security.recommended.solution2.items')" :key="index" v-html="item"></li>
        </ul>
        <p v-html="$t('chapter01.security.recommended.solution2.scenarios')"></p>
        <ul>
          <li v-for="(scenario, index) in $tm('chapter01.security.recommended.solution2.scenarioItems')" :key="index">
            {{ scenario }}
          </li>
        </ul>
      </div>

      <!-- Other Solutions -->
      <div :class="styles.subsubsection">
        <h4>{{ $t('chapter01.security.recommended.other.title') }}</h4>
        <p>{{ $t('chapter01.security.recommended.other.description') }}</p>
        <ul>
          <li v-for="(item, index) in $tm('chapter01.security.recommended.other.items')" :key="index">
            {{ item }}
          </li>
        </ul>
        <p>{{ $t('chapter01.security.recommended.other.note') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

