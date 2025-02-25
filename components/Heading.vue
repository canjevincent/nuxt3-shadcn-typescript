<script setup lang="ts">
  interface HeadingProps {
      title: string
      description: string
  }

  defineProps<HeadingProps>();
</script>

<template>
    <div class="flex justify-between items-center">
      <div>
        <h2 class="text-3xl font-bold tracking-tight">{{ title }}</h2>
        <p class="text-sm text-muted-foreground">{{ description }}</p>
      </div>
      <slot name="action">
        
      </slot>
    </div>
</template>