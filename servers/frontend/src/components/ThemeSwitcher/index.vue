<template>
  <button :class="styles.button" @click="toggleTheme" :title="theme === 'light' ? $t('theme.switchToDark') : $t('theme.switchToLight')">
    <Sun v-if="theme === 'light'" :size="20" />
    <Moon v-else :size="20" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '@/composables/useTheme'
import styles from './styles.module.css'

const { theme, toggleTheme } = useTheme()
</script>

