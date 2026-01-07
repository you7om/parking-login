import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/ui"],
  ssr: true,      // wichtig für generate
  nitro: {
    preset: 'static'
  },
  vite: {
    plugins: [tailwindcss()],
  },

  app: {
    head: {
      htmlAttrs: {
        class: 'light',
        lang: 'de'
      },
      title: "Parking Soft",
      meta: [
        { name: "description", content: "Login Page for Parking Soft" },
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0",
        },
      ],
    },
  },

  runtimeConfig: {
    public: {
      apiBase: "https://dev.parkingsoft.de/customer/api",
    },
  },
});