<template>
  <div class="flex flex-col gap-5 mx-5 md:mx-0 mt-5">
    <label class="service-card">
      <div class="flex flex-row justify-between items-center gap-4">
        <div class="flex flex-row gap-2 items-center flex-1">
          <input
            type="checkbox"
            name="service-common-item"
            :value="serviceId"
            v-model="selectedService"
            class="w-4 h-4 cursor-pointer"
          />
          <div class="flex-1">
            <h3>{{ name }}</h3>
          </div>
        </div>
        <span class="text-2xl font-bold text-[#008BD2] whitespace-nowrap">{{
          formatPrice(price)
        }}</span>
      </div>

      <p
        class=" text-sm text-gray-600 leading-relaxed pl-6 pr-20 text-justify"
      >
        {{ description }}
      </p>
    </label>
  </div>
</template>

<script setup>
const props = defineProps({
  serviceId: Number,
  position: String,
  name: String,
  description: String,
  price: Number,
});


const formatPrice = (price) => {
  if (!price) return "0,00 €";
  return `${price.toFixed(2).replace(".", ",")} €`;
};
</script>

<style scoped>
@reference "tailwindcss";

.service-card {
  @apply px-5 py-4 mx-0 bg-white rounded-xl border border-slate-200 hover:bg-slate-50 transition-all duration-200 
    cursor-pointer hover:shadow-lg;
}
h2 {
  @apply text-xl font-semibold mb-5;
}
h3 {
  @apply text-lg font-semibold text-gray-900 pr-4;
}
</style>