<script setup lang="ts">
  import type { RouteParams } from '~/types';
  import { toTypedSchema } from '@vee-validate/zod';  
  import { useForm } from 'vee-validate';

  const { isLoading, showMessage, showError, toggleLoading } = useStore();

  const isAlertModalVisible = ref(false);
  const title = ref('Edit Category');
  const description = ref('Edit Category.');
  const toastMessage = ref('Category Updated');
  const action = ref('Save Changes');
  const isEditing = ref(true);

  // Mutation directed to folder : Server / Api / Admin / Categories / [categoryId]
  const route = useRoute(); // -> get value from the parameter [categoryId] by using ${(route.params as RouteParams).categoryId}
  const { data: currentCategory } = await useFetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`); // -> index.get.ts

  watchEffect(() => {
    if (!currentCategory.value) {
      title.value = 'Create Category';
      description.value = 'Add a new category.';
      toastMessage.value = 'Category Added';
      action.value = 'Create Category';
      isEditing.value = false;
    }
  });

  const formSchema = toTypedSchema(categorySchema);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentCategory.value || {
      name: ''
    }
  });

  const onSubmit = form.handleSubmit(async(values) => {
    try {
      toggleLoading(true);

      if (isEditing.value) {
        console.log('Edit Category', values);

        await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
          method: 'PATCH',
          body: values
        });
        
      } else {
        console.log('Add Category', values);
        
        // Mutation directed to folder : Server / Api / Admin / Categories 
        const data = await $fetch('/api/admin/categories/', {
          method: 'POST', // -> index.post.ts
          body: values
        });
        
      }

      showMessage({
        title: toastMessage.value
      });

      await navigateTo('/admin/categories');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  })

  const deleteCategory = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Category'
      });

      await navigateTo('/admin/categories');

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
              <Input placeholder="Category Name" v-bind="componentField" :disabled="isLoading" />
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
    @on-confirm="deleteCategory" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>