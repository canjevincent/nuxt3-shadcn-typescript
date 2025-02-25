<script setup lang="ts">
  import type { RouteParams } from '~/types';
  import { toTypedSchema } from '@vee-validate/zod';  
  import { useForm } from 'vee-validate';

  const { isLoading, showMessage, showError, toggleLoading } = useStore();

  const title = ref('Edit Category');
  const description = ref('Edit Category');
  const toastMessage = ref('Category Updated');
  const action = ref('Save Changes');
  const isEditing = ref(true);

  const route = useRoute();
  const { data: currentCategory } = await useFetch(`/api/admin/categories/${(route.params as RouteParams).categoryId}`);

  const formSchema = toTypedSchema(categorySchema);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentCategory.value || {
      name: ''
    }
  });

  const onSubmit = form.handleSubmit(async(values) => {
    
  })

</script>

<template>
  <div class="flex justify-between items-center">
    <Heading :title="title" :description="description" />
   
    <Button v-if="isEditing" variant="destructive" size="sm">
      <Icon name="lucide:trash" class="w-4 h-4"></Icon>
    </Button>
  </div>  

  <Separator class="my-4"></Separator>
  
  <form class="space-y-8 w-full">
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
</template>