<template>
  <div>
    <h1 class="text-3xl font-bold mb-6 flex items-center gap-2"><Heart class="text-spotify-green" /> Liked Songs</h1>
    <div v-if="liked.length === 0" class="text-gray-400">No liked songs yet</div>
    <div v-else class="space-y-2">
      <div v-for="s in liked" :key="s.id" class="flex items-center gap-3 p-2 rounded hover:bg-white/10">
        <button @click="player.playSong(s)" class="w-10 h-10 rounded-full bg-spotify-green text-black flex items-center justify-center"><Play class="w-4 h-4" fill="currentColor" /></button>
        <img :src="s.cover" class="w-12 h-12 rounded" alt="" />
        <div class="flex-1 min-w-0">
          <p class="font-semibold truncate">{{ s.title }}</p>
          <p class="text-xs text-gray-400 truncate">{{ s.artist }}</p>
        </div>
        <button @click="player.toggleLike(s.id)" class="text-spotify-green"><Heart class="w-5 h-5" fill="currentColor" /></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Heart, Play } from 'lucide-vue-next'
import { songs } from '@/data/songs'
import { usePlayerStore } from '@/stores/player'
const player = usePlayerStore()
const liked = computed(() => songs.filter(s => player.likedSongs.includes(s.id)))
</script>
