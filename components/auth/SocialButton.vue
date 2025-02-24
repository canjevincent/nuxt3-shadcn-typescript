<script lang="ts" setup>
  defineProps<{
    label: string,
    icon: string
  }>();

  const authenticate = () => {
    window.location.href = '/api/auth/github'
  }
</script>

<template>
  <Button @click="authenticate" type="button" variant="outline">
    <div class="flex items-center">
      <Icon :name="icon" class="mr-2 w-4 h-4"></Icon>
      {{ label }}
    </div>
  </Button>
</template>
