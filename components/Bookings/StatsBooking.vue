<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 mx-5 md:mx-0">
      
      <!-- Aktive Buchungen -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div class="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">Aktive Buchungen</p>
              <p class="text-3xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {{ activeBookings }}
              </p>
            </div>
            <div class="bg-gradient-to-br from-emerald-500 to-teal-500 p-2 rounded-xl shadow-lg shadow-emerald-500/20">
              <span class="material-symbols-outlined text-white text-3xl">
                directions_car
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Abgeschlossen -->
      <div class="group relative">
        <div class="absolute inset-0 bg-gradient-to-br from-slate-500 to-slate-600 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
        <div class="relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-2xl p-6 hover:shadow-lg transition-all">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-slate-600 mb-1">Abgeschlossen</p>
              <p class="text-3xl font-bold text-slate-700">{{ completedBookings }}</p>
            </div>
            <div class="bg-gradient-to-br from-slate-500 to-slate-600 p-2 rounded-xl shadow-lg shadow-slate-500/20">
              <span class="material-symbols-outlined text-white text-3xl">
                schedule
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const bookings = ref([])

// Aktive Buchungen zählen
const activeBookings = computed(() => {
  return bookings.value.filter(b => {
    const today = new Date()
    const departure = new Date(b.departureDate)
    return departure >= today
  }).length
})

// Abgeschlossene Buchungen zählen
const completedBookings = computed(() => {
  return bookings.value.filter(b => {
    const today = new Date()
    const departure = new Date(b.departureDate)
    return departure < today
  }).length
})


onMounted(() => {
  try {
    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || { member: [] }
    bookings.value = allBookings.member
  } catch (error) {
    console.error('Error loading bookings:', error)
  }
})
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
</style>