<script setup lang="ts">
  import { columns } from '@/components/admin/category/column';
  import { useDateFormat } from '@vueuse/core';
  // add a categories key for the api fetching
  const { data: categories, status } = await useFetch(`/api/admin/categories/`, { 
    key: 'categories',
    transform: (colors) => {
      return colors.map(item => {
        return {
          id: item.id,
          name: item.name,
          createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
        }
      });
    }
  })
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading title="Categories" description="Manage Categories" />
    <!-- 
      the url /admin/categories/new patterns on the pages folder, 'new' patterns on [categoryId] 
      will be matched by the route.   
    -->
    <NuxtLink to="/admin/categories/new">
        <Button>
          <Icon name="lucide:plus" class="mr-2 w-4 h-4"></Icon>
          Add New 
        </Button>
    </NuxtLink>
  </div>
  <!-- Columns are based on columns.ts -->
  <!-- Dropdown action buttons are from CellAction.vue -->
  <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="categories ? categories : []" ></DataTable>
</template>