<template>
  <div :class="styles.home">
    <header :class="styles.header">
      <h1>{{ $t('common.title') }}</h1>
      <p>{{ $t('common.subtitle') }}</p>
    </header>
    <main :class="styles.main">
      <section :class="styles.chapters">
        <h2>{{ $t('common.chapters.title') }}</h2>
        <ul>
          <li v-for="chapter in chapters" :key="chapter.id">
            <router-link :to="`/${locale}/${chapter.id}`">
              <BookOpen :size="20" :class="styles.icon" />
              <span>{{ chapter.title }}</span>
            </router-link>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { BookOpen } from 'lucide-vue-next'
import styles from './styles.module.css'

const { t, locale } = useI18n()

const chapters = computed(() => [
  {
    id: t('common.chapterList.chapter01.id'),
    title: t('common.chapterList.chapter01.title'),
  },
  {
    id: t('common.chapterList.chapter02.id'),
    title: t('common.chapterList.chapter02.title'),
  },
  {
    id: t('common.chapterList.chapter03.id'),
    title: t('common.chapterList.chapter03.title'),
  },
  {
    id: t('common.chapterList.chapter04.id'),
    title: t('common.chapterList.chapter04.title'),
  },
  {
    id: t('common.chapterList.chapter05.id'),
    title: t('common.chapterList.chapter05.title'),
  },
])
</script>
