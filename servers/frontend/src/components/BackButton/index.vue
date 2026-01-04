<template>
  <router-link :to="to" :class="styles.backButton">
    <ArrowLeft :size="20" :class="styles.icon" />
    <span>{{ displayText }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'
import styles from './styles.module.css'

interface Props {
  to?: string
  text?: string
}

const props = withDefaults(defineProps<Props>(), {
  to: '/',
  text: undefined,
})

const { t } = useI18n()

const displayText = computed(() => {
  let text = props.text || t('common.backToHome')
  // 移除文字中的箭头符号（← 和 →）
  return text.replace(/[←→]/g, '').trim()
})
</script>

