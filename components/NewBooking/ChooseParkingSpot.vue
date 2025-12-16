<template>
  <div class="flex flex-col gap-4">
    <div class="parkingSpotCard">
      <h3>{{ name.split(" ")[3] }}</h3>

      <div class="flex flex-row gap-2 mb-2 items-start">
        <span class="material-symbols-outlined"> key </span>
        <p>{{ name.split(" ")[0] }} : Schlüssel abgeben / mitnehmen</p>
      </div>

      <div class="flex flex-row gap-2 items-start">
        <span class="material-symbols-outlined"> location_chip </span>
        <p>{{ name.split(" ")[5] }} {{ name.split(" ")[6] }}</p>
      </div>

      <div class="flex justify-center mt-6">
        <button class="btn">Auswählen</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  description: String,
});
</script>

<style scoped>
@reference "tailwindcss";

h3 {
  @apply text-black font-semibold mb-2;
}
.parkingSpotCard {
  @apply border border-gray-200 rounded-xl p-6 w-75 bg-white shadow-md hover:shadow-xl transition-shadow duration-300 hover:border-gray-300 hover:shadow-blue-500/10;
}
.material-symbols-outlined {
  @apply text-slate-400;
}
</style>
