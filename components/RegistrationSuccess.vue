<template>
  <div
    class="container w-3/4 lg:w-1/4 flex flex-col justify-center items-center p-5 mx-auto my-20  
    border border-neutral-200 rounded-md shadow-md transition-shadow duration-300 ease-in-out bg-white gap-4"
  >
   <img
                src="/img/success.png"
                class="w-20 h-auto"
                alt="Success-logo"
              />
    <h2 class="text-2xl font-medium text-center">Erfolgreich registriert!</h2>
    <p class="text-center mb-2">Sie haben sich erfolgreich registriert! Jetzt können Sie sich anmelden!</p>
    <button type="button" class="btn mx-auto" @click="goToLoginPage">Zur Anmeldung</button>

  </div>
</template>

<script setup>
const emit = defineEmits(['goToLogin'])

const goToLoginPage = () => {
  emit('goToLogin')
}
</script>

<style scoped>

</style>