import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import {
  HomePage,
  Chapter01Page,
  Chapter02Page,
  Chapter03Page,
  Chapter04Page,
  Chapter05Page,
  NotFoundPage,
  RepoPage,
  AboutPage,
  UIapiPage,
} from '@/pages'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/repo',
    name: 'Repo',
    component: RepoPage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
  },
  {
    path: '/ui-api',
    name: 'UIapi',
    component: UIapiPage,
    redirect: { name: 'UIapiOverview' },
    children: [
      {
        path: 'overview',
        name: 'UIapiOverview',
        component: () => import('@/pages/UIapiPage/pages/OverviewPage/index.vue'),
      },
      {
        path: ':section/:doc?',
        name: 'UIapiSection',
        component: () => import('@/pages/UIapiPage/pages/SectionPage/index.vue'),
      },
    ],
  },
  // 中文章节路由
  {
    path: '/zh/chapter-01-router-configuration',
    name: 'Chapter01Zh',
    component: Chapter01Page,
  },
  {
    path: '/zh/chapter-02-nas-setup',
    name: 'Chapter02Zh',
    component: Chapter02Page,
  },
  {
    path: '/zh/chapter-03-nfx-stack-deployment',
    name: 'Chapter03Zh',
    component: Chapter03Page,
  },
  {
    path: '/zh/chapter-04-nfx-edge-deployment',
    name: 'Chapter04Zh',
    component: Chapter04Page,
  },
  {
    path: '/zh/chapter-05-nfx-vault-deployment',
    name: 'Chapter05Zh',
    component: Chapter05Page,
  },
  // 英文章节路由
  {
    path: '/en/chapter-01-router-configuration',
    name: 'Chapter01En',
    component: Chapter01Page,
  },
  {
    path: '/en/chapter-02-nas-setup',
    name: 'Chapter02En',
    component: Chapter02Page,
  },
  {
    path: '/en/chapter-03-nfx-stack-deployment',
    name: 'Chapter03En',
    component: Chapter03Page,
  },
  {
    path: '/en/chapter-04-nfx-edge-deployment',
    name: 'Chapter04En',
    component: Chapter04Page,
  },
  {
    path: '/en/chapter-05-nfx-vault-deployment',
    name: 'Chapter05En',
    component: Chapter05Page,
  },
  // 404 页面（必须放在最后）
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

