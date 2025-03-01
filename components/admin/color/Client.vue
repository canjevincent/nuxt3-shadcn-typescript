<script setup lang="ts">
  import { columns } from '@/components/admin/color/column';
  import { useDateFormat } from '@vueuse/core';
  // add a colors key for the api fetching
  const { data: colors, status } = await useFetch(`/api/admin/colors/`, { 
    key: 'colors',
    transform: (colors) => {
      return colors.map(item => {
        return {
          id: item.id,
          name: item.name,
          value: item.value,
          createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
        }
      });
    } 
  })
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading title="Colors" description="Manage Colors" />
    <!-- 
      the url /admin/colors/new patterns on the pages folder, 'new' patterns on [colorId] 
      will be matched by the route.   
    -->
    <NuxtLink to="/admin/colors/new">
        <Button>
          <Icon name="lucide:plus" class="mr-2 w-4 h-4"></Icon>
          Add New 
        </Button>
    </NuxtLink>
  </div>
  <!-- Columns are based on columns.ts -->
  <!-- Dropdown action buttons are from CellAction.vue -->
  <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="colors ? colors : []" ></DataTable>
</template>