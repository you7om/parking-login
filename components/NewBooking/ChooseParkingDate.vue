<template>
  <div class="flex flex-col gap-5 px-4 sm:px-6 lg:px-0 mt-5">
    <h1 class="text-xl sm:text-2xl font-semibold">Parkzeitraum und Personenanzahl festlegen</h1>

    <div class="flex flex-col lg:flex-row gap-4 lg:gap-3 items-stretch lg:items-center w-full my-3">
      <!-- Date and Time Section -->
      <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1">
        <!-- start -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <!-- date picker start -->
          <div id="datepicker-start-wrapper" class="relative flex-1 sm:flex-initial sm:w-48">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10">
              <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
              </svg>
            </div>
            <input
                id="datepicker-start"
                type="text"
                v-model="startDate"
                class="block w-full ps-9 pe-3 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Startdatum auswählen"
                required
            />
          </div>

          <!-- time picker start -->
          <div class="relative w-28">
            <select
                v-model="startTime"
                class="block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                required
            >
              <option v-for="time in timeOptions" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>

        <span class="hidden sm:block sm:mx-3 text-gray-600 self-center">bis</span>
        <div class="sm:hidden text-center text-gray-600 text-sm py-1">bis</div>

        <!-- end -->
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          <!-- date picker end -->
          <div id="datepicker-end-wrapper" class="relative flex-1 sm:flex-initial sm:w-48">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10">
              <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"/>
              </svg>
            </div>
            <input
                id="datepicker-end"
                type="text"
                v-model="endDate"
                class="block w-full ps-9 pe-3 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enddatum auswählen"
                required
            />
          </div>

          <!-- time picker end -->
          <div class="relative w-28">
            <select
                v-model="endTime"
                class="block w-full p-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                required
            >
              <option v-for="time in timeOptions" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
        </div>

        <!-- Passengers number -->
        <div class="relative w-full sm:w-48 sm:ms-3">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
            </svg>
          </div>
          <select
              v-model="personenAnzahl"
              class="block w-full ps-9 pe-10 py-2.5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
              required
          >
            <option value="" disabled>Personenanzahl</option>
            <option v-for="n in 30" :key="n" :value="n">
              {{ n }} {{ n === 1 ? "Person" : "Personen" }}
            </option>
          </select>
        </div>
      </div>

      <div class="w-full lg:w-auto">
        <button
            class="w-full lg:w-auto px-6 py-2.5 text-white font-medium rounded-lg transition-colors cursor-pointer"
            style="background-color: #017dbb;"
            @click="handleSubmit"
            @mouseenter="$event.target.style.backgroundColor = '#015a8a'"
            @mouseleave="$event.target.style.backgroundColor = '#017dbb'"
        >
          Bestätigen
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="text-red-600 text-sm px-4 sm:px-6 lg:px-0 -mt-3">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import Datepicker from "flowbite-datepicker/Datepicker";

const startDate = ref("");
const startTime = ref("09:00");
const endDate = ref("");
const endTime = ref("09:00");
const personenAnzahl = ref("1");
const errorMessage = ref("");

let startDatepickerInstance = null;
let endDatepickerInstance = null;

const emit = defineEmits(["booking-data-complete"]);

const timeOptions = computed(() => {
  const times = [];
  for (let hour = 9; hour <= 18; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
      times.push(time);
    }
  }
  times.push("18:00");
  return times;
});

const parseDate = (dateStr) => {
  if (!dateStr) return null;
  const parts = dateStr.split('.');
  if (parts.length !== 3) return null;
  return new Date(parts[2], parts[1] - 1, parts[0]);
};

const getDateTime = (dateStr, timeStr) => {
  const date = parseDate(dateStr);
  if (!date) return null;
  const [hours, minutes] = timeStr.split(':');
  date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  return date;
};

watch([startDate, startTime], () => {
  errorMessage.value = "";
  if (startDate.value && endDatepickerInstance) {
    const start = parseDate(startDate.value);
    if (start) {
      const minEndDate = new Date(start);
      minEndDate.setDate(minEndDate.getDate() + 1);
      endDatepickerInstance.setOptions({
        minDate: minEndDate
      });
    }
  }
});

watch([endDate, endTime], () => {
  errorMessage.value = "";
});

onMounted(() => {
  Datepicker.locales.de = {
    days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    daysShort: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
    months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
    today: "Heute",
    clear: "Löschen",
    format: "dd.mm.yyyy",
    titleFormat: "MM yyyy",
    weekStart: 1
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDatepicker = document.getElementById("datepicker-start");
  const endDatepicker = document.getElementById("datepicker-end");

  if (startDatepicker) {
    startDatepickerInstance = new Datepicker(startDatepicker, {
      format: "dd.mm.yyyy",
      autohide: true,
      language: "de",
      minDate: today
    });

    startDatepicker.addEventListener("changeDate", (e) => {
      startDate.value = e.target.value;
    });
  }

  if (endDatepicker) {
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    endDatepickerInstance = new Datepicker(endDatepicker, {
      format: "dd.mm.yyyy",
      autohide: true,
      language: "de",
      minDate: tomorrow
    });

    endDatepicker.addEventListener("changeDate", (e) => {
      endDate.value = e.target.value;
    });
  }
});

const handleSubmit = () => {
  errorMessage.value = "";

  if (!startDate.value || !endDate.value || !personenAnzahl.value) {
    errorMessage.value = "Bitte füllen Sie alle Felder aus.";
    return;
  }

  const startDateTime = getDateTime(startDate.value, startTime.value);
  const endDateTime = getDateTime(endDate.value, endTime.value);

  if (!startDateTime || !endDateTime) {
    errorMessage.value = "Ungültiges Datum.";
    return;
  }

  const now = new Date();
  if (startDateTime < now) {
    errorMessage.value = "Startdatum und -zeit dürfen nicht in der Vergangenheit liegen.";
    return;
  }

  const minEndDateTime = new Date(startDateTime);
  minEndDateTime.setDate(minEndDateTime.getDate() + 1);

  if (endDateTime < minEndDateTime) {
    errorMessage.value = "Das Enddatum muss mindestens 1 Tag nach dem Startdatum liegen.";
    return;
  }

  const newBookingData = {
    startDate: startDate.value,
    startTime: startTime.value,
    endDate: endDate.value,
    endTime: endTime.value,
    personenAnzahl: personenAnzahl.value,
  };

  localStorage.setItem("newBookingData", JSON.stringify(newBookingData));
  console.log(newBookingData);

  emit("booking-data-complete", newBookingData);
};
</script>

<style scoped>
</style>