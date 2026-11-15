<template>
  <div class="space-y-10">
    <!-- SEKSYEN LAGU (Sedia Ada) -->
    <section>
      <h1 class="text-3xl font-bold mb-4">Good evening</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <button v-for="s in songs.slice(0,6)" :key="s.id" @click="play(s)" class="flex items-center gap-3 bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition text-left">
          <img :src="s.cover" class="w-16 h-16" alt="" />
          <span class="font-semibold text-sm truncate">{{ s.title }}</span>
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Trending Now</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        <button v-for="s in songs" :key="s.id" @click="play(s)" class="bg-spotify-card p-3 rounded-lg hover:bg-white/10 transition text-left group">
          <div class="relative mb-3">
            <img :src="s.cover" class="w-full aspect-square rounded-md" alt="" />
            <div class="absolute bottom-2 right-2 w-10 h-10 rounded-full bg-spotify-green text-black items-center justify-center opacity-0 group-hover:opacity-100 transition hidden md:flex">
              <Play class="w-5 h-5" fill="currentColor" />
            </div>
          </div>
          <p class="font-semibold text-sm truncate">{{ s.title }}</p>
          <p class="text-xs text-gray-400 truncate">{{ s.artist }}</p>
        </button>
      </div>
    </section>

    <!-- SEKSYEN VIDEO BARU -->
    <section>
      <div class="flex items-center gap-2 mb-4">
        <VideoIcon class="w-6 h-6 text-spotify-green" />
        <h2 class="text-2xl font-bold">Video Terkini</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button v-for="v in videos" :key="v.id" @click="openVideo(v)" class="text-left group">
          <div class="relative mb-2 rounded-lg overflow-hidden">
            <img :src="v.thumbnail" class="w-full aspect-video object-cover group-hover:scale-105 transition" alt="" />
            <span class="absolute bottom-2 right-2 bg-black/80 px-1.5 py-0.5 rounded text-xs font-medium">{{ v.duration }}</span>
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <Play class="w-10 h-10 text-white" fill="currentColor" />
            </div>
          </div>
          <p class="font-semibold text-sm line-clamp-2">{{ v.title }}</p>
          <p class="text-xs text-gray-400">{{ v.artist }} • {{ v.views }} views</p>
        </button>
      </div>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Popular Artists</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div v-for="a in artists" :key="a.id" class="text-center">
          <img :src="a.image" class="w-full aspect-square rounded-full mb-2 object-cover" alt="" />
          <p class="font-semibold text-sm">{{ a.name }}</p>
          <p class="text-xs text-gray-400">{{ a.followers }} followers</p>
        </div>
      </div>
    </section>

    <!-- MODAL VIDEO PLAYER -->
    <div v-if="activeVideo" class="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" @click.self="activeVideo = null">
      <div class="w-full max-w-4xl">
        <div class="flex justify-end mb-2">
          <button @click="activeVideo = null" class="text-white hover:text-spotify-green"><X class="w-8 h-8" /></button>
        </div>
        <video :src="activeVideo.videoUrl" controls autoplay class="w-full rounded-lg shadow-2xl aspect-video bg-black"></video>
        <h3 class="text-xl font-bold mt-4">{{ activeVideo.title }}</h3>
        <p class="text-sm text-gray-400">{{ activeVideo.artist }} • {{ activeVideo.views }} views</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Play, Video as VideoIcon, X } from 'lucide-vue-next'
import { songs, artists } from '@/data/songs'
import { videos } from '@/data/videos'
import { usePlayerStore } from '@/stores/player'

const player = usePlayerStore()
const play = (s) => player.playSong(s)

// Logik Video
const activeVideo = ref(null)
const openVideo = (video) => {
  // Jeda lagu jika sedang dimainkan supaya tak overlap
  if (player.isPlaying) player.togglePlay()
  activeVideo.value = video
}
</script>