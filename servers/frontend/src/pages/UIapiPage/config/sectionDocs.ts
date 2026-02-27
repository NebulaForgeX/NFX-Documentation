/**
 * Doc slugs per section (filename without .md).
 * Used to build sidebar sub-links and /ui-api/:section/:doc routes.
 */
export const sectionDocs: Record<string, string[]> = {
  apis: ['ip'],
  animations: [
    'bounce-loading',
    'ecg-loading',
    'letter-glitch-background',
    'pixel-blast-background',
    'square-background',
    'truck-loading',
    'wave-background',
  ],
  components: [
    'button',
    'dropdown',
    'icon',
    'icon-button',
    'input',
    'key-value-editor',
    'search-input',
    'show-filter',
    'slide-down-switcher',
    'slider',
    'suspense',
    'textarea',
    'virtual-list',
    'virtual-window-list',
  ],
  constants: [],
  events: [],
  hooks: [
    'make-cursor-fetch-function',
    'make-string-cursor-fetch-function',
    'make-unified-infinite-query',
    'make-unified-query',
  ],
  icons: ['lucide'],
  languages: ['get-local-language', 'language-provider', 'language-switcher'],
  layouts: [
    'background',
    'footer',
    'header',
    'layout-provider',
    'layout-switcher',
    'main-wrapper',
    'sidebar',
    'side-hide-layout',
    'side-show-layout',
    'use-action',
    'use-layout',
    'use-set',
  ],
  navigations: ['navigation'],
  preference: [],
  services: ['image-service'],
  stores: ['make-store'],
  themes: ['theme-provider', 'theme-switcher'],
  types: ['api', 'utils'],
  utils: [
    'address',
    'api-error',
    'array',
    'colors',
    'email',
    'form',
    'object',
    'phone',
    'polling',
    'price',
    'promise',
    'result',
    'retry',
    'singleton',
    'suspense',
    'time',
    'types',
  ],
}

/** Human-readable label for doc slug (e.g. button -> Button) */
export function docSlugToTitle(slug: string): string {
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}
