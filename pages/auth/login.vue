<script setup lang="ts">
  type PAYLOAD = {
    password: string;
    email: string;
  }

  const form = ref<PAYLOAD>({
    email:'',
    password:'',
  })

  const onSubmit = async () => {
    try { 
      await $fetch('/api/auth/login', {
        method: 'POST',
        body: form.value
      });

      navigateTo('/')
    } catch (error) {
      console.log(error)
    }
  }
</script>

<template>
  <div class="flex flex-col justify-center items-center min-h-screen">
    <div class="w-full max-w-md">
      <form @submit="onSubmit" action="">
        
        <Card class="">

          <CardHeader>

            <CardTitle class="text-2xl">
              Login
            </CardTitle>

            <CardDescription>
              Enter your information below to login your account.
            </CardDescription>

          </CardHeader>

          <CardContent class="grid gap-4">
            
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
              Don't have an account?
              <NuxtLink 
                to="/auth/register" 
                class="border-b border-gray-500 text-muted-foreground hover:text-primary"
              >
                Register
              </NuxtLink>
            </p>

          </CardFooter>

        </Card>

      </form>
    </div>
  </div>
</template>