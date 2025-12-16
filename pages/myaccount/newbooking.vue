<template>
  <div class="flex flex-col gap-6">

    <ChooseParkingDate />

    <div class="flex gap-3 mx-auto mb-5">
      <button 
        @click="isShuttle = false"
        :class="[
          'px-6 py-2 rounded-lg font-medium text-base transition-all duration-200 cursor-pointer',
          !isShuttle 
            ? 'bg-(--primary-blue) text-white shadow-md' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        Valet Service
      </button>
      
      <button 
        @click="isShuttle = true"
        :class="[
          'px-6 py-2 rounded-lg font-medium text-base transition-all duration-200 cursor-pointer',
          isShuttle 
            ? 'bg-(--primary-blue) text-white shadow-md' 
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        ]"
      >
        Shuttle Service
      </button>
    </div>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Lade Parkvarianten...</p>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-500">
      <p>Fehler: {{ error }}</p>
    </div>

    <div v-else class="flex flex-row gap-4 flex-wrap justify-between">
      <ChooseParkingSpot
        v-for="variant in filteredVariants"
        :key="variant.id"
        :name="variant.name"
        :description="variant.description"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ChooseParkingSpot from "../../components/NewBooking/ChooseParkingSpot.vue";
import ChooseParkingDate from "../../components/NewBooking/ChooseParkingDate.vue";

definePageMeta({
  layout: "myaccount",
});

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const ParkingVariants = ref([]);
const loading = ref(true);
const error = ref(null);
const isShuttle = ref(false);

const filteredVariants = computed(() => {
  const searchTerm = isShuttle.value ? 'Shuttle' : 'Valet';
  return ParkingVariants.value.filter(variant => 
    variant.name.includes(searchTerm)
  );
});

async function fetchParkingVariants() {
  try {
    const data = await $fetch(`${apiBase}/parking-variants`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    
    localStorage.setItem("ParkingVariants", JSON.stringify(data));
    
    return data.member || data;
  } catch (err) {
    console.error("Fehler beim Laden der Parkvarianten:", err);
    throw err;
  }
}

onMounted(async () => {
  try {
    const cached = localStorage.getItem("ParkingVariants");
    
    if (cached) {
      const parsed = JSON.parse(cached);
      ParkingVariants.value = parsed.member || parsed;
      console.log("Parkvarianten aus Cache geladen:", ParkingVariants.value);
    }
    
    const freshData = await fetchParkingVariants();
    ParkingVariants.value = freshData;
    console.log("Parkvarianten aktualisiert:", ParkingVariants.value);
    
  } catch (err) {
    error.value = err.message || "Fehler beim Laden";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped></style>