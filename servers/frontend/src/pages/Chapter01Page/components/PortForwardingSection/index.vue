<template>
  <div :class="styles.subsection">
    <h3>{{ $t('chapter01.router.portForwarding.title') }}</h3>
    <p>{{ $t('chapter01.router.portForwarding.description') }}</p>
    <img :src="$t('chapter01.router.portForwarding.image')" :alt="$t('chapter01.router.portForwarding.imageAlt')" :class="styles.image" />

    <div :class="styles.nested">
      <h4>{{ $t('chapter01.router.portForwarding.required.title') }}</h4>
      <p>{{ $t('chapter01.router.portForwarding.required.description') }}</p>
      <ul>
        <li v-for="(port, index) in $tm('chapter01.router.portForwarding.required.ports')" :key="index">
          <strong>{{ port.name }}</strong> - {{ port.description }}
          <br />
          <span :class="styles.note">{{ port.note }}</span>
        </li>
      </ul>
    </div>

    <div :class="styles.nested">
      <h4>{{ $t('chapter01.router.portForwarding.optional.title') }}</h4>
      <p>{{ $t('chapter01.router.portForwarding.optional.description') }}</p>
      <ul>
        <li v-for="(item, index) in $tm('chapter01.router.portForwarding.optional.items')" :key="index">
          {{ item }}
        </li>
      </ul>
      <p v-html="$t('chapter01.router.portForwarding.optional.recommendation')"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

