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
        {{ $t('common.nav.home') }}
      </router-link>
      <router-link to="/repo" :class="[styles.navLink, { [styles.active]: $route.path === '/repo' }]">
        {{ $t('common.nav.repo') }}
      </router-link>
      <router-link to="/about" :class="[styles.navLink, { [styles.active]: $route.path === '/about' }]">
        {{ $t('common.nav.about') }}
      </router-link>
    </nav>

    <div :class="styles.rightContainer">
      <ThemeSwitcher />
      <LanguageSwitcher />
    </div>
  </header>
</template>

<script setup lang="ts">
import ThemeSwitcher from '@/components/ThemeSwitcher/index.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher/index.vue'
import styles from './styles.module.css'
</script>

