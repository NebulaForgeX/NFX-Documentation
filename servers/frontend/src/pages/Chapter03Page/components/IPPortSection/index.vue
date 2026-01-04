<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter03.ipPort.title') }}</h2>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.ipPort.ip.title') }}</h3>
      <p>{{ $t('chapter03.ipPort.ip.description') }}</p>
      <p v-html="$t('chapter03.ipPort.ip.example')"></p>
      <p v-html="$t('chapter03.ipPort.ip.hosts.0')"></p>
      <ul>
        <li v-for="(host, index) in $tm('chapter03.ipPort.ip.hosts').slice(1)" :key="index" v-html="host"></li>
      </ul>
      <p>{{ $t('chapter03.ipPort.ip.security.0') }}</p>
      <ul>
        <li v-for="(item, index) in $tm('chapter03.ipPort.ip.security').slice(1)" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>

    <div :class="styles.subsection">
      <h3>{{ $t('chapter03.ipPort.port.title') }}</h3>
      <p>{{ $t('chapter03.ipPort.port.description') }}</p>
      <p v-html="$t('chapter03.ipPort.port.warning')"></p>
      <p v-html="$t('chapter03.ipPort.port.important')"></p>
      <p>{{ $t('chapter03.ipPort.port.reasons.0') }}</p>
      <ul>
        <li v-for="(reason, index) in $tm('chapter03.ipPort.port.reasons').slice(1)" :key="index">
          {{ reason }}
        </li>
      </ul>
      <p v-html="$t('chapter03.ipPort.port.recommendations.0')"></p>
      <ul>
        <li v-for="(rec, index) in $tm('chapter03.ipPort.port.recommendations').slice(1)" :key="index" v-html="rec"></li>
      </ul>
      <p v-html="$t('chapter03.ipPort.port.example')"></p>
      <pre><code>{{ $t('chapter03.ipPort.port.example') }}</code></pre>
      <div :class="styles.nested">
        <p v-html="$t('chapter03.ipPort.port.check.title')"></p>
        <p>{{ $t('chapter03.ipPort.port.check.description') }}</p>
        <pre><code>{{ $t('chapter03.ipPort.port.check.command') }}</code></pre>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

