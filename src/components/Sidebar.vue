<template>
  <aside class="w-60 bg-black p-4 flex flex-col gap-4 shrink-0">
    <RouterLink to="/app" class="text-xl font-bold text-spotify-green px-2">My Hitz R-Cash</RouterLink>
    <nav class="flex flex-col gap-1">
      <RouterLink v-for="item in items" :key="item.to" :to="item.to" exact-active-class="bg-white/10 text-spotify-green"
        class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition">
        <component :is="item.icon" class="w-5 h-5" />
        <span class="font-medium text-sm">{{ t(item.label) }}</span>
      </RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Home, Search, Heart, Download, LayoutDashboard, Settings } from 'lucide-vue-next'
const { t } = useI18n()
const items = [
  { to: '/app', icon: Home, label: 'nav.home' },
  { to: '/app/search', icon: Search, label: 'nav.search' },
  { to: '/app/liked', icon: Heart, label: 'nav.liked' },
  { to: '/app/downloads', icon: Download, label: 'nav.downloads' },
  { to: '/app/dashboard', icon: LayoutDashboard, label: 'nav.dashboard' },
  { to: '/app/settings', icon: Settings, label: 'nav.settings' }
]
</script>