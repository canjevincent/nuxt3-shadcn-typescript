<script setup lang="ts">
</script>

<template> 
  <div class="flex flex-col justify-center items-center space-y-3 w-full h-full">
    <div class="flex justify-center items-center text-neutral-500">
      No result found.
    </div>

    <NuxtLink to="/products">
      <Button variant="outline" @click="navigateTo('/products')">Clear Filters</Button>
    </NuxtLink>
  </div>
</template>