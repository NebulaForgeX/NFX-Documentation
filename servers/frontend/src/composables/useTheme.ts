import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const themeKey = 'nfx-policy-theme'
const theme = ref<Theme>('light')

// 初始化主题（在模块加载时执行）
function initTheme() {
  // 先检查localStorage
  const savedTheme = localStorage.getItem(themeKey) as Theme | null
  if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
    theme.value = savedTheme
    applyTheme(savedTheme)
    return
  }

  // 检查系统偏好
  if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme.value = 'dark'
    applyTheme('dark')
  } else {
    theme.value = 'light'
    applyTheme('light')
  }
}

// 应用主题
function applyTheme(newTheme: Theme) {
  if (typeof document === 'undefined') return
  
  const root = document.documentElement
  if (newTheme === 'dark') {
    root.classList.add('dark')
    root.classList.remove('light')
    root.style.colorScheme = 'dark'
  } else {
    root.classList.remove('dark')
    root.classList.add('light')
    root.style.colorScheme = 'light'
  }
  localStorage.setItem(themeKey, newTheme)
}

// 初始化（立即执行）
if (typeof window !== 'undefined') {
  initTheme()
}

export function useTheme() {
  // 切换主题
  const toggleTheme = () => {
    const newTheme = theme.value === 'light' ? 'dark' : 'light'
    theme.value = newTheme
    applyTheme(newTheme)
  }

  // 设置主题
  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme
    applyTheme(newTheme)
  }

  return {
    theme,
    toggleTheme,
    setTheme,
  }
}
