<template>
  <div :class="styles.layout">
    <Header />
    <main :class="styles.main">
      <div :class="styles.mainSlot">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Header from '@/layouts/Header/index.vue'
import Footer from '@/layouts/Footer/index.vue'  
import styles from './styles.module.css'
</script>

