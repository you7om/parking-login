<template>
  <div class="pb-6 mx-5 md:mx-0">
    <!-- Profil Card -->
    <div class="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
        <div
          class="bg-gradient-to-br from-[var(--primary-blue)] to-[var(--primary-blue-dark)] p-3 rounded-xl shadow-lg shadow-blue-500/20"
        >
          <span
            class="material-symbols-outlined text-white! text-3xl! font-extralight!"
          >
            person
          </span>
        </div>
        <div>
          <h2 class="text-2xl font-bold text-slate-900">
            {{ firstName }} {{ lastName }}
          </h2>
        </div>
      </div>

      <!-- Persönliche Daten -->
      <div class="mb-6">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4"
        >
          Persönliche Daten
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Vorname
            </span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> badge </span>
              <span class="font-medium text-slate-700">{{ firstName }}</span>
            </div>
          </div>

          <div class="space-y-2">
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Nachname
            </span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> badge </span>
              <span class="font-medium text-slate-700">{{ lastName }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-200 my-6"></div>

      <!-- Kontaktdaten -->
      <div class="mb-6">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4"
        >
          Kontaktdaten
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              E-Mail
            </span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> mail </span>
              <span class="font-medium text-slate-700">{{ email }}</span>
            </div>
          </div>

          <div class="space-y-2">
            <span
              class="text-xs font-semibold uppercase tracking-wider text-slate-400"
            >
              Telefonnummer
            </span>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined"> call </span>
              <span class="font-medium text-slate-700">{{ phone }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-slate-200 my-6"></div>

      <!-- Passwort -->
      <div class="mb-6">
        <h3
          class="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4"
        >
          Sicherheit
        </h3>
        <div class="space-y-2">
          <span
            class="text-xs font-semibold uppercase tracking-wider text-slate-400"
          >
            Passwort
          </span>
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined"> lock </span>
            <span class="font-medium text-slate-700">••••••••</span>
            <button
              class="ml-auto text-xs text-[var(--primary-blue)] hover:text-[var(--primary-blue-dark)] font-semibold transition-colors"
            >
              Ändern
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-200"
      >
        <button class="btn">Profil bearbeiten</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
});
</script>

<style scoped>
@reference "tailwindcss";

.material-symbols-outlined {
  @apply text-slate-400 text-2xl;
}
</style>
