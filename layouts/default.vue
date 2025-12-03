<template>
  <div class="relative w-full">
    <!-- Fixiertes Hintergrundbild -->
    <div class="fixed inset-0 bg-[url('/img/parking-cover-cropped.png')] bg-cover bg-center -z-10 "></div>

    <div class="relative flex flex-col">
      <!-- Top Navigation -->
      <header class="backdrop-blur-xl bg-slate-900/95 border-b border-slate-700/50 shadow-lg shadow-black/10">
        <nav class="px-4 md:px-0">
          <div class="flex flex-wrap items-center justify-between md:mx-auto md:w-2/4 py-1">
            <!-- Logo -->
            <div class="flex items-center space-x-3">
              <img
                src="/img/fra_logo_full_white.svg"
                class="h-11 md:h-15"
                alt="Frankfurt Airport Logo"
              />
            </div>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMenu"
              type="button"
              class="inline-flex items-center justify-center p-2 w-10 h-10 rounded-xl text-slate-300 md:hidden hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              :aria-expanded="isOpen.toString()"
            >
              <span class="sr-only">Hauptmenü öffnen</span>
              <svg
                class="w-5 h-5 transition-transform duration-300"
                :class="isOpen ? 'rotate-90' : ''"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <!-- Navigation Links -->
            <div
              :class="[
                'w-full md:block md:w-auto transition-all duration-300',
                isOpen ? 'block' : 'hidden',
              ]"
            >
              <ul
                class="font-medium flex flex-col md:flex-row md:items-center gap-1 md:gap-8 mt-4 md:mt-0 px-2 md:px-0"
              >
                <li>
                  <a
                    href="#"
                    class="block py-2.5 px-4 text-sm font-medium text-slate-300 rounded-lg md:py-1 md:px-0 hover:bg-slate-800 md:hover:bg-transparent md:hover:text-white transition-all duration-200"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="block py-2.5 px-4 text-sm font-medium text-slate-300 rounded-lg md:py-1 md:px-0 hover:bg-slate-800 md:hover:bg-transparent md:hover:text-white transition-all duration-200"
                  >
                    Buchen
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    class="block py-2.5 px-4 text-sm font-medium text-slate-300 rounded-lg md:py-1 md:px-0 hover:bg-slate-800 md:hover:bg-transparent md:hover:text-white transition-all duration-200"
                  >
                    Kontakt
                  </a>
                </li>

                <li class="md:ml-2">
                  <NuxtLink
                    to="/"
                    class="block py-2.5 px-4 text-sm font-semibold text-white bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] rounded-xl md:py-2 md:px-5 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200"
                  >
                    Login
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>