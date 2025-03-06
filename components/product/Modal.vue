<script lang="ts" setup>
  const { isOpen, onClose, selectedProduct } = usePreviewModal();
</script>

<style>
  .previous-btn {
    left: calc(50% - 40px);
    top: calc(100% - 30px);
  }

  .next-btn {
    left: 50%;
    top: calc(100% - 30px);
  }
</style>

<template>
  <Modal :is-modal-visible="isOpen" @on-close="onClose">
    <div class="grid grid-cols-1 gap-x-6 gap-y-8 items-start w-full sm:grid-cols-12 lg:gap-x-8" v-if="selectedProduct">

      <div class="sm:col-span-4 lg:col-span-6">
        <Carousel class="relative w-full">
          <CarouselContent>
            <CarouselItem v-for="(image, i) in selectedProduct.images" :key="i">
              <div class="flex justify-center items-center p-2 rounded border aspect-square">
                <img :src="image.url" alt="" class="size-[150px] object-cover objecct-center" />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="previous-btn" />
          <CarouselNext class="next-btn" />
        </Carousel>
      </div>
      
      <div class="sm:col-span-8 lg:col-span-6">
        <ProductInfo :data="selectedProduct" />
      </div>
      
    </div>
  </Modal>
</template>