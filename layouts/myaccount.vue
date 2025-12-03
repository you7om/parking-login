 <template>
  <div class="relative w-full">
    <!-- Fixiertes Hintergrundbild -->
    <div class="fixed inset-0 bg-[url('/img/parking-cover.png')] bg-cover bg-center -z-10 "></div>

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
                    class="block py-2.5 px-4 text-sm font-semibold text-white bg-slate-800 rounded-xl md:py-2 md:px-5 hover:bg-slate-700 transition-all duration-200"
                  >
                    Abmelden
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <!-- Main Content Area -->
      <div class="md:mx-auto md:w-3/4 xl:w-3/5 2xl:w-2/4 md:mt-8 flex flex-col pb-8">
        <!-- Welcome Header -->
        <div class="px-5 md:px-0">
          <h1
            class="mt-6 mb-8 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Willkommen, {{ firstName }}
          </h1>
        </div>

        <!-- Sub Navigation -->
        <nav class="backdrop-blur-xl bg-white/80 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 mx-5 md:mx-0 mb-6">
          <div class="px-4 md:px-3">
            <ul
              class="flex flex-col md:flex-row md:items-center md:gap-2 py-2"
            >
              <li class="flex-1">
                <NuxtLink
                  to="/myaccount/overview"
                  :class="[
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    route.path === '/myaccount/overview'
                      ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100',
                  ]"
                >
                  <img
                    src="/img/overview-icon.svg"
                    class="h-5 w-5"
                    :class="route.path === '/myaccount/overview' ? 'brightness-0 invert' : ''"
                  />
                  <span>Meine Übersicht</span>
                </NuxtLink>
              </li>

              <li class="flex-1">
                <NuxtLink
                  to="/myaccount/bookings"
                  :class="[
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    route.path === '/myaccount/bookings'
                      ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100',
                  ]"
                >
                  <img
                    src="/img/parking-icon.svg"
                    class="h-5 w-5"
                    :class="route.path === '/myaccount/bookings' ? 'brightness-0 invert' : ''"
                  />
                  <span>Meine Buchungen</span>
                </NuxtLink>
              </li>

              <li class="flex-1">
                <NuxtLink
                  to="/myaccount/profile"
                  :class="[
                    'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
                    route.path === '/myaccount/profile'
                      ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white shadow-lg shadow-blue-500/30'
                      : 'text-slate-700 hover:bg-slate-100',
                  ]"
                >
                  <img
                    src="/img/person-icon.svg"
                    class="h-5 w-5"
                    :class="route.path === '/myaccount/profile' ? 'brightness-0 invert' : ''"
                  />
                  <span>Mein Profil</span>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </nav>

        <!-- Content Slot -->
        <div class="flex-1">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const isOpen = ref(false);
const route = useRoute();

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

// Nutzerdaten
const firstName = ref('')
const lastName = ref('')
const bookings = ref([])

onMounted(() => {
  try {
    // Buchungen laden
    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || { member: [] }
    bookings.value = allBookings.member
    
    // Namen aus der ersten Buchung holen
    if (bookings.value.length > 0) {
      firstName.value = bookings.value[0].firstName || ''
      lastName.value = bookings.value[0].lastName || ''
      
      console.log('User:', firstName.value, lastName.value)
    }
    
  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>