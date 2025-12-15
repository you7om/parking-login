<template>
  <div>
    <div class="mt-15 flex flex-col gap-3">
      <h3
        class="text-3xl md:text-3xl font-bold text-center text-gray-900 leading-tight"
      >
        Willkommen zurück!
      </h3>

      <img
        src="/img/fra_logo_full_white_blue.svg"
        class="h-11 md:h-20 mx-auto"
        alt="Frankfurt Airport Logo"
      />
    </div>

    <div
      v-if="!showRegistration"
      class="container w-3/4 lg:w-1/4 flex flex-col justify-center p-5 mx-auto my-10 border border-neutral-200 rounded-md shadow-md transition-shadow duration-300 ease-in-out bg-white gap-1"
    >
      <form @submit.prevent="auth" class="flex flex-col">
        <div class="mb-6">
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >E-Mail</label
          >
          <input
            v-model="email"
            type="text"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="E-Mail"
          />
          <ValidationError v-model="emailMessage" />
        </div>
        <div class="mb-6 relative">
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            v-model="password"
            :type="showPass ? 'text' : 'password'"
            id="password"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
          />

          <button
            type="button"
            class="material-symbols-outlined absolute right-3 top-9 text-gray-500 cursor-pointer select-none"
            @click="togglePassword"
          >
            {{ showPass ? "visibility_off" : "visibility" }}
          </button>

          <button
            type="button"
            class="text-sm text-blue-600 hover:underline absolute right-0 top-full mt-2"
            @click="forgotPassword"
          >
            Passwort vergessen?
          </button>
        </div>
        <transition name="error" appear>
          <loginErrorMessage
            v-if="errorMessage"
            :error="errorMessage"
            @close="errorMessage = ''"
          />
        </transition>
        <button type="submit" class="btn self-center mt-5">
          <span class="material-symbols-outlined mr-2">account_circle</span>
          Log in
        </button>
      </form>

      <div class="w-full h-px bg-gray-300 my-4"></div>
      <p class="text-center mb-2">Sie haben keinen Account?</p>
      <button type="button" class="btn-white mx-auto" @click="$emit('toggle')">
        Registrieren
      </button>
    </div>
  </div>
</template>

<script setup>
import { navigateTo } from "#app";
import { ref, watch } from "vue";
import LoginErrorMessage from "~/components/UI/loginErrorMessage.vue";

import Validator from "~/helpers/Validator";

//data
const email = ref("");
const password = ref("");
const showPass = ref(false);
const errorMessage = ref("");

const emailMessage = ref("");

// Emits
const emit = defineEmits(["bookingsData"], ["userData"]);

//Show Password
const togglePassword = () => {
  showPass.value = !showPass.value;
};

//Forgot Password
const forgotPassword = () => {
  navigateTo("/forgot-password");
};

//E-Mail Validation
const validateEmail = (email) => {
  if (!email) return "Dieses Feld darf nicht leer sein!";

  const emailError = Validator.validateEmailMessage(email);
  if (emailError) return emailError;

  return "";
};

//WATCH
watch(email, () => {
  emailMessage.value = validateEmail(email.value);
});

//Fetch data
const config = useRuntimeConfig();
const apiBase = config.public.apiBase;

function goToMainPage() {
  navigateTo("/myaccount/overview");
}

// Funktion, um die Buchungen zu laden
async function fetchBookings() {
  try {
    const data = await $fetch(`${apiBase}/customer_bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    errorMessage.value = "Buchungen konnten nicht geladen werden.";
    return [];
  }
}

// Funktion, um userData zu laden
async function fetchUserData() {
  try {
    const data = await $fetch(`${apiBase}/current`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    errorMessage.value = "User Infos konnten nicht geladen werden.";
    return [];
  }
}

// Login-Funktion
async function auth() {
  errorMessage.value = "";
  if (emailMessage.value) return;

  try {
    // Login per POST
    const data = await $fetch(`${apiBase}/auth`, {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (data.token) {
      // JWT speichern
      localStorage.setItem("jwt", data.token);

      // Buchungen und userData laden
       const [bookingsData, userData] = await Promise.all([
        fetchBookings(),
        fetchUserData()
      ]);


      // // Emit an Elternkomponente
      // emit("bookingsData", bookingsData);

  if (bookingsData && userData) {
        localStorage.setItem("allBookings", JSON.stringify(bookingsData));
        localStorage.setItem("userData", JSON.stringify(userData));
        goToMainPage();
      } else {
        errorMessage.value = "Daten konnten nicht vollständig geladen werden.";
      }
    } else {
      errorMessage.value = "Email oder Passwort falsch";
    }
  } catch (error) {
    if (error?.status === 400) {
      errorMessage.value = "Die Felder dürfen nicht leer sein";
    } else if (error?.status === 401) {
      errorMessage.value = "Email oder Passwort falsch";
    } else {
      errorMessage.value =
        "Login fehlgeschlagen. Bitte versuche es später erneut.";
    }
    console.error(error);
  }
}
</script>

<style scoped>
/* Transition */
.error-enter-from,
.error-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.error-enter-to,
.error-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.error-enter-active,
.error-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>
