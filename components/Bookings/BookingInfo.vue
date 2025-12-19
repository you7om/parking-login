<template>
  <div
    class="px-5 py-7 my-3 mx-5 md:mx-0 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 
    cursor-pointer hover:shadow-lg"
  >
    <!-- Compact Info -->
    <div
      class="flex items-center justify-between gap-4"
      @click="isExpanded = !isExpanded"
    >
      <!-- Icon -->
      <div
        class="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] p-2 rounded-xl shadow-lg shadow-blue-500/20"
      >
        <span
          class="material-symbols-outlined text-2xl! xl:text-3xl! font-extralight! text-white!"
        >
          directions_car
        </span>
      </div>

      <!-- Infos links -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-3 mb-1">
          <span class="font-semibold text-slate-900 text-lg">{{
            licensePlate
          }}</span>

          <span
            class="px-3 py-1 rounded-full text-xs font-semibold border"
            :class="
              status === 'Aktiv'
                ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                : 'bg-slate-500/10 text-slate-600 border-slate-500/20'
            "
          >
            {{ status }}
          </span>
        </div>

        <div
          class="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-600"
        >
          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined"> location_on </span>
            {{ product }}
          </span>

          <span class="flex items-center gap-1">
            <span class="material-symbols-outlined"> schedule </span>
            {{ formatDate(arrivalDate) }} - {{ formatDate(departureDate) }}
          </span>
        </div>
      </div>

      <!-- Preis -->
      <div class="text-right items-center flex flex-row gap-3">
        <div class="flex flex-col gap-1">
          <p class="font-bold text-xl text-[var(--primary-blue-dark)]">
            {{ price }} €
          </p>
          <p class="text-sm text-slate-500">
            {{ duration }} {{ duration == 1 ? "Tag" : "Tage" }}
          </p>
        </div>
        <div>
          <span
            class="material-symbols-outlined text-3xl! font-light! transition-transform duration-300"
          >
            {{ isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Full Info -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        isExpanded
          ? 'max-h-[600px] opacity-100 px-5 py-7'
          : 'max-h-0 opacity-0 overflow-hidden',
      ]"
    >
      <!-- Zeitraum -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="space-y-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >Beginn</span
          >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined"> calendar_month </span>
            <span class="font-medium text-slate-700"
              >{{ formatDate(arrivalDate) }},
              {{ formatTime(arrivalTime) }}</span
            >
          </div>
        </div>

        <div class="space-y-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >Ende</span
          >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined"> calendar_month </span>
            <span class="font-medium text-slate-700"
              >{{ formatDate(departureDate) }},
              {{ formatTime(departureTime) }}</span
            >
          </div>
        </div>
      </div>

      <!-- Fahrzeug -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="space-y-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >Fahrzeug</span
          >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined"> compare_arrows </span>
            <span class="font-medium text-slate-700">{{ model }}</span>
          </div>
        </div>

        <div class="space-y-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >Kennzeichen</span
          >
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined"> key </span>
            <span class="font-medium text-slate-700">{{ licensePlate }}</span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-200 my-6"></div>

      <!-- Zusätzliche Leistungen -->
      <div class="mb-6">
        <h3>Zusätzliche Leistungen</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            class="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
          >
            <span class="text-base font-medium text-slate-700">Autowäsche</span>
            <span
              class="px-2 py-1 rounded text-xs font-semibold"
              :class="
                carWash
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              "
            >
              {{ carWash ? "Ja" : "Nein" }}
            </span>
          </div>

          <div
            class="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
          >
            <span class="text-base font-medium text-slate-700"
              >Valet Service</span
            >
            <span
              class="px-2 py-1 rounded text-xs font-semibold"
              :class="
                valet
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-200 text-slate-600'
              "
            >
              {{ valet ? "Ja" : "Nein" }}
            </span>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-200 my-6"></div>

      <!-- Fluginformationen -->
      <div class="mb-6">
        <h3>Fluginformationen</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <span class="text-xs font-medium text-slate-500">Hinflug</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> north </span>
              <span class="font-medium text-slate-700"
                >{{ flightNumberArrival }}, Terminal:
                {{ terminalArrival }}</span
              >
            </div>
          </div>

          <div class="space-y-2">
            <span class="text-xs font-medium text-slate-500">Rückflug</span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> south </span>
              <span class="font-medium text-slate-700"
                >{{ flightNumberDeparture }}, Terminal:
                {{ terminalDeparture }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200"
      >
        <div class="flex items-center gap-3">
          <span
            class="text-2xl font-bold bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] bg-clip-text text-transparent"
          >
            {{ price }}€
          </span>

          <span
            class="px-2 py-1 rounded-xl text-sm font-semibold"
            :class="
              isPaid
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-amber-100 text-amber-700'
            "
          >
            {{ isPaid ? "Bezahlt" : "Ausstehend" }}
          </span>
        </div>

        <button class="btn">Buchung ändern</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import { computed, ref } from "vue";
const props = defineProps({
  licensePlate: String,
  product: String,
  price: String,
  duration: String,
  arrivalDate: String,
  arrivalTime: String,
  departureDate: String,
  departureTime: String,
  model: String,
  carWash: Boolean,
  valet: Boolean,
  flightNumberArrival: String,
  flightNumberDeparture: String,
  terminalArrival: String,
  terminalDeparture: String,
  paymentStatus: String,
});

const formatDate = (date) => {
  return dayjs(date).format("DD.MM.YYYY");
};

const formatTime = (time) => {
  return dayjs(time, "HH:mm").format("HH:mm");
};

const isPaid = computed(() => {
  console.log("paymentStatus:", props.paymentStatus); // Debug
  return props.paymentStatus === "FB"; // FB = Bezahlt, FO = Offen
});

// Status dynamisch berechnen
const status = computed(() => {
  const today = dayjs();
  const departure = dayjs(props.departureDate);

  return departure.isBefore(today, "day") ? "Abgeschlossen" : "Aktiv";
});

const isExpanded = ref(false);
</script>

<style scoped>
@reference 'tailwindcss';

.material-symbols-outlined {
  @apply text-slate-400 text-2xl;
}
h3 {
  @apply text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4;
}
</style>
