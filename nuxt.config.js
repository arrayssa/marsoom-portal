export default defineNuxtConfig({
  typescript: false,
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: 'Ems Portal',
      link: [
        {
          id: 'theme-css',
          rel: 'stylesheet',
          type: 'text/css',
          href: '/themes/aura-light-green/theme.css'
        }
      ]
    }
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-primevue', '@nuxtjs/i18n', '@pinia/nuxt', '@vee-validate/nuxt'],
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL
    }
  },
  plugins: ['~/plugins/vueGoogleMaps.js', '~/plugins/date.js','~/plugins/axios.js'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en', name: 'English', alpha2: 'en', dir: 'ltr', lang: 'en', file: 'en.json' },
      { code: 'ar', iso: 'ar', name: 'Arabic', alpha2: 'ar', dir: 'rtl', lang: 'ar', file: 'ar.json' }
    ],
    langDir: 'lang',
    lazy: true,
    legacy: false,
    strategy: 'prefix',
    defaultLocale: 'en',
    // detectBrowserLanguage: false,
    detectBrowserLanguage: {
      useCookie: false
    },
    vueI18n: './lang/i18n.config.js'
  },
  routeRules: {
    '/': { redirect: '/en' }
  },
  primevue: {
    options: { ripple: true },
    components: {
      exclude: ['Editor']
    }
  },
  css: ['primeicons/primeicons.css', 'primeflex/primeflex.scss', 'primevue/resources/primevue.min.css', '@/assets/styles.scss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@fawmi/vue-google-maps', 'fast-deep-equal']
    }
  }
});
