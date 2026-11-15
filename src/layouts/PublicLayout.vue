<template>
  <div class="min-h-screen bg-spotify-black text-white flex flex-col">
    <PublicNavbar />
    <main class="flex-1"><RouterView /></main>
    <PublicFooter />
    <Mascot />
  </div>
</template>

<script setup>
import PublicNavbar from '@/components/PublicNavbar.vue'
import PublicFooter from '@/components/PublicFooter.vue'
import Mascot from '@/components/Mascot.vue'
</script>