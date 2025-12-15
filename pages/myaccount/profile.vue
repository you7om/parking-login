<template>
  <div>
    <div class="mb-8 mx-5 md:mx-0">
      <h1
        class="text-3xl font-bold bg-gradient-to-r from-[var(--primary-blue)] to-[var(--primary-blue-dark)] bg-clip-text text-transparent"
      >
        Mein Profil
      </h1>
    </div>

      <UserInfo
      v-for="user in userData"
      :key="user.id"
      :firstName="user.firstName"
      :lastName="user.lastName"
      :email="user.email"
      :phone="user.phone"
    />
    
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';

definePageMeta({
  layout: "myaccount",
});

const userData = ref([]);;

onMounted(() => {
  let userDataFromStorage = localStorage.getItem("userData");
  userDataFromStorage = JSON.parse(userDataFromStorage);
  console.log(userDataFromStorage);

  userData.value = [userDataFromStorage];
});

</script>

<style scoped></style>
