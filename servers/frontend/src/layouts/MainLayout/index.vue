<template>
  <div :class="styles.layout">
    <Header />
    <main :class="styles.main">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
import styles from './styles.module.css'
</script>

