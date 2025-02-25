<script setup lang="ts">
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading title="Categories" description="Manage Categories" />
    <NuxtLink to="/admin/categories/new">
        <Button>
          <Icon name="lucide:plus" class="mr-2 w-4 h-4"></Icon>
          Add New
        </Button>
    </NuxtLink>
  </div>  
</template>