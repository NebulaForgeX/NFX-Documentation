<template>
  <div :class="styles.home">
    <header :class="styles.header">
      <h1>NFX-Policy</h1>
      <p>NebulaForgeX 项目部署与配置策略文档</p>
    </header>
    <main :class="styles.main">
      <section :class="styles.chapters">
        <h2>中文版 (Chinese)</h2>
        <ul>
          <li v-for="chapter in zhChapters" :key="chapter.id">
            <router-link :to="`/zh/${chapter.id}`">
              {{ chapter.title }}
            </router-link>
          </li>
        </ul>
      </section>
      <section :class="styles.chapters">
        <h2>English Version</h2>
        <ul>
          <li v-for="chapter in enChapters" :key="chapter.id">
            <router-link :to="`/en/${chapter.id}`">
              {{ chapter.title }}
            </router-link>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import styles from './styles.module.css'

const zhChapters = [
  { id: 'chapter-01-router-configuration', title: '第一章节：路由器配置与网络安全设置' },
  { id: 'chapter-02-nas-setup', title: '第二章节：NAS 系统初始化与开发环境配置' },
  { id: 'chapter-03-nfx-stack-deployment', title: '第三章节：NFX Stack 核心资源栈部署' },
  { id: 'chapter-04-nfx-edge-deployment', title: '第四章节：NFX-Edge 反向代理与多网站管理部署' },
  { id: 'chapter-05-nfx-vault-deployment', title: '第五章节：NFX-Vault 证书管理系统部署' },
]

const enChapters = [
  { id: 'chapter-01-router-configuration', title: 'Chapter 1: Router Configuration and Network Security Setup' },
  { id: 'chapter-02-nas-setup', title: 'Chapter 2: NAS System Initialization and Development Environment Configuration' },
  { id: 'chapter-03-nfx-stack-deployment', title: 'Chapter 3: NFX Stack Core Resource Stack Deployment' },
  { id: 'chapter-04-nfx-edge-deployment', title: 'Chapter 4: NFX-Edge Reverse Proxy and Multi-Website Management Deployment' },
  { id: 'chapter-05-nfx-vault-deployment', title: 'Chapter 5: NFX-Vault Certificate Management System Deployment' },
]
</script>
