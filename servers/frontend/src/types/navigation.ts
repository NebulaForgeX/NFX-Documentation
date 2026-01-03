export const ROUTES = {
  HOME: '/',
  CHAPTER_ZH: '/zh/:chapter',
  CHAPTER_EN: '/en/:chapter',
} as const

export type RouteName = 'HOME' | 'CHAPTER_ZH' | 'CHAPTER_EN'

