<template>
  
    <div v-if="error" class="error-card" role="alert">
      <svg
        class="error-icon"
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
          d="M10 11h2v5m-2 0h4m-2.592-8.5h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>

      <p class="flex-1">
        <span class="error-title">Login fehlgeschlagen:</span>
        {{ error }}
      </p>

      <!-- Close Button -->
      <button
        type="button"
        class="absolute top-2 right-2 text-red-800 hover:text-red-700 font-bold cursor-pointer"
        @click="$emit('close')"
      >
        ✕
      </button>
    </div>
</template>

<script setup>
defineProps({
  error: {
    type: String,
    default: ""
  }
});
</script>

<style scoped>
@reference 'tailwindcss';

.error-card {
  @apply relative flex items-start max-w-md w-full mx-auto my-3 px-4 py-2 text-sm text-red-800 rounded-lg bg-red-100 border border-red-300 shadow;
}

.error-icon {
  @apply w-5 h-5 me-2 mt-0.5 shrink-0;
}

.error-title {
  @apply font-medium me-1;
}


</style>
