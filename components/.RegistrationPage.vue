<template>
  <div class="container w-3/4 lg:w-1/4 flex flex-col justify-center p-5 mx-auto my-10 border border-neutral-200 
    rounded-md shadow-md transition-shadow duration-300 ease-in-out bg-white gap-1">
    <form @submit.prevent="sendRegistration" class="flex flex-col" ref="registrationForm">

      <!-- FirstName -->

      <div class="mb-6" v-if="!errorFirstName">
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
      </div> 
      <div v-if="errorFirstName" class="mb-6">
        <label
          for="error"
          class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
          >Vorname</label
        >
        <input
          v-model="firstName"
          type="text"
          id="error"
          class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
          
          
        />
<ValidationError />
      </div>

      <!-- LastName -->
      <div class="mb-6" v-if="!errorLastName">
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
      </div>
      <div v-if="errorLastName" class="mb-6">
        <label
          for="error"
          class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
          >Nachname</label
        >
        <input
          v-model="lastName"
          type="text"
          id="error"
          class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
          
          
        />
        <p class="mt-2 text-sm text-red-600 dark:text-red-500">Geben Sie bitte den gültigen Namen ein.</p>
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
          class="material-icons absolute right-3 top-9 text-gray-500 cursor-pointer select-none" @click="togglePassword"
          >{{showPass ? 'visibility_off' : 'visibility'}}</span>
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
          class="material-icons absolute right-3 top-9 text-gray-500 cursor-pointer select-none" @click="togglePassword"
          >{{ showPass ? 'visibility_off' : 'visibility' }}</span>
      </div>

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
          placeholder="Telefonnummer"
          
        />
      </div>
      <button type="submit" class="btn mx-auto">Registrieren</button>
    </form>
    <div class="w-full h-px bg-gray-300 my-4"></div>
    <p class="text-center mb-2">Sie haben schon einen Account?</p>
    <button type="button" class="btn-white mx-auto" @click="$emit('toggle')">Login</button>


    <div v-if="registrationSent" class="p-4 mb-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 text-center" role="alert">
  <span class="font-medium ">Sie haben erfolgreich einen Account registriert!</span>
</div>

<div v-if="errorMessage" class="p-4 mb-4 mt-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span class="font-medium">{{errorMessage}}</span>
</div>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'; 

//data
const registrationForm = ref(null);
const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const phone = ref('');

const errorFirstName = ref(false);
const errorLastName = ref(false);
const errorEmail = ref(false);
const errorPassword = ref(false);
const errorPhone = ref(false);

const showPass = ref(false);
const registrationSent = ref(false);
const errorMessage = ref("");

//Fehler zurücksetzen beim Tippen
watch(firstName, () => {
  if (errorFirstName.value) {
    errorFirstName.value = false;
    errorMessage.value = "";
  }
});

watch(lastName, () => {
  if (errorLastName.value) {
    errorLastName.value = false;
    errorMessage.value = "";
  }
});

watch(email, () => {
  if (errorEmail.value) {
    errorEmail.value = false;
    errorMessage.value = "";
  }
});

watch(password, () => {
  if (errorPassword.value) {
    errorPassword.value = false;
    errorMessage.value = "";
  }
});

watch(passwordConfirm, () => {
  if (errorPassword.value) {
    errorPassword.value = false;
    errorMessage.value = "";
  }
});

watch(phone, () => {
  if (errorPhone.value) {
    errorPhone.value = false;
    errorMessage.value = "";
  }
});

//Show Password
const togglePassword = () => {
  showPass.value = !showPass.value
}


//Validation

const validateName = () => {
errorFirstName.value = false;
  errorLastName.value = false; 

   const nameRegex = /^[A-Za-zÄÖÜäöüß\s-]+$/; 
   
  if (!nameRegex.test(firstName.value)) {
    errorMessage.value = "Vorname darf nur Buchstaben enthalten!";
    errorFirstName.value = true;
    return false;
  }

   if (!nameRegex.test(lastName.value)) {
    errorMessage.value = "Nachname darf nur Buchstaben enthalten!";
    errorLastName.value = true;
    return false;
  }

}

const validateForm = () => {
   // Reset Fehler
  errorFirstName.value = false;
  errorLastName.value = false;  
  errorEmail.value = false;      
  errorPassword.value = false;   
  errorPhone.value = false;      
  errorMessage.value = "";

validateName();


  // 1. Pflichtfelder prüfen
  // if (!firstName.value.trim() || !lastName.value.trim() || !email.value.trim() || !password.value.trim() || !passwordConfirm.value.trim() || !phone.value.trim()) {
  //   errorMessage.value = "Bitte alle Felder ausfüllen!";
  //   errorFirstName.value = true;
  //   errorLastName.value = true;
  //   errorEmail.value = true;
  //   errorPassword.value = true;
  //   errorPhone.value = true;

  //   return false;
  // }

 
  // 3. Passwort-Abgleich prüfen
  if (password.value !== passwordConfirm.value) {
    errorMessage.value = "Passwörter stimmen nicht überein!";
    return false;
  }

  return true;
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
  redirect: "follow"
};

try {
    const response = await fetch("https://dev.parkingsoft.de/api/customer/register", requestOptions);
    const result = await response.json();
    console.log(result)
    
    if (response.ok) {
      console.log(result);
      registrationSent.value = true;
      errorMessage.value = "";
      // Formular zurücksetzen
      firstName.value = '';
      lastName.value = '';
      email.value = '';
      password.value = '';
      passwordConfirm.value = '';
      phone.value = '';
    } else {
      errorMessage.value = result.message || "Registrierung fehlgeschlagen";
    }
  } catch (error) {
    console.error(error);
    errorMessage.value = "Verbindungsfehler. Bitte versuchen Sie es später erneut.";
  }
}




</script>

<style scoped></style>
