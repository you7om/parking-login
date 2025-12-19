<template>
  <div class="flex flex-col gap-5 mx-5 md:mx-0 mt-5">
    
    <form @submit.prevent="" class="flex flex-col gap-5">
      <!-- Firma -->
      <div class="form-row">
        <label for="firma" class="form-label">Firma</label>
        <input
          id="firma"
          type="text"
          v-model="formData.firma"
          class="form-input"
          placeholder="Firma"
        />
      </div>

      <!-- Anrede -->
      <div class="form-row">
        <label for="anrede" class="form-label">Anrede*</label>
        <select
          id="anrede"
          v-model="formData.anrede"
          class="form-input cursor-pointer"
          required
        >
          <option value="" disabled>Bitte wählen</option>
          <option value="Frau">Frau</option>
          <option value="Herr">Herr</option>
        </select>
      </div>

      <!-- Vorname -->
      <div class="form-row">
        <label for="vorname" class="form-label">Vorname*</label>
        <input
          id="vorname"
          type="text"
          v-model="formData.vorname"
          class="form-input"
          placeholder="Vorname"
          required
        />
      </div>

      <!-- Name -->
      <div class="form-row">
        <label for="name" class="form-label">Name*</label>
        <input
          id="name"
          type="text"
          v-model="formData.name"
          class="form-input"
          placeholder="Name"
          required
        />
      </div>

      <!-- Strasse / Nr. -->
      <div class="form-row">
        <label for="strasse" class="form-label">Strasse / Nr.*</label>
        <input
          id="strasse"
          type="text"
          v-model="formData.strasse"
          class="form-input"
          placeholder="Strasse / Nr."
          required
        />
      </div>

      <!-- PLZ -->
      <div class="form-row">
        <label for="plz" class="form-label">PLZ*</label>
        <input
          id="plz"
          type="text"
          v-model="formData.plz"
          class="form-input"
          placeholder="PLZ"
          required
        />
      </div>

      <!-- Ort -->
      <div class="form-row">
        <label for="ort" class="form-label">Ort*</label>
        <input
          id="ort"
          type="text"
          v-model="formData.ort"
          class="form-input"
          placeholder="Ort"
          required
        />
      </div>

      <!-- Land -->
      <div class="form-row">
        <label for="land" class="form-label">Land*</label>
        <input
          id="land"
          type="text"
          v-model="formData.land"
          class="form-input"
          value="Deutschland"
          required
        />
      </div>

      <!-- E-Mail -->
      <div class="form-row">
        <label for="email" class="form-label">E-Mail*</label>
        <input
          id="email"
          type="email"
          v-model="formData.email"
          class="form-input"
          placeholder="E-Mail"
          required
        />
      </div>

      <!-- E-Mail wiederholen -->
      <div class="form-row">
        <label for="emailRepeat" class="form-label">E-Mail wiederholen*</label>
        <input
          id="emailRepeat"
          type="email"
          v-model="formData.emailRepeat"
          class="form-input"
          placeholder="E-Mail wiederholen"
          required
        />
      </div>

      <!-- Handy -->
      <div class="form-row">
        <label for="handy" class="form-label">Handy*</label>
        <input
          id="handy"
          type="tel"
          v-model="formData.handy"
          class="form-input"
          placeholder="Handy"
          required
        />
      </div>

      <!-- KFZ-Kennzeichen -->
      <div class="form-row">
        <label for="kennzeichen" class="form-label">KFZ-Kennzeichen*</label>
        <input
          id="kennzeichen"
          type="text"
          v-model="formData.kennzeichen"
          class="form-input"
          placeholder="KFZ-Kennzeichen"
          required
        />
      </div>

      <!-- Fabrikat / Model / Farbe -->
      <div class="form-row">
        <label for="fahrzeug" class="form-label">Fabrikat / Model / Farbe</label>
        <input
          id="fahrzeug"
          type="text"
          v-model="formData.fahrzeug"
          class="form-input"
          placeholder="z.B. BMW X5 Schwarz"
        />
      </div>

      <!-- Personen Section -->
      <div class="flex flex-col gap-5 mt-5">
        <h2 class="form-section-title">Personen</h2>

        <!-- Erwachsene -->
        <div class="form-row">
          <label for="erwachsene" class="form-label">Erwachsene</label>
          <select
            id="erwachsene"
            v-model="formData.erwachsene"
            class="form-input cursor-pointer"
          >
            <option v-for="n in 12" :key="n" :value="n">
              {{ n }} {{ n === 1 ? 'Erwachsener' : 'Erwachsene' }}
            </option>
          </select>
        </div>

        <!-- Kinder -->
        <div class="form-row">
          <label for="kinder" class="form-label">Kinder (2 bis 11 Jahre)</label>
          <select
            id="kinder"
            v-model="formData.kinder"
            class="form-input cursor-pointer"
          >
            <option :value="0">0 Kinder (2 bis 11 Jahre)</option>
            <option v-for="n in 5" :key="n" :value="n">
              {{ n }} {{ n === 1 ? 'Kind' : 'Kinder' }} (2 bis 11 Jahre)
            </option>
          </select>
        </div>

        <!-- Babys -->
        <div class="form-row">
          <label for="babys" class="form-label">Babys (bis 2 Jahre)</label>
          <select
            id="babys"
            v-model="formData.babys"
            class="form-input cursor-pointer"
          >
            <option :value="0">0 Babys (bis 2 Jahre)</option>
            <option v-for="n in 6" :key="n" :value="n">
              {{ n }} {{ n === 1 ? 'Baby' : 'Babys' }} (bis 2 Jahre)
            </option>
          </select>
        </div>
      </div>

      <!-- Sperrgepäck Section -->
      <div class="flex flex-col gap-5 mt-5">
        <h2 class="form-section-title">Sperrgepäck</h2>

        <!-- Rollstuhl -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.rollstuhl"
              class="w-4 h-4"
            />
            Rollstuhl
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">10,00 €</span>
        </div>

        <!-- Fahrradkoffer -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.fahrradkoffer"
              class="w-4 h-4"
            />
            Fahrradkoffer
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">10,00 €</span>
        </div>

        <!-- Hundebox -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.hundebox"
              class="w-4 h-4"
            />
            Hundebox
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">20,00 €</span>
        </div>

        <!-- Surfbrett -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.surfbrett"
              class="w-4 h-4"
            />
            Surfbrett
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">20,00 €</span>
        </div>

        <!-- Kinderwagen -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.kinderwagen"
              class="w-4 h-4"
            />
            Kinderwagen
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">0,00 €</span>
        </div>

        <!-- Golfgepäck -->
        <div class="form-row">
          <label class="form-label flex items-center gap-2">
            <input
              type="checkbox"
              v-model="formData.sperrgepäck.golfgepäck"
              class="w-4 h-4"
            />
            Golfgepäck
          </label>
          <span class="text-sm text-gray-600 md:w-3/4">0,00 €</span>
        </div>
      </div>

      <!-- Bemerkungen -->
      <div class="form-row mt-5 items-start!">
        <label for="bemerkungen" class="form-label">Bemerkungen</label>
        <textarea
          id="bemerkungen"
          v-model="formData.bemerkungen"
          class="form-input"
          rows="4"
          placeholder="Ihre Bemerkungen..."
        ></textarea>
      </div>

      <!-- Zahlungsart -->
      <div class="flex flex-col gap-5 mt-5">
        <h2 class="form-section-title">Zahlungsart</h2>

        <div class="flex flex-col gap-3">
          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="zahlungsart"
              value="Barzahlung"
              v-model="formData.zahlungsart"
              class="w-4 h-4"
            />
            <span class="text-base font-medium text-gray-700">Barzahlung vor Ort</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="zahlungsart"
              value="PayPal"
              v-model="formData.zahlungsart"
              class="w-4 h-4"
            />
            <span class="text-base font-medium text-gray-700">PayPal</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="zahlungsart"
              value="Kreditkarte"
              v-model="formData.zahlungsart"
              class="w-4 h-4"
            />
            <span class="text-base font-medium text-gray-700">Kreditkarte</span>
          </label>

          <label class="flex items-center gap-2">
            <input
              type="radio"
              name="zahlungsart"
              value="Lastschrift"
              v-model="formData.zahlungsart"
              class="w-4 h-4"
            />
            <span class="text-base font-medium text-gray-700">Lastschrift</span>
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-5">
        <button type="submit" class="btn">
          Weiter
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  firma: '',
  anrede: '',
  vorname: '',
  name: '',
  strasse: '',
  plz: '',
  ort: '',
  land: 'Deutschland',
  email: '',
  emailRepeat: '',
  handy: '',
  kennzeichen: '',
  fahrzeug: '',
  erwachsene: 1,
  kinder: 0,
  babys: 0,
  sperrgepäck: {
    rollstuhl: false,
    fahrradkoffer: false,
    hundebox: false,
    surfbrett: false,
    kinderwagen: false,
    golfgepäck: false
  },
  bemerkungen: '',
  zahlungsart: 'Barzahlung'
});
</script>

<style scoped>
@reference "tailwindcss";

.form-row {
  @apply flex flex-col md:flex-row md:items-center gap-2;
}

.form-label {
  @apply text-lg font-medium text-gray-700 w-1/4;
}

.form-input {
  @apply block w-full p-2.5 bg-white border border-gray-400 text-sm shadow-xs md:w-3/4 rounded-lg;
}

.form-section-title {
  @apply text-2xl font-bold;
}
</style>
