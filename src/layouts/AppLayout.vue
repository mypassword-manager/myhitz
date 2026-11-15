<template>
  <div class="h-screen bg-spotify-black text-white flex flex-col overflow-hidden">
    <div class="flex-1 flex overflow-hidden">
      <Sidebar class="hidden md:flex" />
      <div v-if="mobileOpen" class="fixed inset-0 z-50 md:hidden">
        <div class="absolute inset-0 bg-black/70" @click="mobileOpen = false"></div>
        <Sidebar class="absolute left-0 top-0 h-full z-50" />
      </div>
      <div class="flex-1 flex flex-col overflow-hidden">
        <AppNavbar @toggle-mobile="mobileOpen = !mobileOpen" />
        <main class="flex-1 overflow-y-auto p-6"><RouterView /></main>
      </div>
    </div>
    <NowPlayingBar />
    <Mascot />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import AppNavbar from '@/components/AppNavbar.vue'
import NowPlayingBar from '@/components/NowPlayingBar.vue'
import Mascot from '@/components/Mascot.vue'
const mobileOpen = ref(false)
</script>