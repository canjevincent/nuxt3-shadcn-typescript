<script lang="ts" setup>
  import Toaster from '@/components/ui/toast/Toaster.vue'
</script>

<template>
  <NuxtLoadingIndicator></NuxtLoadingIndicator>
  <Toaster />
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
</template>
