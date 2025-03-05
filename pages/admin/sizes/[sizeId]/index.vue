<script lang="ts" setup>
  definePageMeta({
      middleware: 'admin'
  })
</script>

<template>
  <div class="flex-col">
    <div class="flex-1 p-8 pt-6 space-y-4">
      <AdminSizeForm></AdminSizeForm>
    </div>
  </div>
</template>
