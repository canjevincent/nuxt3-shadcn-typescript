<script setup lang="ts">
</script>

<template>
  <section class="bg-rose-100">
    <div class="isolate relative px-6 pt-14 lg:px-8">
      <div class="py-16 mx-auto max-w-5xl sm:py-32">
        
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div class="relative px-3 py-1 text-sm leading-6 rounded-full ring-1 text-foreground ring-gray-900/10 hover:ring-gray-900/20">
            
            Announcing our next summer products
            
            <NuxtLink to="/products" class="font-semibold text-primary">
              <span class="absolute inset-0" aria-hidden="true" />
              Explore Products
              <span aria-hidden="true">&rarr;</span>
            </NuxtLink>

          </div>
        </div>

        <div class="text-center">

          <h1 class="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Summer styles are finally here
          </h1>

          <p class="mt-6 text-lg leading-8 text-foreground">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
            cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </p>

          <div class="flex gap-x-6 justify-center items-center mt-10">
            <NuxtLink to="/products">
              <Button>Shop Collection</Button>
            </NuxtLink>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>