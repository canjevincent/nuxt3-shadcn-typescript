<script setup lang="ts">
  import { columns } from '@/components/admin/size/column';
  import { useDateFormat } from '@vueuse/core';
  // add a sizes key for the api fetching
  const { data: sizes, status } = await useFetch(`/api/admin/sizes/`, { 
    key: 'sizes',
    transform: (sizes) => {
      return sizes.map(item => {
        return {
          id: item.id,
          name: item.name,
          value: item.value,
          createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
        }
      });
    },
    // lazy: true - allow user to display the next page without waiting for the data to be fetched
  })
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading title="sizes" description="Manage sizes" />
    <!-- 
      the url /admin/sizes/new patterns on the pages folder, 'new' patterns on [sizeId] 
      will be matched by the route.   
    -->
    <NuxtLink to="/admin/sizes/new">
        <Button>
          <Icon name="lucide:plus" class="mr-2 w-4 h-4"></Icon>
          Add New 
        </Button>
    </NuxtLink>
  </div>
  <!-- Columns are based on columns.ts -->
  <!-- Dropdown action buttons are from CellAction.vue -->
  <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="sizes ? sizes : []" ></DataTable>
</template>