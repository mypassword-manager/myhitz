<template>
  <div>
    <section class="relative bg-gradient-to-b from-spotify-green/20 via-spotify-black to-spotify-black py-16 md:py-24 px-4">
      <div class="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">{{ t('landing.heroTitle') }}</h1>
          <p class="text-lg md:text-xl text-gray-300 mb-8">{{ t('landing.heroSubtitle') }}</p>
          <div class="flex flex-wrap gap-4">
            <FlashButton @click="$router.push('/register')" class="text-base md:text-lg">{{ t('landing.ctaPrimary') }}</FlashButton>
            <FlashButton variant="outline" @click="$router.push('/login')" :flash="false" class="text-base md:text-lg">{{ t('landing.ctaSecondary') }}</FlashButton>
          </div>
        </div>
        <div class="hidden md:grid grid-cols-2 gap-4">
          <img v-for="i in 4" :key="i" :src="`https://picsum.photos/seed/hero${i}/400/400`" class="rounded-xl shadow-2xl" alt="Music" />
        </div>
      </div>
    </section>

    <section class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Why My Hitz R-Cash?</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="f in features" :key="f.title" class="bg-spotify-card p-6 rounded-xl">
            <component :is="f.icon" class="w-8 h-8 text-spotify-green mb-4" />
            <h3 class="font-bold mb-2">{{ f.title }}</h3>
            <p class="text-sm text-gray-400">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 bg-spotify-dark">
      <div class="max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">{{ t('landing.faqTitle') }}</h2>
        <FAQAccordion v-for="(f, i) in faqs" :key="i" :question="f.q" :answer="f.a" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { Music, Download, ListMusic, Radio } from 'lucide-vue-next'
import FlashButton from '@/components/FlashButton.vue'
import FAQAccordion from '@/components/FAQAccordion.vue'

const { t } = useI18n()
const features = [
  { icon: Music, title: 'HD Streaming', desc: 'Crystal clear audio quality' },
  { icon: Download, title: 'Offline Mode', desc: 'Download and listen anywhere' },
  { icon: ListMusic, title: 'Playlists', desc: 'Create and share playlists' },
  { icon: Radio, title: 'Lossless Audio', desc: 'Premium sound for audiophiles' }
]
const faqs = [
  { q: 'Is My Hitz R-Cash free?', a: 'Yes, our basic tier is completely free. Premium plans unlock lossless audio and more.' },
  { q: 'Can I download songs?', a: 'Yes, you can download songs for offline listening.' },
  { q: 'How do I cancel?', a: 'You can cancel anytime from Settings → Account.' },
  { q: 'Which devices are supported?', a: 'Web, mobile, and desktop apps are all supported.' }
]
</script>
