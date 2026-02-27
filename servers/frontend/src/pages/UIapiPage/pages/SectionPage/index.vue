<template>
  <div>
    <MarkdownContent :doc-path="docPath" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { MarkdownContent } from '../../components'

const route = useRoute()

const sectionId = computed(() => (route.params.section as string) || '')
const docSlug = computed(() => (route.params.doc as string) || '')

const docPath = computed(() => {
  const section = sectionId.value
  if (!section) return 'README'
  if (docSlug.value) return `${section}/${docSlug.value}`
  return `${section}/README`
})
</script>
