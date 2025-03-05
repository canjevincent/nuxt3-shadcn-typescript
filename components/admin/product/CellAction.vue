<script setup lang="ts">
  const { showMessage, showError, toggleLoading } = useStore();
  const isAlertModalVisible = ref(false);

  const props = defineProps<{
    product: {
      id: string
    }
  }>()

  function copy(id: string) {
    // Web API
    navigator.clipboard.writeText(id);

    showMessage({
      title: 'Product Id Copied'
    })
    
  }

  const deleteProduct = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/products/${props.product.id}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Product'
      });

      // Will trigger a refresh on Client.vue page to refetch the api that contains key: products  
      refreshNuxtData('products');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  }
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="p-0 w-8 h-8">
        <span class="sr-only"></span>
        <Icon name="lucide:more-horizontal" class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent class="w-56" align="end">
        <DropdownMenuItem @click="copy(product.id)">
          <Icon name="lucide:copy" class="mr-2 w-4 h-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo(`/admin/products/${product.id}`)">
          <Icon name="lucide:pencil" class="mr-2 w-4 h-4" />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="isAlertModalVisible = !isAlertModalVisible">
          <Icon name="lucide:trash" class="mr-2 w-4 h-4" />
          <span>Delete</span>
        </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertModal 
    v-if="isAlertModalVisible" 
    @on-confirm="deleteProduct" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>