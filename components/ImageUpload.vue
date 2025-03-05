<script lang="ts" setup>

  interface Result {
    info: {
      secure_url: string
    }
  }

  interface UploadImageProps {
    value: string[]
    allowedFormats?: string[]
  }
  
  defineProps<UploadImageProps>();

  const { public: { uploadPreset } } = useRuntimeConfig(); // allows access to nuxt.config.ts

  const { isLoading, toggleLoading, showError, showMessage } = useStore();
  // triggered by emit handler @on-change & @on-remove
  const emits = defineEmits(['onChange', 'onRemove']);

  // receiving a non reactive value so using Ref<Result> is invalid 
  const onUpload = (result: Result) => {
    emits('onChange', result.info.secure_url);
  }

  const deleteImage = async (url: string) => {
    
    try {

      toggleLoading(true);
      const resourceName = getResourceName(url);
      await $fetch(`/api/admin/cloudinary/${resourceName}`, {
        method: 'DELETE'
      })

      console.log("fuckk", url)

      showMessage({
        title: 'Image Deleted'
      })

      emits('onRemove', url)

    } catch (err: any) {
      
      const error = handleError(err);
      showError(error);

    } finally {

      toggleLoading(false);

    }

  }

</script>

<template>
  <div class="flex gap-4 items-center mb-4">
    <div v-for="(url, i) in value" :key="i" class="relative w-[200px] h-[200px] rounded-md overflow-hidden">
      <div class="absolute top-2 right-2 z-10">
        <Button :disabled="isLoading" type="button" @click="deleteImage(url)" variant="destructive" size="sm"> 
          <Icon name="lucide:trash" class="w-4 h-4" />
        </Button>
      </div>
      <img :src="url" class="object-cover w-full h-full" alt="image" />
    </div>
  </div>
  
  <CldUploadWidget v-slot="{ open }" :uploadPreset="uploadPreset" :on-upload="onUpload" :options="{ // using :on-upload, widget means contains an emit 
      clientAllowedFormats: allowedFormats,
      multiple: false,
      maxFiles: 3
    }">
      <Button type="button" :disabled="isLoading" variant="secondary" @click="open">
        <Icon name="lucide:image-plus" class="mr-2 w-4 h-4"></Icon>
        Upload an Image
      </Button>
  </CldUploadWidget>
</template>





