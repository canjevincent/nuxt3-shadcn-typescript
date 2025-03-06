<script setup lang="ts">

  import type { SafeProduct } from '~/types'

  const { data: products, status } = await useFetch<SafeProduct[]>(`/api/admin/products/`,{
    lazy: true
  });

</script>

<template>
  <Hero />
  <div class="py-16 mx-auto w-full max-w-5xl sm:py-32">
    <div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList :items="products || []" title="Featured Products" :is-loading="status === 'pending'" />
    </div>
  </div>
  <ProductModal />
</template>

 