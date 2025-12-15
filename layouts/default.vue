<template>
  <div class="relative w-full">
    <!-- Fixiertes Hintergrundbild -->
    <div class="fixed inset-0 bg-[url('/img/parking-cover-cropped.png')] bg-cover bg-center -z-10 "></div>

    <div class="relative flex flex-col">      
      <!-- Main Content Area -->
      <div class="flex-1 overflow-y-auto">
        <slot />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}
</script>