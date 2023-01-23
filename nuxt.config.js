export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CRM Albvt',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/css/main.css',
    '@/assets/css/buefy.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/vue-good-table', ssr: false },
    { src: "~/plugins/vClickOutside", ssr: false }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/postcss8', '@nuxtjs/google-fonts'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxtjs/apollo',
    '@nuxtjs/auth-next',

    "vue-toastification/nuxt"
  ],

  router: {
    middleware: ['auth']
  },
  auth: {
    strategies: {
      graphql: {
        scheme: '~/schemes/graphqlScheme.js'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: false,
      home: '/vrachi'
    }
  },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'https://api.albvt.ru/graphql'
      }
    }
  },

  googleFonts: {
    display: 'swap',
    download: true,
    preconnect: true,
    families: {
      Mulish: {
        wght: [600, 400, 700]
      }
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-custom-properties': false
      }
    }
  }
}
