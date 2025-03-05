<script setup lang="ts">
  import { Checkbox } from '@/components/ui/checkbox'
  import type { RouteParams } from '~/types';
  import type { Category, Color, Image, Size } from '@prisma/client';
  import { toTypedSchema } from '@vee-validate/zod';  
  import { useForm } from 'vee-validate';

  const { isLoading, showMessage, showError, toggleLoading } = useStore();

  const isAlertModalVisible = ref(false);
  const title = ref('Edit Product');
  const description = ref('Edit Product.');
  const toastMessage = ref('Product Updated');
  const action = ref('Save Changes');
  const isEditing = ref(true);

  const { data: categories } = await useFetch<Category[]>('/api/admin/categories');
  const { data: colors } = await useFetch<Color[]>('/api/admin/colors');
  const { data: sizes } = await useFetch<Size[]>('/api/admin/sizes');


  // Mutation directed to folder : Server / Api / Admin / Products / [productId]
  const route = useRoute(); // -> get value from the parameter [productId] by using ${(route.params as RouteParams).productId}
  const { data: currentProduct } = await useFetch(`/api/admin/products/${(route.params as RouteParams).productId}`); // -> index.get.ts

  watchEffect(() => {
    if (!currentProduct.value) {
      title.value = 'Create Product';
      description.value = 'Add a new Product.';
      toastMessage.value = 'Product Added';
      action.value = 'Create Product';
      isEditing.value = false;
    }
  });

  const formSchema = toTypedSchema(productSchema);

  const form = useForm({
    validationSchema: formSchema,
    initialValues: currentProduct.value || {
      name: '',
      images: [],
      price: 0,
      categoryId: '',
      sizeId:'',
      colorId:'',
      isFeatured: false,
      isArchived: false
    }
  });

  const onSubmit = form.handleSubmit(async(values) => {
    try {
      toggleLoading(true);

      if (isEditing.value) {
        console.log('Edit Product', values);

        await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
          method: 'PATCH',
          body: values
        });
        
      } else {
        console.log('Add Product', values);
        
        // Mutation directed to folder : Server / Api / Admin / Products 
        const data = await $fetch('/api/admin/products/', {
          method: 'POST', // -> index.post.ts
          body: values
        });
        
      }

      showMessage({
        title: toastMessage.value
      });

      await navigateTo('/admin/products');

    } catch (error) {
      
      const err = handleError(error);
      showError(err);

    } finally { 

      toggleLoading(false);

    }
  })

  const deleteProduct = async() => {
    try {
      toggleLoading(true);

      const data = await $fetch(`/api/admin/products/${(route.params as RouteParams).productId}`, {
        method: 'DELETE',
      });

      showMessage({
        title: 'Delete Product'
      });

      await navigateTo('/admin/products');

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

      <FormField v-slot="{ componentField, resetField }" name="images">
        <FormItem>
          <Formlabel>Product Images</Formlabel>
          
          <FormControl>
            <!-- <Input placeholder="Product Name" v-bind="componentField" :disabled="isLoading" /> -->
            <!-- get the new url value (url) then add to the current [{ url: "image1.jpg" }, { url: "image2.jpg" }] array of url using { value:[...componentField.modelValue, { url }] } -->
            <ImageUpload
              @on-change="(url) => resetField({ 
                value:[...componentField.modelValue, { url }] 
              })"
              @on-remove="(url) => resetField({ 
                value:[...componentField.modelValue.filter((currentImage: Image) => currentImage.url !== url)] 
              })"
              :value="componentField.modelValue.map((image: Image) => image.url)">
             </ImageUpload>
          </FormControl>
          
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>

      <div class="gap-8 md:grid md:grid-cols-3">
        
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <Formlabel>Name</Formlabel>
            
            <FormControl>
              <Input placeholder="Product Name" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <Formlabel>Price</Formlabel>
            
            <FormControl>
              <Input type="number" placeholder="Product Price" v-bind="componentField" :disabled="isLoading" />
            </FormControl>
            
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <Formlabel>Category</Formlabel>

            <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                      {{ category.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="sizeId">
          <FormItem>
            <Formlabel>Size</Formlabel>

            <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="size in sizes" :key="size.id" :value="size.id">
                      {{ size.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="colorId">
          <FormItem>
            <Formlabel>Color</Formlabel>

            <Select v-bind="componentField">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="color in colors" :key="color.id" :value="color.id">
                      {{ color.name }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
            </Select>

            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="isArchived">
          <FormItem class="flex flex-row gap-x-3 items-start p-4 space-y-0 rounded-md border shadow">
            <FormControl>
              <Checkbox :model-value="value" @update:modelValue="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Archived</FormLabel>
              <FormDescription>
                This product will not appear anywhere in the shop
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>

        <FormField v-slot="{ value, handleChange }" name="isFeatured">
          <FormItem class="flex flex-row gap-x-3 items-start p-4 space-y-0 rounded-md border shadow">
            <FormControl>
              <Checkbox :model-value="value" @update:modelValue="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Featured</FormLabel>
              <FormDescription>
                This product will appear in the features product section
              </FormDescription>
              <FormMessage />
            </div>
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
    @on-confirm="deleteProduct" 
    :is-open="isAlertModalVisible" 
    @on-close="isAlertModalVisible = !isAlertModalVisible">
  </AlertModal>
</template>