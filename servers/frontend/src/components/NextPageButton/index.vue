<template>
  <router-link v-if="to" :to="to" :class="styles.nextButton">
    <span>{{ displayText }}</span>
    <ArrowRight :size="20" :class="styles.icon" />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import styles from './styles.module.css'

interface Props {
  to?: string
  text?: string
}

const props = defineProps<Props>()

const displayText = computed(() => {
  if (!props.text) return ''
  // 移除文字中的箭头符号（← 和 →）
  return props.text.replace(/[←→]/g, '').trim()
})
</script>

