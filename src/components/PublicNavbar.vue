<template>
  <nav class="sticky top-0 z-40 bg-spotify-black/80 backdrop-blur-md border-b border-white/10">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <RouterLink to="/" class="text-lg md:text-xl font-bold text-spotify-green">My Hitz R-Cash</RouterLink>
      <div class="hidden md:flex items-center gap-6">
        <RouterLink to="/" class="hover:text-spotify-green transition text-sm">{{ t('nav.home') }}</RouterLink>
        <RouterLink to="/about" class="hover:text-spotify-green transition text-sm">About</RouterLink>
        <RouterLink to="/contact" class="hover:text-spotify-green transition text-sm">Contact</RouterLink>
      </div>
      <div class="flex items-center gap-2 md:gap-3">
        <LanguageSelector />
        <RouterLink to="/login" class="text-xs md:text-sm font-semibold hover:text-spotify-green">{{ t('nav.login') }}</RouterLink>
        <FlashButton @click="$router.push('/register')" class="text-xs md:text-sm !py-2 !px-4">{{ t('nav.register') }}</FlashButton>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import FlashButton from './FlashButton.vue'
import LanguageSelector from './LanguageSelector.vue'
const { t } = useI18n()
</script>