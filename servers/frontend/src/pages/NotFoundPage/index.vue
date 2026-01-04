<template>
  <div :class="styles.container">
    <h1 :class="styles.title">404</h1>
    <h2 :class="styles.subtitle">{{ $t('notFound.title') }}</h2>
    <p :class="styles.description">
      {{ $t('notFound.description') }}
    </p>
    <router-link to="/" :class="styles.backButton">
      {{ $t('notFound.backToHome') }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'
</script>

