<script setup lang="ts">
  const props = defineProps<{
    isOpen: boolean
  }>();

  const { isLoading } = useStore();

  const isModalVisible = computed(() => props.isOpen);

  const emit = defineEmits(['onConfirm','onClose']);
</script>

<template>
  <Modal 
    :is-modal-visible="isModalVisible" 
    title="Are you sure?" 
    description="This action cannot be undone."
    @on-close="emit('onClose')"
  >
    <div class="flex justify-end items-center pt-6 space-x-2 w-full">
      <Button :disabled="isLoading" variant="outline" @click="emit('onClose')">Cancel</Button>
      <Button :disabled="isLoading" variant="destructive" @click="$emit('onConfirm')">Continue</Button>
    </div>
  </Modal>
</template>

