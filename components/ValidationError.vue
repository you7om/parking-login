<template>
  <p v-if="modelValue" class="text-red-600 text-sm mt-2">
    {{ modelValue  }}
  </p>
</template>

<script setup>
const props = defineProps({
  modelValue : String, // <-- dein benannter v-model
});

const emit = defineEmits(["update:modelValue "]); // <-- Event für benannten v-model
</script>
