<template>
  <div class="relative w-full">
    <!-- Fixiertes Hintergrundbild -->
    <div
      class="fixed inset-0 bg-[url('/img/parking-cover.png')] bg-cover bg-center -z-10"
    ></div>

    <div class="relative flex flex-col">
      <!-- Main Content Area -->
      <div class="md:mx-auto md:w-4/5 xl:w-3/4 2xl:w-3/5 flex flex-col pb-8">
        <!-- Welcome Header -->
        <div class="px-5 md:px-0 flex flex-row justify-between items-center my-5 md:my-10">
          <h1
            class="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl lg:text-5xl"
          >
            Willkommen, {{ firstName }}
          </h1>
          <button class="btn" @click="logoutButton">Abmelden</button>
        </div>

        <!-- Sub Navigation -->
<nav
  class="backdrop-blur-xl bg-white/80 rounded-2xl border border-slate-200/60 shadow-lg shadow-slate-200/50 mx-5 md:mx-0 mb-6"
>
  <div class="px-4 md:px-3">
    <ul class="flex flex-col md:flex-row md:items-center md:gap-2 py-2">
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
          <span class="material-symbols-outlined text-xl">analytics</span>
          <span>Meine Übersicht</span>
        </NuxtLink>
      </li>

      <li class="flex-1">
        <NuxtLink
          to="/myaccount/allbookings"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
            route.path === '/myaccount/allbookings'
              ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white shadow-lg shadow-blue-500/30'
              : 'text-slate-700 hover:bg-slate-100',
          ]"
        >
          <span class="material-symbols-outlined text-xl">parking_sign</span>
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
          <span class="material-symbols-outlined text-xl">person</span>
          <span>Mein Profil</span>
        </NuxtLink>
      </li>

      <li class="flex-1">
        <NuxtLink
          to="/myaccount/newbooking"
          :class="[
            'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200',
            route.path === '/myaccount/newbooking'
              ? 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] text-white shadow-lg shadow-blue-500/30'
              : 'text-slate-700 hover:bg-slate-100',
          ]"
        >
          <span class="material-symbols-outlined text-xl">add_circle</span>
          <span>Neue Buchung</span>
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

const route = useRoute();

function logoutButton() {
  // Alle Daten aus localStorage löschen
  localStorage.clear();
  
  navigateTo("/");
}


// Nutzerdaten
const firstName = ref("");
const lastName = ref("");
const bookings = ref([]);

onMounted(() => {
  try {
    // Buchungen laden
    const allBookings = JSON.parse(localStorage.getItem("allBookings")) || {
      member: [],
    };
    bookings.value = allBookings.member;

    // Namen aus der ersten Buchung holen
    if (bookings.value.length > 0) {
      firstName.value = bookings.value[0].firstName || "";
      lastName.value = bookings.value[0].lastName || "";

      console.log("User:", firstName.value, lastName.value);
    }
  } catch (error) {
    console.error("Error loading data:", error);
  }
});
</script>
