<script setup lang="ts">
  const { showMessage, showError, toggleLoading } = useStore();
  const isAlertModalVisible = ref(false);

  const props = defineProps<{
    color: {
      id: string
    }
  }>()

  function copy(id: string) {
    // Web API
    navigator.clipboard.writeText(id);

    showMessage({
      title: 'Color Id Copied'
    })
    
  }

  const deleteColor = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/colors/${props.color.id}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Color'
      });

      // Will trigger a refresh on Client.vue page to refetch the api that contains key: colors  
      refreshNuxtData('colors');

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
        <DropdownMenuItem @click="copy(color.id)">
          <Icon name="lucide:copy" class="mr-2 w-4 h-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
        <DropdownMenuItem @click="navigateTo(`/admin/colors/${color.id}`)">
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
    @on-confirm="deleteColor" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>