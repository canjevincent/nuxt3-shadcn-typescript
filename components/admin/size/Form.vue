<script setup lang="ts">
  import type { RouteParams } from '~/types';
  import { toTypedSchema } from '@vee-validate/zod';  
  import { useForm } from 'vee-validate';

  const { isLoading, showMessage, showError, toggleLoading } = useStore();

  const isAlertModalVisible = ref(false);
  const title = ref('Edit Size');
  const description = ref('Edit Size.');
  const toastMessage = ref('Size Updated');
  const action = ref('Save Changes');
  const isEditing = ref(true);

  // Mutation directed to folder : Server / Api / Admin / Sizes / [sizeId]
  const route = useRoute(); // -> get value from the parameter [sizeId] by using ${(route.params as RouteParams).sizeId}
  const { data: currentSize } = await useFetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`); // -> index.get.ts

  watchEffect(() => {
    if (!currentSize.value) {
      title.value = 'Create Size';
      description.value = 'Add a new Size.';
      toastMessage.value = 'Size Added';
      action.value = 'Create Size';
      isEditing.value = false;
    }
  });

  const formSchema = toTypedSchema(sizeSchema);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentSize.value || {
      name: '',
      value:'',
    }
  });

  const onSubmit = form.handleSubmit(async(values) => {
    try {
      toggleLoading(true);

      if (isEditing.value) {
        console.log('Edit Size', values);

        await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
          method: 'PATCH',
          body: values
        });
        
      } else {
        console.log('Add Size', values);
        
        // Mutation directed to folder : Server / Api / Admin / Sizes 
        const data = await $fetch('/api/admin/sizes/', {
          method: 'POST', // -> index.post.ts
          body: values
        });
        
      }

      showMessage({
        title: toastMessage.value
      });

      await navigateTo('/admin/sizes');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  })

  const deleteSize = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/sizes/${(route.params as RouteParams).sizeId}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Size'
      });

      await navigateTo('/admin/sizes');

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
              <Input placeholder="Size Name" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <Formlabel>Size Code</Formlabel>
            
            <FormControl>
              <Input placeholder="xl" v-bind="componentField" :disabled="isLoading" />
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
    @on-confirm="deleteSize" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>