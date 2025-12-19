<template>
  <div class="flex flex-col gap-5 mx-5 md:mx-0 mt-5">
    <h1>Parkzeitraum und Personenanzahl festlegen</h1>

    <div
      class="flex flex-col md:flex-row gap-5 md:gap-3 items-center mx-auto justify-between w-full my-3"
    >
      <!-- Date and Time Section -->
      <div
        class="flex flex-col gap-3 md:gap-0 md:flex-row items-center"
      >
        <!-- start -->
        <div class="flex flex-row gap-3">
          <!-- date picker start -->
          <div id="datepicker-start-wrapper" class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10"
            >
              <svg
                class="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                />
              </svg>
            </div>
            <input
              id="datepicker-start"
              type="text"
              v-model="startDate"
              class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              placeholder="Startdatum auswählen"
              required
            />
          </div>

          <!-- time picker start -->
          <div class="relative">
            <div
              class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time"
              v-model="startTime"
              class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              min="09:00"
              max="18:00"
              required
            />
          </div>
        </div>

        <span class="mx-4 text-body items-center">bis</span>

        <!-- end -->
        <div class="flex flex-row gap-3">
          <!-- date picker end -->
          <div id="datepicker-end-wrapper" class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10"
            >
              <svg
                class="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 10h16m-8-3V4M7 7V4m10 3V4M5 20h14a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Zm3-7h.01v.01H8V13Zm4 0h.01v.01H12V13Zm4 0h.01v.01H16V13Zm-8 4h.01v.01H8V17Zm4 0h.01v.01H12V17Zm4 0h.01v.01H16V17Z"
                />
              </svg>
            </div>
            <input
              id="datepicker-end"
              type="text"
              v-model="endDate"
              class="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              placeholder="Enddatum auswählen"
              required
            />
          </div>

          <!-- time picker end -->
          <div class="relative">
            <div
              class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
            >
              <svg
                class="w-4 h-4 text-body"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </div>
            <input
              type="time"
              id="end-time"
              v-model="endTime"
              class="block w-full p-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
              min="09:00"
              max="18:00"
              required
            />
          </div>
        </div>
      </div>

      <!-- Passengers number -->
      <div class="relative w-60 lg:w-auto md:min-w-[200px]">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none z-10"
        >
          <svg
            class="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="2"
              d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
            />
          </svg>
        </div>
        <select
          v-model="personenAnzahl"
          class="block w-full ps-9 pe-10 py-2.5 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs appearance-none cursor-pointer"
          required
        >
          <option value="" disabled>Personenanzahl</option>
          <option v-for="n in 30" :key="n" :value="n">
            {{ n }} {{ n === 1 ? "Person" : "Personen" }}
          </option>
        </select>
      </div>

      <div class="mx-auto">
        <button class="btn" @click="handleSubmit">
          Bestätigen
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Datepicker from "flowbite-datepicker/Datepicker";

const startDate = ref("");
const startTime = ref("00:00");
const endDate = ref("");
const endTime = ref("00:00");
const personenAnzahl = ref("");

const emit = defineEmits(["booking-data-complete"]);

onMounted(() => {
  const startDatepicker = document.getElementById("datepicker-start");
  const endDatepicker = document.getElementById("datepicker-end");

  if (startDatepicker) {
    const startPicker = new Datepicker(startDatepicker, {
      format: "dd.mm.yyyy",
      autohide: true,
      language: "de",
    });

    startDatepicker.addEventListener("changeDate", (e) => {
      startDate.value = e.target.value;
    });
  }

  if (endDatepicker) {
    const endPicker = new Datepicker(endDatepicker, {
      format: "dd.mm.yyyy",
      autohide: true,
      language: "de",
    });

    endDatepicker.addEventListener("changeDate", (e) => {
      endDate.value = e.target.value;
    });
  }
});

const handleSubmit = () => {
  if (!startDate.value || !endDate.value || !personenAnzahl.value) {
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

<style scoped></style>