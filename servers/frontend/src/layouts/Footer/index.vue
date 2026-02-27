<template>
  <footer :class="styles.footer">
    <div :class="styles.footerContent">
      <span :class="styles.copyright">
        © {{ currentYear }} {{ $t('common.footer.copyright') }}
      </span>
      <div :class="styles.links">
        <router-link to="/about" :class="styles.link">
          {{ $t('common.footer.about') }}
        </router-link>
        <a href="https://github.com/NebulaForgeX/NFX-Documentation" target="_blank" rel="noopener noreferrer" :class="styles.link">
          {{ $t('common.footer.github') }}
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import styles from './styles.module.css'

const currentYear = computed(() => new Date().getFullYear())
</script>

