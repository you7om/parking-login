<template>
  <div> 
  <div
  v-if="!successfullyRegistered"
    class="container w-3/4 lg:w-1/4 flex flex-col justify-center p-5 mx-auto my-10 border border-neutral-200 
    rounded-md shadow-md transition-shadow duration-300 ease-in-out bg-white gap-1"
  >
    <form
      @submit.prevent="sendRegistration"
      class="flex flex-col"
      ref="registrationForm"
    >
      <!-- FirstName -->

      <div class="mb-6">
        <label
          for="firstName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Vorname</label
        >
        <input
          v-model="firstName"
          type="text"
          id="firstName"
          name="firstName"
          class="inputField"
          placeholder="Vorname"
        />
        <ValidationError v-model="firstNameMessage" />
      </div>

      <!-- LastName -->
      <div class="mb-6">
        <label
          for="lastName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Nachname</label
        >
        <input
          v-model="lastName"
          type="text"
          id="lastName"
          name="lastName"
          class="inputField"
          placeholder="Nachname"
        />
        <ValidationError v-model="lastNameMessage" />
      </div>

      <!-- E-Mail -->
      <div class="mb-6">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >E-Mail</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="inputField"
          placeholder="E-Mail"
        />
        <ValidationError v-model="emailMessage" />
      </div>

      <!-- Passwort -->
      <div class="mb-6 relative">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Passwort</label
        >
        <input
          v-model="password"
          :type="showPass ? 'text' : 'password'"
          id="password"
          name="password"
          class="inputField"
          placeholder="•••••••••"
        />
        <span
          type="button"
          class="material-symbols-outlined absolute right-3 top-9 text-gray-500 cursor-pointer select-none"
          @click="togglePassword"
          >{{ showPass ? "visibility_off" : "visibility" }}</span
        >
        <ValidationError v-model="passwordMessage" />
      </div>

      <div class="mb-6 relative">
        <label
          for="passwordConfirm"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Passwort bestätigen</label
        >
        <input
          v-model="passwordConfirm"
          :type="showPass ? 'text' : 'password'"
          id="passwordConfirm"
          name="passwordConfirm"
          class="inputField"
          placeholder="•••••••••"
        />
        <span
          type="button"
          class="material-symbols-outlined absolute right-3 top-9 text-gray-500 cursor-pointer select-none"
          @click="togglePassword"
          >{{ showPass ? "visibility_off" : "visibility" }}</span
        >
        <ValidationError v-model="passwordConfirmMessage" />
      </div>

      <!-- Phone Number -->
      <div class="mb-6">
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Telefonnummer</label
        >
        <input
          v-model="phone"
          type="tel"
          id="phone"
          name="phone"
          class="inputField"
          placeholder="+49 123 12345678"
        />
        <ValidationError v-model="phoneMessage" />
      </div>
      <button type="submit" class="btn mx-auto">Registrieren</button>
    </form>
    <div class="w-full h-px bg-gray-300 my-4"></div>
    <p class="text-center mb-2">Sie haben schon einen Account?</p>
    <button type="button" class="btn-white mx-auto" @click="$emit('toggle')">
      Login
    </button>

    <div
      v-if="registrationSent"
      class="p-4 mb-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center"
      role="alert"
    >
      <span class="font-medium"
        >Sie haben erfolgreich einen Account registriert!</span
      >
    </div>

    <div
      v-if="errorMessage"
      class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">{{ errorMessage }}</span>
    </div>

  </div>
  <RegistrationSuccess v-if="successfullyRegistered" @goToLogin="$emit('toggle')" />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

import Validator from "~/helpers/Validator";

//data
const emit = defineEmits(['toggle']);

const registrationForm = ref(null);
const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");
const phone = ref("");

const firstNameMessage = ref("");
const lastNameMessage = ref("");
const emailMessage = ref("");
const passwordMessage = ref("");
const passwordConfirmMessage = ref("");
const phoneMessage = ref("");

