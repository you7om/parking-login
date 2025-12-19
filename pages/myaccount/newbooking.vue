<template>
  <div class="flex flex-col gap-6">
    <ChooseParkingDate @booking-data-complete="handleBookingComplete" />

    <div v-if="bookingDateAndTimeExist" class="flex flex-col mt-6 mx-5 md:mx-0">
      <h1>Wählen Sie Valet oder Shuttle Service aus</h1>
      <div class="flex gap-3 mx-auto my-8">
        <button
          @click="isShuttle = false"
          :class="[
            'px-6 py-2 rounded-xl font-medium text-base transition-all duration-200 cursor-pointer',
            !isShuttle
              ? 'bg-(--primary-blue) text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
          ]"
        >
          Valet Service
        </button>

        <button
          @click="isShuttle = true"
          :class="[
            'px-6 py-2 rounded-xl font-medium text-base transition-all duration-200 cursor-pointer',
            isShuttle
              ? 'bg-(--primary-blue) text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200',
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

      <div
        class="flex flex-col lg:flex-row gap-5 mx-auto lg:mx-0 justify-center xl:justify-between flex-nowrap"
        v-if="bookingData"
      >
        <ChooseParkingSpot
          v-for="variant in filteredVariants"
          :variantId="variant.id"
          :key="variant.id"
          :name="variant.name"
          :description="variant.description"
          :startDate="bookingData.startDate"
          :startTime="bookingData.startTime"
          :endDate="bookingData.endDate"
          :endTime="bookingData.endTime"
          :personenAnzahl="bookingData.personenAnzahl"
          :pureParkingPrice="parkingPrices[variant.id]"
          @request-price="handlePriceRequest"
        />
      </div>
    </div>

    <div>
      <div class="flex flex-col gap-4 mb-5 mx-5 md:mx-0">
        <h1>Zusätzliche Leistungen</h1>
        <h2 class="mb-4">Wählen Sie ein Servicepaket aus</h2>
      </div>
      <ChooseSingleServices
        v-for="singleService in singleServices"
        :serviceId="singleService.id"
        :key="singleService.id"
        :name="singleService.name"
        :description="singleService.description"
        :price="singleService.price"
      />
    </div>

    <div>
      <div class="flex flex-col gap-2 mb-5 mx-5 md:mx-0">
        <h1>Weitere Leistungen</h1>
        <h2 class="mb-4">Wählen Sie beliebig viele Optionen</h2>
      </div>
      <ChooseMultiServices
        v-for="multiService in multiServices"
        :serviceId="multiService.id"
        :key="multiService.id"
        :name="multiService.name"
        :description="multiService.description"
        :price="multiService.price"
      />
    </div>


    <div>
      <div class="flex flex-col gap-4 mb-5 mx-5 md:mx-0">
        <h1>Ihre Angaben</h1>
      </div>
      <ChooseUserData />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import ChooseParkingSpot from "../../components/NewBooking/ChooseParkingSpot.vue";
import ChooseParkingDate from "../../components/NewBooking/ChooseParkingDate.vue";
import ChooseSingleServices from "../../components/NewBooking/ChooseSingleServices.vue";
import ChooseMultiServices from "../../components/NewBooking/ChooseMultiServices.vue";
import ChooseUserData from "../../components/NewBooking/ChooseUserData.vue";

definePageMeta({
  layout: "myaccount",
});

const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

const ParkingVariants = ref([]);
const parkingPrices = ref({});
const loading = ref(true);
const error = ref(null);
const isShuttle = ref(false);

const bookingDateAndTimeExist = ref(false);
const bookingData = ref(null);
const singleServices = ref([]);
const multiServices = ref([]);

const filteredVariants = computed(() => {
  const searchTerm = isShuttle.value ? "Shuttle" : "Valet";
  return ParkingVariants.value.filter((variant) =>
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

// fetch PureParkingPrice
async function fetchPureParkingPrice(bookingInfo, variantId) {
  try {
    const formatDate = (dateStr) => {
      const [day, month, year] = dateStr.split(".");
      return `${year}-${month}-${day}`;
    };

    const requestData = {
      websiteId: 7,
      articleId: variantId,
      arrivalDate: formatDate(bookingInfo.startDate),
      arrivalTime: bookingInfo.startTime,
      departureDate: formatDate(bookingInfo.endDate),
      departureTime: bookingInfo.endTime,
      services: [],
    };

    const data = await $fetch(`${apiBase}/booking-price`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: requestData,
    });

    console.log(`PureParkingPrice für Variante ${variantId}:`, data);

    return data;
  } catch (err) {
    console.error(
      `Fehler beim Laden der PureParkingPrice für Variante ${variantId}:`,
      err
    );
    throw err;
  }
}

const handlePriceRequest = async (variantId) => {
  if (!bookingData.value) return;

  try {
    const priceData = await fetchPureParkingPrice(bookingData.value, variantId);
    parkingPrices.value[variantId] = priceData;
  } catch (err) {
    console.error(
      `Fehler beim Laden des Preises für Variante ${variantId}:`,
      err
    );
  }
};

// Fetch services
async function fetchServices() {
  try {
    const data = await $fetch(`${apiBase}/parking-variant-services`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });

    localStorage.setItem("singleServices", JSON.stringify(data));

    return data.member || data;
  } catch (err) {
    console.error("Fehler beim Laden der Servicevarianten:", err);
    throw err;
  }
}

onMounted(async () => {
  try {
    // Cache für ParkingVariants
    const cachedVariants = localStorage.getItem("ParkingVariants");
    if (cachedVariants) {
      const parsed = JSON.parse(cachedVariants);
      ParkingVariants.value = parsed.member || parsed;
      console.log("Parkvarianten aus Cache geladen:", ParkingVariants.value);
    }

    // Frische Daten laden
    const freshVariants = await fetchParkingVariants();
    ParkingVariants.value = freshVariants;
    console.log("Parkvarianten aktualisiert:", ParkingVariants.value);

    // Cache für Services
    const cachedServices = localStorage.getItem("ServicesData");
    if (cachedServices) {
      const parsed = JSON.parse(cachedServices);
      singleServices.value = parsed.singleSelect || [];
      multiServices.value = parsed.multiSelect || [];
      console.log("Single Services aus Cache geladen:", singleServices.value);
      console.log("Multi Services aus Cache geladen:", multiServices.value);
    }

    // Frische Services laden
    const freshServices = await fetchServices();
    singleServices.value = freshServices.singleSelect || [];
    multiServices.value = freshServices.multiSelect || [];
    console.log("Single Services aktualisiert:", singleServices.value);
    console.log("Multi Services aktualisiert:", multiServices.value);
  } catch (err) {
    error.value = err.message || "Fehler beim Laden";
  } finally {
    loading.value = false;
  }
});

// Wenn bookingData verfügbar ist, Preis laden
watch(bookingData, async (newData) => {
  if (newData) {
    try {
      const priceData = await fetchPureParkingPrice(newData);
      PureParkingPrice.value = priceData;
    } catch (err) {
      console.error("Fehler beim Laden des Preises:", err);
    }
  }
});

const handleBookingComplete = (data) => {
  bookingData.value = data;
  bookingDateAndTimeExist.value = true;
  console.log("Booking Data empfangen:", data);
};
</script>

<style scoped>
@reference "tailwindcss";

h2 {
  @apply text-xl font-semibold;
}
</style>
