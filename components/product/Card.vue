<script setup lang="ts">
  import type { SafeProduct } from '~/types';

  defineProps<{
    data: SafeProduct
  }>();

  const { onOpen } = usePreviewModal();

</script>

<template>
  <div>
   <Card class="p-3 border shadow-none">
      <CardContent class="p-0">
        <div class="overflow-hidden relative rounded-md">
          
          <img :src="data.images[0].url" :alt="data.name" class="h-[200px]">
          
          <div class="absolute top-2 left-2" v-if="data.isFeatured">
            <Badge variant="destructive" class="w-auto">
              Featured
            </Badge>
          </div>

          <div class="absolute top-2 right-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger as-child>
                  <Button
                    @click.stop="() => {
                      onOpen(data);
                    }" 
                    size="icon" 
                    class="rounded-full"
                  >
                    <Icon name="lucide:expand" class="w-4 h-4" />
                  </Button>
                </TooltipTrigger>

                <TooltipContent>
                  <p>Preview Porduct</p>
                </TooltipContent>

              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <h3 class="mt-4 font-bold text-gray-900">{{ data.name }}</h3>
        <p class="italic text-gray-500">{{ data.category.name }}</p>
        <p class="mt-2 font-medium text-foreground">$ {{ data.price }}</p>
        <Button variant="secondary" class="mt-4 w-full">
          Add to cart
        </Button>
      </CardContent>
    </Card>
  </div> 
  <ProductModal></ProductModal>
</template>