const showPass = ref(false);
const registrationSent = ref(false);
const errorMessage = ref("");

const successfullyRegistered = ref(false);


//FUNCTIONS
//Names
const validateNames = (name) => {
   if (Validator.isEmpty(name)) return Validator.isEmptyMessage(name);

  const textError = Validator.validateTextMessage(name);
  if (textError) return textError;

  const lengthError = Validator.stringIsLongerThanError(name, 1);
  if (lengthError) return lengthError;

  return "";
};

//E-Mail
const validateEmail = (email) => {
if (!email) return "Dieses Feld darf nicht leer sein!";

  const emailError = Validator.validateEmailMessage(email);
  if (emailError) return emailError;

  return "";
}

//Password
const validatePassword = (password) => {
if (!password) return "Dieses Feld darf nicht leer sein!";

  const lengthError = Validator.stringIsLongerThanError(password, 8);
  if (lengthError) return lengthError;

  const spellingError = Validator.passwordSpellingMessage(password);
  if (spellingError) return spellingError;

  return "";
}

// Passwörter vergleichen
const validatePasswordConfirm = (password, passwordConfirm) => {
  if (!passwordConfirm) return "Dieses Feld darf nicht leer sein!";

    const samePasswordError = Validator.passwordsAreTheSame(password, passwordConfirm);
  if (samePasswordError) return samePasswordError;

  return "";
}

//Phone Validation
const validatePhone = (phone) => {
  if (!phone) return "Dieses Feld darf nicht leer sein!";

  const phoneError = Validator.validatePhoneMessage(phone);
  if (phoneError) return phoneError;

  return "";
}


//WATCH
//Validation First Name
watch(firstName, () => {
  firstNameMessage.value = validateNames(firstName.value);
});

//Validation Last Name
watch(lastName, () => {
  lastNameMessage.value = validateNames(lastName.value);
});

//Validation E-Mail
watch(email, () => {
  emailMessage.value = validateEmail(email.value);
});

//Validation Password
watch(password, () => {
  passwordMessage.value = validatePassword(password.value);
});

watch([password, passwordConfirm], () => {
  passwordConfirmMessage.value = validatePasswordConfirm(password.value, passwordConfirm.value);
});


//Validation Phone
watch(phone, () => {
  phoneMessage.value = validatePhone(phone.value)
});

//Show Password
const togglePassword = () => {
  showPass.value = !showPass.value;
};

//Validation
const validateForm = () => {
  firstNameMessage.value = validateNames(firstName.value);
  lastNameMessage.value = validateNames(lastName.value);
  emailMessage.value = validateEmail(email.value);
  passwordMessage.value = validatePassword(password.value);
  passwordConfirmMessage.value = validatePasswordConfirm(password.value, passwordConfirm.value);
  phoneMessage.value = validatePhone(phone.value);

  return !(
    firstNameMessage.value ||
    lastNameMessage.value ||
    emailMessage.value ||
    passwordMessage.value ||
    passwordConfirmMessage.value ||
    phoneMessage.value
  );
};


//Registration Form fetch
async function sendRegistration() {
  if (!validateForm()) {
    return;
  }

  const formdata = new FormData(registrationForm.value);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  try {
    const response = await fetch(
      "https://dev.parkingsoft.de/api/customer/register",
      requestOptions
    );
    const result = await response.json();
    console.log(result);

    if (response.ok) {
      console.log(result);
      registrationSent.value = true;
      errorMessage.value = "";
      // Formular zurücksetzen
      firstName.value = "";
      lastName.value = "";
      email.value = "";
      password.value = "";
      passwordConfirm.value = "";
      phone.value = "";

      //Loginfeld anzeigen
successfullyRegistered.value = true;
// emit('toggle');

    } else {
      errorMessage.value = result.message || "Registrierung fehlgeschlagen";
    }
  } catch (error) {
    console.error(error);
    errorMessage.value =
      "Verbindungsfehler. Bitte versuchen Sie es später erneut.";
  }
}
</script>

<style scoped></style>
