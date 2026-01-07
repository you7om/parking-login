<template>
  <div class="pb-6 mx-5 md:mx-0">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] bg-clip-text text-transparent mb-2">
        Meine Übersicht
      </h1>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      
      <!-- Aktive Buchungen -->
      <NuxtLink 
        to="/myaccount"
        class="group relative block"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div class="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">Aktive Buchungen</p>
              <p class="text-3xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {{ activeBookings }}
              </p>
            </div>
            <div class="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <span class="material-symbols-outlined text-white text-3xl font-light">
                directions_car
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- Abgeschlossen -->
      <NuxtLink 
        to="/myaccount"
        class="group relative block"
      >
        <div class="absolute inset-0 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div class="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">Abgeschlossen</p>
              <p class="text-3xl font-bold text-slate-700">{{ completedBookings }}</p>
            </div>
            <div class="bg-gradient-to-br from-slate-500 to-slate-600 p-2 rounded-xl shadow-lg shadow-slate-500/20">
              <span class="material-symbols-outlined text-white text-3xl font-light">
                schedule
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>

    </div>

    <!-- Nächste Buchung -->
    <NuxtLink 
      v-if="nextBooking" 
      to="/myaccount"
      class="block bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 mb-8 hover:shadow-lg transition-all cursor-pointer"
    >
      <div class="flex items-center gap-3 mb-4">
        <div class="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] p-2 rounded-xl">
          <span class="material-symbols-outlined text-white text-2xl font-light">
            upcoming
          </span>
        </div>
        <h2 class="text-xl font-bold text-slate-900">Nächste Buchung</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Anreise</p>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400 text-xl">
              calendar_month
            </span>
            <span class="font-semibold text-slate-900">{{ formatDate(nextBooking.arrivalDate) }}</span>
          </div>
        </div>

        <div class="space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Abreise</p>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400 text-xl">
              calendar_month
            </span>
            <span class="font-semibold text-slate-900">{{ formatDate(nextBooking.departureDate) }}</span>
          </div>
        </div>

        <div class="space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Kennzeichen</p>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-slate-400 text-xl">
              key
            </span>
            <span class="font-semibold text-slate-900">{{ nextBooking.licensePlate }}</span>
          </div>
        </div>

        <div class="space-y-1">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-500">Preis</p>
          <div class="flex items-center gap-2">
          
            <span class="font-bold text-xl bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] bg-clip-text text-transparent">
              {{ nextBooking.price }}€
            </span>
          </div>
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
        <span class="text-slate-600 text-sm">Klicken um Details anzuzeigen</span>
        <span class="material-symbols-outlined text-[var(--primary-blue-dark)]">
          arrow_forward
        </span>
      </div>
    </NuxtLink>

    <!-- Keine Buchungen -->
    <div v-else class="bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-12 text-center">
      <div class="mb-4">
        <span class="material-symbols-outlined text-slate-300 text-6xl">
          event_busy
        </span>
      </div>
      <h3 class="text-xl font-bold text-slate-700 mb-2">Keine bevorstehenden Buchungen</h3>
      <p class="text-slate-600 mb-6">Sie haben aktuell keine aktiven Parkplatz-Buchungen.</p>
      <NuxtLink to="/myaccount" class="btn inline-block">
        Jetzt buchen
      </NuxtLink>
    </div>

<!-- Letzte Aktivitäten -->
<NuxtLink 
  to="/myaccount"
  class="block bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 mt-8 hover:shadow-lg transition-all cursor-pointer"
>
  <div class="flex items-center justify-between mb-4">
    <div class="flex items-center gap-3">
      <div class="bg-gradient-to-br from-slate-500 to-slate-600 p-2 rounded-xl">
        <span class="material-symbols-outlined text-white text-2xl font-light">
          history
        </span>
      </div>
      <h2 class="text-xl font-bold text-slate-900">Letzte Buchungen</h2>
    </div>
  </div>

  <div v-if="recentBookings.length > 0" class="space-y-3">
    <div 
      v-for="booking in recentBookings" 
      :key="booking.id"
      class="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
    >
      <div class="flex items-center gap-4">
        <div class="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] p-2 rounded-lg">
          <span class="material-symbols-outlined text-white text-xl">
            directions_car
          </span>
        </div>
        <div>
          <p class="font-semibold text-slate-900">{{ booking.licensePlate }}</p>
          <p class="text-sm text-slate-600">
            {{ formatDate(booking.arrivalDate) }} - {{ formatDate(booking.departureDate) }}
          </p>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold text-[var(--primary-blue-dark)]">{{ booking.price }}€</p>
        <span 
          class="inline-block px-2 py-1 rounded text-xs font-semibold"
          :class="isActive(booking) ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'"
        >
          {{ isActive(booking) ? 'Aktiv' : 'Abgeschlossen' }}
        </span>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-8 text-slate-600">
    Keine Buchungen vorhanden
  </div>
</NuxtLink>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import dayjs from 'dayjs'

definePageMeta({
  layout: "myaccount",
})

const bookings = ref([])
const firstName = ref('')

// Aktive Buchungen zählen
const activeBookings = computed(() => {
  return bookings.value.filter(b => isActive(b)).length
})

// Abgeschlossene Buchungen zählen
const completedBookings = computed(() => {
  return bookings.value.filter(b => !isActive(b)).length
})

// Nächste Buchung
const nextBooking = computed(() => {
  const today = dayjs()
  const upcoming = bookings.value
    .filter(b => dayjs(b.arrivalDate).isAfter(today) || dayjs(b.arrivalDate).isSame(today, 'day'))
    .sort((a, b) => new Date(a.arrivalDate) - new Date(b.arrivalDate))
  
  return upcoming[0] || null
})

// Letzte 3 Buchungen
const recentBookings = computed(() => {
  return [...bookings.value]
    .sort((a, b) => new Date(b.arrivalDate) - new Date(a.arrivalDate))
    .slice(0, 3)
})

// Helper Funktionen
const formatDate = (date) => {
  return dayjs(date).format('DD.MM.YYYY')
}

const isActive = (booking) => {
  const today = dayjs()
  const departure = dayjs(booking.departureDate)
  return departure.isAfter(today) || departure.isSame(today, 'day')
}

onMounted(() => {
  try {
    // User-Daten laden
    const userData = JSON.parse(localStorage.getItem("userData"))
    if (userData) {
      firstName.value = userData.firstName || ''
    }

    // Buchungen laden
    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || { member: [] }
    bookings.value = allBookings.member

    // Fallback: Name aus erster Buchung
    if (!firstName.value && bookings.value.length > 0) {
      firstName.value = bookings.value[0].firstName || ''
    }

  } catch (error) {
    console.error('Error loading data:', error)
  }
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
</style>