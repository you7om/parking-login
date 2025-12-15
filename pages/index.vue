<template>
  <div>


    <LoginPage v-if="!showRegistration" @toggle="toggleRegistration" />
    <RegistrationPage v-else @toggle="toggleRegistration" />
  </div>
</template>

<script setup>
import { ref } from "vue";

const showRegistration = ref(false);

const toggleRegistration = () => {
  showRegistration.value = !showRegistration.value;
};
</script>

<style scoped></style>
