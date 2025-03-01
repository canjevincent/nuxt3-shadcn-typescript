<script setup lang="ts">
  defineProps<{
    colorCode: string;
  }>();
</script>

<template>
  <div class="flex gap-x-2 items-center">
    {{ colorCode }}
    <div class="w-6 h-6 rounded-full border" :style="`background-color: ${colorCode}`"></div>
  </div>
</template>

