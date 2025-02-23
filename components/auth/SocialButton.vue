<script lang="ts" setup>
  defineProps<{
    label: string,
    icon: string
  }>();
</script>

<style scoped>

</style>

<template>
  <Button type="button" variant="outline">
    <div class="flex items-center">
      <Icon :name="icon" class="mr-2 w-4 h-4"></Icon>
      {{ label }}
    </div>
  </Button>
</template>
