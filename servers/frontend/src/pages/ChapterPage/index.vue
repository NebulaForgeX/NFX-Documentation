<template>
  <div :class="styles.chapterView">
    <div :class="styles.header">
      <router-link to="/" :class="styles.backLink">← 返回首页</router-link>
      <h1>{{ chapterTitle }}</h1>
    </div>
    <div :class="styles.content" v-html="content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'
import styles from './styles.module.css'

const route = useRoute()
const content = ref('')
const chapterTitle = ref('')

onMounted(async () => {
  const lang = route.path.startsWith('/zh') ? 'zh' : 'en'
  const chapterId = route.params.chapter as string
  
  try {
    const response = await fetch(`/books/${lang}/${chapterId}.md`)
    let markdown = await response.text()
    
    // Extract title from markdown and remove the first heading
    const titleMatch = markdown.match(/^#\s+(.+)$/m)
    if (titleMatch) {
      chapterTitle.value = titleMatch[1]
      // Remove the first heading line from markdown content
      markdown = markdown.replace(/^#\s+.+$/m, '').trim()
    } else {
      chapterTitle.value = chapterId
    }
    
    content.value = await marked(markdown)
  } catch (error) {
    console.error('Failed to load chapter:', error)
    content.value = '<p>Failed to load chapter content.</p>'
  }
})
</script>

<style>
/* Global styles for markdown content */
.chapterView :deep(h1) {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.chapterView :deep(h2) {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.chapterView :deep(h3) {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.chapterView :deep(p) {
  margin-bottom: 1rem;
}

.chapterView :deep(code) {
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.chapterView :deep(pre) {
  background-color: #1e1e1e;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.chapterView :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: #d4d4d4;
}

.chapterView :deep(ul),
.chapterView :deep(ol) {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.chapterView :deep(li) {
  margin-bottom: 0.5rem;
}

.chapterView :deep(blockquote) {
  border-left: 4px solid #ccc;
  padding-left: 1rem;
  margin-left: 0;
  color: #666;
}
</style>
