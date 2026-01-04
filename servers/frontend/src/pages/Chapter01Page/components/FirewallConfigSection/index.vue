<template>
  <div :class="styles.subsection">
    <h3>{{ $t('chapter01.router.firewall.title') }}</h3>
    <p>{{ $t('chapter01.router.firewall.description') }}</p>
    <img :src="$t('chapter01.router.firewall.image')" :alt="$t('chapter01.router.firewall.imageAlt')" :class="styles.image" />

    <!-- DMZ Section -->
    <div :class="styles.subsubsection">
      <h4 v-html="$t('chapter01.router.firewall.dmz.title')"></h4>
      <p v-html="$t('chapter01.router.firewall.dmz.important')"></p>
      
      <div :class="styles.nested">
        <h5>{{ $t('chapter01.router.firewall.dmz.why.title') }}</h5>
        <p>{{ $t('chapter01.router.firewall.dmz.why.description') }}</p>
      </div>

      <div :class="styles.nested">
        <h5>{{ $t('chapter01.router.firewall.dmz.docker.title') }}</h5>
        <p>{{ $t('chapter01.router.firewall.dmz.docker.description') }}</p>
        <ul>
          <li v-for="(link, index) in $tm('chapter01.router.firewall.dmz.docker.links')" :key="index" v-html="link"></li>
        </ul>
        <p>{{ $t('chapter01.router.firewall.dmz.docker.details') }}</p>
        <p>{{ $t('chapter01.router.firewall.dmz.docker.rules') }}</p>
        <p>{{ $t('chapter01.router.firewall.dmz.docker.purpose') }}</p>
        <ul>
          <li v-for="(purpose, index) in $tm('chapter01.router.firewall.dmz.docker.purposes')" :key="index" v-html="purpose"></li>
        </ul>
        <p>{{ $t('chapter01.router.firewall.dmz.docker.systemFirewall') }}</p>
        <p v-html="$t('chapter01.router.firewall.dmz.docker.keyPoints')"></p>
        <ul>
          <li v-for="(point, index) in $tm('chapter01.router.firewall.dmz.docker.points')" :key="index" v-html="point"></li>
        </ul>
      </div>

      <div :class="styles.nested">
        <h5>{{ $t('chapter01.router.firewall.dmz.summary.title') }}</h5>
        <p>{{ $t('chapter01.router.firewall.dmz.summary.description') }}</p>
        <ul>
          <li v-for="(item, index) in $tm('chapter01.router.firewall.dmz.summary.items')" :key="index" v-html="item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

