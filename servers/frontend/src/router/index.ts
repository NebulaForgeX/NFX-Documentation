import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { HomePage, ChapterPage } from '@/pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/zh/:chapter',
    name: 'ChapterZh',
    component: ChapterPage,
    props: true,
  },
  {
    path: '/en/:chapter',
    name: 'ChapterEn',
    component: ChapterPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

