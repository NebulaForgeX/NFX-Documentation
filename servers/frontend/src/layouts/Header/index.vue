<template>
  <header :class="styles.header">
    <div :class="styles.leftContainer">
      <router-link to="/" :class="styles.logoContainer">
        <img src="/logo.ico" alt="NFX" :class="styles.logo" />
        <span :class="styles.logoText">NFX-Documentation</span>
      </router-link>
    </div>

    <nav :class="styles.nav">
      <router-link to="/" :class="[styles.navLink, { [styles.active]: $route.path === '/' }]">
        <Home :size="18" :class="styles.navIcon" />
        <span>{{ $t('common.nav.home') }}</span>
      </router-link>
      <div :class="styles.chaptersDropdown" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <button :class="[styles.chaptersButton, styles.navLink, { [styles.active]: isChapterPage }]">
          <Book :size="18" :class="styles.navIcon" />
          <span>{{ $t('common.nav.chapters') }}</span>
        </button>
        <div v-if="showDropdown" :class="styles.dropdownMenu">
          <router-link
            v-for="(chapter, key) in chapters"
            :key="key"
            :to="`/${locale}/${chapter.id}`"
            :class="styles.dropdownItem"
            @click="showDropdown = false"
          >
            {{ chapter.title }}
          </router-link>
        </div>
      </div>
      <router-link to="/repo" :class="[styles.navLink, { [styles.active]: $route.path === '/repo' }]">
        <FolderGit2 :size="18" :class="styles.navIcon" />
        <span>{{ $t('common.nav.repo') }}</span>
      </router-link>
      <router-link to="/ui-api" :class="[styles.navLink, { [styles.active]: $route.path.startsWith('/ui-api') }]">
        <Code2 :size="18" :class="styles.navIcon" />
        <span>{{ $t('common.nav.uiApi') }}</span>
      </router-link>
      <router-link to="/about" :class="[styles.navLink, { [styles.active]: $route.path === '/about' }]">
        <Info :size="18" :class="styles.navIcon" />
        <span>{{ $t('common.nav.about') }}</span>
      </router-link>
    </nav>

    <div :class="styles.rightContainer">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Book, Home, FolderGit2, Code2, Info } from 'lucide-vue-next'
import ThemeSwitcher from '@/components/ThemeSwitcher/index.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'
import styles from './styles.module.css'

const { locale, tm } = useI18n()
const route = useRoute()
const showDropdown = ref(false)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

const chapters = computed(() => {
  const chapterList = tm('common.chapterList') as Record<string, { id: string; title: string }>
  return Object.values(chapterList)
})

const isChapterPage = computed(() => {
  return route.path.includes('/chapter-')
})

const handleMouseEnter = () => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  showDropdown.value = true
}

const handleMouseLeave = () => {
  hideTimeout = setTimeout(() => {
    showDropdown.value = false
    hideTimeout = null
  }, 200) // 200ms 延迟
}

onUnmounted(() => {
  if (hideTimeout) {
    clearTimeout(hideTimeout)
  }
})
</script>

