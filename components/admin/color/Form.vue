<script setup lang="ts">
  import type { RouteParams } from '~/types';
  import { toTypedSchema } from '@vee-validate/zod';  
  import { useForm } from 'vee-validate';

  const { isLoading, showMessage, showError, toggleLoading } = useStore();

  const title = ref('Edit Color');
  const description = ref('Edit Color.');
  const toastMessage = ref('Color Updated');
  const action = ref('Save Changes');
  const isEditing = ref(true);

  // Mutation directed to folder : Server / Api / Admin / Colors / [colorId]
  const route = useRoute(); // -> get value from the parameter [colorId] by using ${(route.params as RouteParams).colorId}
  const { data: currentColor } = await useFetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`); // -> index.get.ts

  watchEffect(() => {
    if (!currentColor.value) {
      title.value = 'Create Color';
      description.value = 'Add a new Color.';
      toastMessage.value = 'Color Added';
      action.value = 'Create Color';
      isEditing.value = false;
    }
  });

  const formSchema = toTypedSchema(colorSchema);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentColor.value || {
      name: '',
      value: '#000000'
    }
  });

  const onSubmit = form.handleSubmit(async(values) => {
    try {
      toggleLoading(true);

      if (isEditing.value) {
        console.log('Edit Color', values);

        await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
          method: 'PATCH',
          body: values
        });
        
      } else {
        console.log('Add Color', values);
        
        // Mutation directed to folder : Server / Api / Admin / Colors 
        const data = await $fetch('/api/admin/colors/', {
          method: 'POST', // -> index.post.ts
          body: values
        });
        
      }

      showMessage({
        title: toastMessage.value
      });

      await navigateTo('/admin/colors');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  })

  const deleteColor = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/colors/${(route.params as RouteParams).colorId}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Color'
      });

      await navigateTo('/admin/colors');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  }
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <Heading :title="title" :description="description" />
    
      <Button @click="isAlertModalVisible = !isAlertModalVisible" v-if="isEditing" variant="destructive" size="sm">
        <Icon name="lucide:trash" class="w-4 h-4"></Icon>
      </Button>
    </div>  

    <Separator class="my-4"></Separator>
    
    <form @submit.prevent="onSubmit" class="space-y-8 w-full">
      <div class="gap-8 md:grid md:grid-cols-3">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <Formlabel>Name</Formlabel>
            
            <FormControl>
              <Input placeholder="Color Name" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <Formlabel>Value</Formlabel>
            
            <FormControl>
              <Input type="color" placeholder="#000000" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <Button :disabled="isLoading" type="submit" class="ml-auto">
        {{ action }}
      </Button>
    </form>
  </div>
  <AlertModal 
    v-if="isAlertModalVisible" 
    @on-confirm="deleteColor" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>