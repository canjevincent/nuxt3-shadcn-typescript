<script setup lang="ts">
  import { columns } from '@/components/admin/product/column';
  import { useDateFormat } from '@vueuse/core';
  import { formatter } from "~/utils";
  // add a products key for the api fetching
  const { data: products, status } = await useFetch(`/api/admin/products/`, { 
    key: 'products',
    transform: (products) => {
      return products.map(item => {
        return {
          id: item.id,
          name: item.name,
          price: formatter.format(item.price),
          isFeatured: item.isFeatured,
          isArchived: item.isArchived,
          category: item.category.name,
          size: item.size.value,
          color: item.color.value,
          createdAt: useDateFormat(new Date(item.createdAt), 'MMMM D, YYYY').value
        }
      })
    } 
  });
</script>

<template>
  <div class="flex justify-between items-center">
    <Heading title="Products" description="Manage Products" />
    <!-- 
      the url /admin/products/new patterns on the pages folder, 'new' patterns on [productId] 
      will be matched by the route.   
    -->
    <NuxtLink to="/admin/products/new">
        <Button>
          <Icon name="lucide:plus" class="mr-2 w-4 h-4"></Icon>
          Add New 
        </Button>
    </NuxtLink>
  </div>
  <!-- Columns are based on columns.ts -->
  <!-- Dropdown action buttons are from CellAction.vue -->
  <DataTable v-if="status !== 'pending'" :columns="columns" column-to-search="name" :data="products ? products : []" ></DataTable>
</template>