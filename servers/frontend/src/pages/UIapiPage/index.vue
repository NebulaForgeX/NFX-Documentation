<template>
  <div :class="styles.container">
    <SidebarNav :collapsed="sidebarCollapsed" @toggle="sidebarCollapsed = !sidebarCollapsed" />
    <main :class="styles.content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SidebarNav } from './components'
import styles from './styles.module.css'

const sidebarCollapsed = ref(false)
</script>
