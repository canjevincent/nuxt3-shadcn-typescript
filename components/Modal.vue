<script setup lang="ts">
 // properties that will be received from the parent component
  const props = defineProps<{
    isModalVisible: boolean;
    title?: string;
    description?: string;
  }>();

  // Declares the events that the component can emit, emit: A function returned by defineEmits that is used to emit events. 
  // You can pass data along with the event if needed. The parent component can listen to these events using @click or @customEvent.
  const emits = defineEmits(['onClose']);

  // computed() is used to create a reactive property isOpen that depends on the props.isModalVisible
  // The get() function inside computed() returns the current value of props.isModalVisible. This means isOpen will always reflect the value of props.isModalVisible.
  // The set() function is called whenever you try to assign a new value to isOpen. In your case, when isOpen is set to a new value (value), it emits the onClose event to the parent component.
  // This allows the parent component to react to changes in isOpen (e.g., closing the modal).
  const isOpen = computed({
    get() {
      return props.isModalVisible; // Default value from props
    },
    set(value) {
      emits('onClose');
    }
  })
</script>

<template>
  <Dialog :open="isOpen" @update:open="emits('onClose')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>

      <div>
        <slot></slot>
      </div>
    </DialogContent>
  </Dialog>
</template>