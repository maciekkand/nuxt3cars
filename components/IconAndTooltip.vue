<template>
  <div class="group relative w-max">
    <button class="w-6">
      <img
        class="mt-3 -ml-6"
        src="../assets/info.svg"
        :alt="alt"
      />
    </button>
    <span
      class="bg-blue-500 rounded-lg text-white p-2 pointer-events-none absolute -top-16 -left-[120px] w-max opacity-0 transition-opacity group-hover:opacity-100 -ml-2"
    >
      <slot />
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  alt: String
})
</script>
