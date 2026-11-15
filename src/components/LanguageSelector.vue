<template>
  <div class="relative" ref="root">
    <button @click="open = !open" class="flex items-center gap-1 text-sm hover:text-spotify-green">
      <Globe class="w-4 h-4" /><span class="hidden sm:inline">{{ current.toUpperCase() }}</span>
    </button>
    <div v-if="open" class="absolute right-0 mt-2 w-48 bg-spotify-card rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto">
      <button v-for="l in langs" :key="l.code" @click="select(l.code)"
        :class="['block w-full text-left px-4 py-2 text-sm hover:bg-white/10', current === l.code ? 'text-spotify-green font-semibold' : 'text-white']">
        {{ l.name }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Globe } from 'lucide-vue-next'

const { locale } = useI18n()
const open = ref(false)
const root = ref(null)
const current = computed(() => locale.value)
const langs = [
  { code: 'en', name: 'English' }, { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'zh', name: '中文 (Soon)' }, { code: 'ja', name: '日本語 (Soon)' },
  { code: 'ko', name: '한국어 (Soon)' }, { code: 'es', name: 'Español (Soon)' },
  { code: 'fr', name: 'Français (Soon)' }, { code: 'de', name: 'Deutsch (Soon)' },
  { code: 'pt', name: 'Português (Soon)' }, { code: 'it', name: 'Italiano (Soon)' },
  { code: 'ru', name: 'Русский (Soon)' }, { code: 'ar', name: 'العربية (Soon)' },
  { code: 'hi', name: 'हिन्दी (Soon)' }, { code: 'th', name: 'ไทย (Soon)' },
  { code: 'vi', name: 'Tiếng Việt (Soon)' }, { code: 'id', name: 'Bahasa Indonesia (Soon)' },
  { code: 'tr', name: 'Türkçe (Soon)' }, { code: 'nl', name: 'Nederlands (Soon)' },
  { code: 'pl', name: 'Polski (Soon)' }, { code: 'sv', name: 'Svenska (Soon)' }
]
function select(c) { locale.value = (c === 'en' || c === 'ms') ? c : 'en'; localStorage.setItem('lang', c); open.value = false }
function outside(e) { if (root.value && !root.value.contains(e.target)) open.value = false }
onMounted(() => document.addEventListener('click', outside))
onUnmounted(() => document.removeEventListener('click', outside))
</script>