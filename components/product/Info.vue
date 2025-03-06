<script setup lang="ts">
  import type { SafeProduct } from '@/types';

  interface InfoProps {
    data: SafeProduct;
  }

  defineProps<InfoProps>();

</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">{{ data.name }}</h1>
    <div clas="mt-3 flex items-end justify-between">
      <div class="text-2xl text-gray-900">
        <div class="flex justify-between items-center">
          <div class="font-semibold">
            {{ formatter.format(Number(data?.price)) }}
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4" />

    <div class="flex flex-col gap-y-6">
      <div class="flex gap-x-4 items-center">
        <h3 class="font-semibold text-black">Size:</h3>
        <div>{{ data?.size?.value }}</div>
      </div>

      <div class="flex gap-x-4 items-center">
        <h3 class="font-semibold text-black">Color:</h3>
        <div class="w-6 h-6 rounded-full border border-gray-600" 
             :style="`background-color:${data.color.value}`"/>
        </div>
    </div>  

    <div class="flex gap-x-3 items-center mt-10">
      <Button class="rounded-full">
        <Icon name="lucide:shopping-cart" class="mr-2 w-4 h-4" />
        Add to Cart
      </Button>
    </div>
  </div>
</template>