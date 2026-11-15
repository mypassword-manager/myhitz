<template>
  <div class="bg-black border-t border-white/10 px-4 py-3 flex items-center gap-4">
    <div v-if="player.currentSong" class="flex items-center gap-3 w-56 md:w-64">
      <img :src="player.currentSong.cover" class="w-12 h-12 rounded" alt="" />
      <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold truncate">{{ player.currentSong.title }}</p>
        <p class="text-xs text-gray-400 truncate">{{ player.currentSong.artist }}</p>
      </div>
      <button @click="player.toggleLike(player.currentSong.id)"
        :class="['transition', player.isLiked(player.currentSong.id) ? 'text-spotify-green' : 'text-gray-400 hover:text-white']">
        <Heart class="w-5 h-5" :fill="player.isLiked(player.currentSong.id) ? 'currentColor' : 'none'" />
      </button>
    </div>
    <div v-else class="w-56 md:w-64 text-sm text-gray-400">{{ t('player.noSong') }}</div>

    <div class="flex-1 flex flex-col items-center gap-1">
      <div class="flex items-center gap-3 md:gap-4">
        <button @click="player.toggleShuffle" :class="['hidden md:block', player.shuffle ? 'text-spotify-green' : 'text-gray-400 hover:text-white']"><Shuffle class="w-4 h-4" /></button>
        <button class="text-gray-400 hover:text-white"><SkipBack class="w-4 h-4" /></button>
        <button @click="player.togglePlay" class="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition">
          <Pause v-if="player.isPlaying" class="w-5 h-5" fill="currentColor" />
          <Play v-else class="w-5 h-5" fill="currentColor" />
        </button>
        <button class="text-gray-400 hover:text-white"><SkipForward class="w-4 h-4" /></button>
        <button @click="player.cycleRepeat" :class="['hidden md:block relative', player.repeat !== 'off' ? 'text-spotify-green' : 'text-gray-400 hover:text-white']">
          <Repeat class="w-4 h-4" />
          <span v-if="player.repeat === 'one'" class="absolute -top-2 -right-1 text-[9px] font-bold">1</span>
        </button>
      </div>
      <div class="w-full max-w-md flex items-center gap-2 text-xs text-gray-400">
        <span>{{ fmt(player.progress) }}</span>
        <input type="range" :min="0" :max="player.duration || 100" :value="player.progress" @input="seek" class="flex-1 accent-spotify-green" />
        <span>{{ fmt(player.duration) }}</span>
      </div>
    </div>

    <div class="hidden md:flex w-32 md:w-48 items-center gap-2">
      <button @click="player.toggleMute">
        <VolumeX v-if="player.isMuted" class="w-4 h-4" />
        <Volume2 v-else class="w-4 h-4" />
      </button>
      <input type="range" min="0" max="1" step="0.01" :value="player.volume" @input="setVol" class="flex-1 accent-spotify-green" />
    </div>

    <audio ref="el" :src="player.currentSong?.audio" @timeupdate="onTime" @loadedmetadata="onMeta" @ended="onEnd" class="hidden"></audio>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat, Volume2, VolumeX, Heart } from 'lucide-vue-next'
import { usePlayerStore } from '@/stores/player'

const player = usePlayerStore(), { t } = useI18n(), el = ref(null)
const fmt = (s) => { if (!s) return '0:00'; const m = Math.floor(s/60), sec = Math.floor(s%60); return `${m}:${String(sec).padStart(2,'0')}` }

function onTime() { if (el.value) player.setProgress(el.value.currentTime) }
function onMeta() { if (el.value) player.setDuration(el.value.duration) }
function onEnd() { player.isPlaying = false }
function seek(e) { if (el.value) { el.value.currentTime = +e.target.value; player.setProgress(+e.target.value) } }
function setVol(e) { player.setVolume(+e.target.value); if (el.value) el.value.volume = player.volume }

watch(() => player.currentSong, () => setTimeout(() => {
  if (el.value && player.isPlaying) el.value.play().catch(() => {})
}, 60))
watch(() => player.isPlaying, (p) => { if (!el.value) return; p ? el.value.play().catch(() => {}) : el.value.pause() })
watch(() => player.volume, (v) => { if (el.value) el.value.volume = player.isMuted ? 0 : v })
watch(() => player.isMuted, (m) => { if (el.value) el.value.volume = m ? 0 : player.volume })
onMounted(() => { if (el.value) el.value.volume = player.volume })
</script>