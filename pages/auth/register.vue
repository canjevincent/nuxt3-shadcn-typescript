<script setup lang="ts">
  type PAYLOAD = {
    password: string;
    name: string;
    email: string;
  }

  const form = ref<PAYLOAD>({
    name: '',
    email:'',
    password:'',
  })

  const onSubmit = async () => {
    try {
      await $fetch('/api/auth/register', {
        method: 'POST',
        body: form.value
      });

      navigateTo('/');

    } catch (error) {
      console.log(error);
    }
  }

</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-md">
      <form @submit.prevent="onSubmit" action="">
        
        <Card class="">

          <CardHeader>

            <CardTitle class="text-2xl">
              Login
            </CardTitle>

            <CardDescription>
              Enter your information below to create your account.
            </CardDescription>

          </CardHeader>

          <CardContent class="grid gap-4">
            
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input id="name" placeholder="m@example.com" v-model="form.name" />
            </div>
            
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" v-model="form.email" required />
            </div>
            
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" v-model="form.password" required />
            </div>
            
            <div class="grid grid-cols-1">
              <AuthSocialButton icon="radix-icons:github-logo" label="Github" />
            </div>

          </CardContent>
          
          <CardFooter class="flex flex-col space-y-2">

            <Button class="w-full" type="submit">
              Register
            </Button>

            <p>
              Already have an account?
              <NuxtLink 
                to="/auth/login" 
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Login
              </NuxtLink>
            </p>

          </CardFooter>

        </Card>

      </form>
    </div>
  </div>
</template>