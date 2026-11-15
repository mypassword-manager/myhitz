<template>
  <div class="min-h-screen bg-spotify-black flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <RouterLink to="/" class="block text-center text-3xl font-bold text-spotify-green mb-8">My Hitz R-Cash</RouterLink>
      <div class="bg-spotify-card rounded-2xl p-6 md:p-8">
        <h1 class="text-2xl font-bold text-center mb-6">{{ t('auth.login') }}</h1>

        <div class="space-y-3 mb-6">
          <button @click="oauth('Google')" class="w-full flex items-center justify-center gap-3 bg-white text-black rounded-full py-3 font-semibold hover:bg-gray-200">
            <svg class="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            {{ t('auth.continueGoogle') }}
          </button>
          <button @click="oauth('Spotify')" class="w-full flex items-center justify-center gap-3 bg-[#1DB954] text-black rounded-full py-3 font-semibold hover:bg-[#1ED760]">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
            {{ t('auth.continueSpotify') }}
          </button>
          <button @click="oauth('Apple')" class="w-full flex items-center justify-center gap-3 bg-black border border-white/20 text-white rounded-full py-3 font-semibold hover:bg-white/10">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
            {{ t('auth.continueApple') }}
          </button>
        </div>

        <div class="flex items-center gap-4 my-6">
          <div class="flex-1 h-px bg-white/20"></div>
          <span class="text-xs text-gray-400">{{ t('auth.or') }}</span>
          <div class="flex-1 h-px bg-white/20"></div>
        </div>

        <div class="flex mb-4 bg-black/40 rounded-full p-1">
          <button @click="tab = 'pw'" :class="['flex-1 py-2 rounded-full text-xs font-semibold', tab === 'pw' ? 'bg-spotify-green text-black' : 'text-gray-400']">Username & Password</button>
          <button @click="tab = 'pin'" :class="['flex-1 py-2 rounded-full text-xs font-semibold', tab === 'pin' ? 'bg-spotify-green text-black' : 'text-gray-400']">Email + PIN</button>
        </div>

        <form v-if="tab === 'pw'" @submit.prevent="login" class="space-y-3">
          <input v-model="f.username" required :placeholder="t('auth.username')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <input v-model="f.password" type="password" required :placeholder="t('auth.password')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <FlashButton type="submit" class="w-full !py-3">{{ t('auth.login') }}</FlashButton>
        </form>

        <form v-else @submit.prevent="submitPin" class="space-y-3">
          <template v-if="!pinSent">
            <input v-model="f.email" type="email" required :placeholder="t('auth.email')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
            <FlashButton type="submit" class="w-full !py-3">Send PIN</FlashButton>
          </template>
          <template v-else>
            <p class="text-xs text-gray-400 text-center">Enter PIN sent to {{ f.email }}</p>
            <div class="flex gap-2 justify-center">
              <input v-for="i in 6" :key="i" v-model="pin[i-1]" maxlength="1" class="w-10 h-12 text-center bg-black/40 border border-white/20 rounded-lg focus:border-spotify-green" />
            </div>
            <FlashButton type="submit" class="w-full !py-3">{{ t('auth.login') }}</FlashButton>
          </template>
        </form>

        <p class="text-center text-sm text-gray-400 mt-6">
          {{ t('auth.noAccount') }} <RouterLink to="/register" class="text-spotify-green hover:underline">{{ t('auth.register') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import FlashButton from '@/components/FlashButton.vue'

const { t } = useI18n(), router = useRouter(), route = useRoute(), auth = useAuthStore()
const tab = ref('pw'), pinSent = ref(false)
const f = reactive({ username: '', password: '', email: '' })
const pin = ref(['','','','','',''])

function go(user) { auth.login(user); router.push(route.query.redirect || '/app') }
function login() { go({ name: f.username, username: f.username, email: f.username + '@example.com', avatar: `https://picsum.photos/seed/${f.username}/200/200`, provider: 'credentials' }) }
function submitPin() {
  if (!pinSent.value) { pinSent.value = true; return }
  go({ name: f.email.split('@')[0], email: f.email, avatar: `https://picsum.photos/seed/${f.email}/200/200`, provider: 'pin' })
}
function oauth(p) { go({ name: p + ' User', email: `user@${p.toLowerCase()}.com`, avatar: `https://picsum.photos/seed/${p}/200/200`, provider: p }) }
</script>
