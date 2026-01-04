<template>
  <router-link v-if="nextChapter" :to="nextChapter.path" :class="styles.nextButton">
    <span>{{ nextChapterText }}</span>
    <ArrowRight :size="20" :class="styles.icon" />
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowRight } from 'lucide-vue-next'
import styles from './styles.module.css'

// 章节顺序定义
const chapters = [
  { id: 'chapter-01-router-configuration', title: 'chapter01' },
  { id: 'chapter-02-nas-setup', title: 'chapter02' },
  { id: 'chapter-03-nfx-stack-deployment', title: 'chapter03' },
  { id: 'chapter-04-nfx-edge-deployment', title: 'chapter04' },
  { id: 'chapter-05-nfx-vault-deployment', title: 'chapter05' },
]

const route = useRoute()
const { locale, t } = useI18n()

// 移除文字中的箭头符号
const nextChapterText = computed(() => {
  const text = t('common.nextChapter')
  return text.replace(/[←→]/g, '').trim()
})

const nextChapter = computed(() => {
  const currentPath = route.path
  const lang = locale.value
  
  // 提取当前章节ID
  const currentChapterMatch = currentPath.match(/\/(zh|en)\/(chapter-\d+-\w+)/)
  if (!currentChapterMatch) return null
  
  const currentChapterId = currentChapterMatch[2]
  const currentIndex = chapters.findIndex(ch => ch.id === currentChapterId)
  
  // 如果是最后一个章节，返回null（会显示返回首页）
  if (currentIndex === -1 || currentIndex === chapters.length - 1) {
    return null
  }
  
  // 返回下一个章节
  const nextChapter = chapters[currentIndex + 1]
  return {
    path: `/${lang}/${nextChapter.id}`,
    title: nextChapter.title,
  }
})
</script>

