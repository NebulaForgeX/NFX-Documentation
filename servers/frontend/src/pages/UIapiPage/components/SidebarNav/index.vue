<template>
  <aside :class="[styles.sidebar, { [styles.collapsed]: collapsed }]">
    <div :class="styles.sidebarHeader">
      <button
        type="button"
        :class="styles.toggleBtn"
        :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        @click="$emit('toggle')"
      >
        <PanelLeftClose v-if="!collapsed" :size="20" />
        <PanelLeftOpen v-else :size="20" />
      </button>
      <h2 v-show="!collapsed" :class="styles.sidebarTitle">{{ $t('uiApi.title') }}</h2>
    </div>
    <div v-show="!collapsed" :class="styles.sidebarScroll">
    <ul :class="styles.navList">
      <li :class="styles.navItem">
        <router-link
          to="/ui-api/overview"
          :class="[styles.navLink, { [styles.active]: route.path === '/ui-api/overview' }]"
        >
          {{ t('uiApi.sections.overview.title') }}
        </router-link>
      </li>
      <li v-for="section in sectionIds" :key="section" :class="styles.navItem">
        <template v-if="sectionDocs[section]?.length">
          <div :class="styles.sectionRow">
            <router-link
              :to="`/ui-api/${section}`"
              :class="[styles.navLink, styles.sectionLink, { [styles.active]: isSectionActive(section) && !route.params.doc }]"
            >
              {{ t(`uiApi.sections.${section}.title`) }}
            </router-link>
            <button
              type="button"
              :class="[styles.chevronBtn, { [styles.chevronOpen]: expandedSections[section] }]"
              :aria-label="expandedSections[section] ? 'Collapse' : 'Expand'"
              @click="toggleSection(section)"
            >
              <ChevronDown :size="18" />
            </button>
          </div>
          <ul :class="[styles.subList, { [styles.subListExpanded]: expandedSections[section] }]">
            <li v-for="doc in sectionDocs[section]" :key="doc" :class="styles.subItem">
              <router-link
                :to="`/ui-api/${section}/${doc}`"
                :class="[styles.subLink, { [styles.active]: isDocActive(section, doc) }]"
              >
                {{ docSlugToTitle(doc) }}
              </router-link>
            </li>
          </ul>
        </template>
        <router-link
          v-else
          :to="`/ui-api/${section}`"
          :class="[styles.navLink, { [styles.active]: isSectionActive(section) }]"
        >
          {{ t(`uiApi.sections.${section}.title`) }}
        </router-link>
      </li>
    </ul>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { reactive, watch } from 'vue'
import { PanelLeftClose, PanelLeftOpen, ChevronDown } from 'lucide-vue-next'
import { sectionDocs, docSlugToTitle } from '../../config/sectionDocs'
import styles from './styles.module.css'

defineProps<{ collapsed: boolean }>()
defineEmits<{ toggle: [] }>()

const route = useRoute()
const { t } = useI18n()

const sectionIds = [
  'apis',
  'animations',
  'components',
  'constants',
  'events',
  'hooks',
  'icons',
  'languages',
  'layouts',
  'navigations',
  'preference',
  'services',
  'stores',
  'themes',
  'types',
  'utils',
] as const

const expandedSections = reactive<Record<string, boolean>>({})

function initExpanded() {
  sectionIds.forEach((id) => {
    if (sectionDocs[id]?.length) {
      expandedSections[id] = false
    }
  })
}
initExpanded()

watch(
  () => route.path,
  (path) => {
    const m = path.match(/^\/ui-api\/([^/]+)/)
    const section = m?.[1]
    if (section && sectionDocs[section]?.length) {
      expandedSections[section] = true
    }
  },
  { immediate: true }
)

function toggleSection(section: string) {
  if (sectionDocs[section]?.length) {
    expandedSections[section] = !expandedSections[section]
  }
}

function isSectionActive(section: string): boolean {
  return route.params.section === section
}

function isDocActive(section: string, doc: string): boolean {
  return route.params.section === section && route.params.doc === doc
}
</script>
