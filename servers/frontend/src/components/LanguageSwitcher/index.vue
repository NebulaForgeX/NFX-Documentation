<template>
  <div :class="styles.container">
    <button :class="styles.button" @click="toggleDropdown" :title="$t('language.switch')">
      <Languages :size="20" />
    </button>
    <div v-if="isOpen" :class="styles.dropdown">
      <button
        v-for="lang in languages"
        :key="lang.code"
        :class="[styles.option, { [styles.active]: currentLang === lang.code }]"
        @click="switchLanguage(lang.code)"
      >
        {{ lang.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Languages } from 'lucide-vue-next'
import styles from './styles.module.css'

const { locale } = useI18n()
const isOpen = ref(false)

const languages = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
]

const currentLang = computed(() => locale.value)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('nfx-documentation-language', lang)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest(`.${styles.container}`)) {
    isOpen.value = false
  }
}

onMounted(() => {
  // 恢复保存的语言设置
  const savedLang = localStorage.getItem('nfx-documentation-language')
  if (savedLang && (savedLang === 'zh' || savedLang === 'en')) {
    locale.value = savedLang
  }

  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

