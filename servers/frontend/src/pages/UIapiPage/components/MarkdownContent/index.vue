<template>
  <div v-if="loading" :class="styles.loading">Loading...</div>
  <div v-else-if="error" :class="styles.error">{{ error }}</div>
  <article v-else-if="html" :class="styles.article" v-html="html"></article>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { marked } from 'marked'
import styles from './styles.module.css'

const props = withDefaults(
  defineProps<{
    /** Path under /docs/nfx-ui/ without .md, e.g. "README" or "components/README" or "components/button" */
    docPath: string
  }>(),
  {}
)

const html = ref('')
const loading = ref(true)
const error = ref('')

async function load() {
  loading.value = true
  error.value = ''
  const path = `/docs/nfx-ui/${props.docPath}.md`
  try {
    const res = await fetch(path)
    if (!res.ok) throw new Error(res.statusText)
    const text = await res.text()
    html.value = marked(text) as string
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load doc'
  } finally {
    loading.value = false
  }
}

watch(() => props.docPath, load, { immediate: false })
onMounted(load)
</script>
