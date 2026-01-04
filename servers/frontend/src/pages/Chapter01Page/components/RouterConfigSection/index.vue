<template>
  <section :class="styles.section">
    <h2>{{ $t('chapter01.router.title') }}</h2>
    <p>{{ $t('chapter01.router.intro') }}</p>

    <RouterAccessSection />
    <FirewallConfigSection />
    <PortForwardingSection />
  </section>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
import RouterAccessSection from '../RouterAccessSection/index.vue'
import FirewallConfigSection from '../FirewallConfigSection/index.vue'
import PortForwardingSection from '../PortForwardingSection/index.vue'
</script>

