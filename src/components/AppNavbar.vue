<template>
  <header class="bg-spotify-dark border-b border-white/10 px-4 py-3 flex items-center gap-4">
    <button @click="$emit('toggle-mobile')" class="md:hidden"><Menu class="w-6 h-6" /></button>
    <div class="flex-1 max-w-md">
      <div class="relative">
        <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input v-model="query" @input="onSearch" :placeholder="t('common.search')"
          class="w-full bg-black/40 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-spotify-green" />
      </div>
    </div>
    <div class="flex items-center gap-3">
      <LanguageSelector />
      <div class="relative" ref="root">
        <button @click="open = !open"><img :src="auth.user?.avatar" class="w-8 h-8 rounded-full" alt="avatar" /></button>
        <div v-if="open" class="absolute right-0 mt-2 w-48 bg-spotify-card rounded-lg shadow-xl py-2 z-50">
          <RouterLink to="/app/dashboard" class="block px-4 py-2 text-sm hover:bg-white/10">{{ t('nav.dashboard') }}</RouterLink>
          <RouterLink to="/app/settings" class="block px-4 py-2 text-sm hover:bg-white/10">{{ t('nav.settings') }}</RouterLink>
          <button @click="logout" class="block w-full text-left px-4 py-2 text-sm hover:bg-white/10 text-red-400">{{ t('nav.logout') }}</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Menu, Search } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import LanguageSelector from './LanguageSelector.vue'

defineEmits(['toggle-mobile'])
const router = useRouter(), auth = useAuthStore(), { t } = useI18n()
const query = ref(''), open = ref(false), root = ref(null)
function onSearch() { router.push({ path: '/app/search', query: { q: query.value } }) }
function logout() { auth.logout(); router.push('/') }
function outside(e) { if (root.value && !root.value.contains(e.target)) open.value = false }
onMounted(() => document.addEventListener('click', outside))
onUnmounted(() => document.removeEventListener('click', outside))
</script>