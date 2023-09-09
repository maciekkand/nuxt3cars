// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  builder: 'webpack',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
  ],
  pages: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  meta: {
    title: 'Cars',
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      htmlAttrs: {
        lang: "en",
      },
    }
  }
})
