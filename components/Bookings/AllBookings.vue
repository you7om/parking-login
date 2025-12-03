<template>
  <div>
    <StatsBooking />
    <!-- Header -->
    <div class="mb-8 mx-5 md:mx-0">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] bg-clip-text text-transparent"
      >
        Alle Buchungen
      </h1>
      <p class="text-slate-600 text-sm mt-3">
        {{ bookings.length }} Buchungen gefunden
      </p>
    </div>

    <BookingInfo
      v-for="booking in sortedBookings"
      :key="booking.id"
      :licensePlate="booking.licensePlate"
      :product="booking.product"
      :price="booking.price"
      :duration="booking.duration"
      :arrivalDate="booking.arrivalDate"
      :arrivalTime="booking.arrivalTime"
      :departureDate="booking.departureDate"
      :departureTime="booking.departureTime"
      :model="booking.model"
      :flightNumberArrival="booking.flightNumberArrival"
      :flightNumberDeparture="booking.flightNumberDeparture"
      :terminalArrival="booking.terminalArrival"
      :terminalDeparture="booking.terminalDeparture"
      :paymentStatus="booking.paymentStatus"
      :firstName="booking.firstName"
      :lastName="booking.lastName"
    />

    <!-- Empty State -->
    <div v-if="!bookings.length" class="text-center py-12">
      <p class="text-slate-600">Keine Buchungen vorhanden</p>
    </div>
  </div>
</template>

<script setup>
import BookingInfo from "../components/Bookings/BookingInfo";
import StatsBooking from "../components/Bookings/StatsBooking";

const bookings = ref([]);

// Sortiere nach arrivalDate: Neueste (späteste Reise) zuerst
const sortedBookings = computed(() => {
  return [...bookings.value].sort((a, b) => {
    return new Date(b.arrivalDate) - new Date(a.arrivalDate);
  });
});

onMounted(() => {
  let bookingsFromStorage = localStorage.getItem("allBookings");
  bookingsFromStorage = JSON.parse(bookingsFromStorage);
  console.log(bookingsFromStorage);

  bookings.value = bookingsFromStorage.member;
});
</script>

<style scoped></style>
