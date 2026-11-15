<template>
  <div class="min-h-screen bg-spotify-black flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <RouterLink to="/" class="block text-center text-3xl font-bold text-spotify-green mb-8">My Hitz R-Cash</RouterLink>
      <div class="bg-spotify-card rounded-2xl p-6 md:p-8">
        <h1 class="text-2xl font-bold text-center mb-6">{{ t('auth.register') }}</h1>
        <form @submit.prevent="submit" class="space-y-3">
          <input v-model="f.name" required :placeholder="t('auth.fullName')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <input v-model="f.username" required :placeholder="t('auth.username')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <input v-model="f.email" type="email" required :placeholder="t('auth.email')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <input v-model="f.password" type="password" required minlength="6" :placeholder="t('auth.password')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <input v-model="f.confirm" type="password" required :placeholder="t('auth.confirmPassword')" class="w-full bg-black/40 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:border-spotify-green" />
          <label class="flex items-center gap-2 text-xs text-gray-400">
            <input type="checkbox" required class="accent-spotify-green" />
            <span>I agree to <RouterLink to="/terms" class="text-spotify-green">Terms</RouterLink> & <RouterLink to="/privacy" class="text-spotify-green">Privacy Policy</RouterLink></span>
          </label>
          <FlashButton type="submit" class="w-full !py-3">Create Account</FlashButton>
        </form>
        <p class="text-center text-sm text-gray-400 mt-6">
          {{ t('auth.haveAccount') }} <RouterLink to="/login" class="text-spotify-green hover:underline">{{ t('auth.login') }}</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/auth'
import FlashButton from '@/components/FlashButton.vue'

const { t } = useI18n(), router = useRouter(), auth = useAuthStore()
const f = reactive({ name: '', username: '', email: '', password: '', confirm: '' })

function submit() {
  if (f.password !== f.confirm) { alert('Passwords do not match'); return }
  auth.login({ name: f.name, username: f.username, email: f.email, avatar: `https://picsum.photos/seed/${f.username}/200/200`, provider: 'credentials' })
  router.push('/app')
}
</script>
