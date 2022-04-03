export default {
  head: {
    title: 'Monopoly Play',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
    ],
  },
  debug: process.env.NODE_ENV === 'development',
  telemetry: true,
  // modern: 'client',
  router: {
    prefetchLinks: false,
  },
  loading: false,
  layoutTransition: {
    name: 'page',
    mode: 'out-in',
  },
  pageTransition: {
    name: 'page',
    mode: 'out-in',
  },
  components: true,
  css: [
    { src: '~/assets/sass/main.sass', lang: 'sass' },
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/moment',
    '@nuxtjs/vuetify',
  ],
  plugins: [
    '~/plugins/global-components.js',
    '~/plugins/vuelidate.js',
    { src: '~/plugins/spinner.js', mode: 'client' },
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    'cookie-universal-nuxt',
    '@nuxt/http',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase',
  ],
  render: {
    resourceHints: false,
  },
  build: {
    minimize: true,
    optimizeCSS: true,
    publicPath: '/game-app/',
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    // babel: {
    //   presets: [
    //     ['@nuxt/babel-preset-app'],
    //   ],
    // },
    extend(config, { isDev }) {
      if (isDev) {
        config.devtool = process.env.NODE_ENV === 'development' ? 'eval-source-map' : '';
      }
    },
  },
  vuetify: {
    customVariables: ['~/assets/sass/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#9253f7',
          accent: '#f4f5fa',
          secondary: '#f4f5fa',
          info: '#f2eafd',
          warning: '#f6b443',
          error: '#ed484e',
          success: '#5eca33',
          background: '#f4f5fa',
        },
      },
    },
  },
  axios: {
    baseURL: '/api/',
  },
  serverMiddleware: {
    '/api': '~/api',
  },
  moment: {
    timezone: true,
    defaultTimezone: 'Europe/Kiev',
  },
  i18n: {
    detectBrowserLanguage: false,
    routesNameSeparator: '_',
    seo: true,
    locales: [
      {
        code: 'uk',
        iso: 'uk',
        file: 'uk.js',
      },
      {
        code: 'en',
        iso: 'en',
        file: 'en.js',
      },
    ],
    defaultLocale: 'uk',
    lazy: true,
    langDir: 'lang/',
    vueI18nLoader: true,
  },
  pwa: {
    meta: false,
    icon: false,
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js',
      ],
      dev: process.env.NODE_ENV === 'development',
    },
  },
  firebase: {
    config: {
      apiKey: 'AIzaSyBi3WaFO8e8vVE12OAhPlxULEVxvJZRskY',
      authDomain: 'monopoly-236a1.firebaseapp.com',
      databaseURL: 'https://monopoly-236a1-default-rtdb.firebaseio.com',
      projectId: 'monopoly-236a1',
      storageBucket: 'monopoly-236a1.appspot.com',
      messagingSenderId: '847357379377',
      appId: '1:847357379377:web:bae8700a62b988a8972610',
      measurementId: 'G-C7RP74F6F3',
    },
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedAction: 'auth/onAuthStateChangedAction',
        },
        ssr: true,
      },
      database: true,
    },
  },
};
