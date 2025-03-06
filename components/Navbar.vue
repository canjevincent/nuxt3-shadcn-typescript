<script setup lang="ts">
  const { user, clear } = useUserSession();
  const logout = async() => {
    await clear();
    navigateTo('/auth/login');
  }
</script>

<template>
  <header class="z-10 border-b">

    <div class="flex justify-between items-center px-4 h-16">
      <NuxtLink to="/">
        <img src="/logo.svg" alt="logo" class="cursor-point h-[30px]">
      </NuxtLink>
      <nav class="flex items-center space-x-4 lg:space-x-6">
        <template v-if="user">
          
          <DropdownMenu v-if="user.role === 'ADMIN'">
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" class="relative">
                Admin <Icon name="lucide:chevron-down" class="ml-2 w-4 h-4"></Icon>
              </Button>
            </DropdownMenuTrigger>
            
            <DropdownMenuContent class="w-56" align="end">

              <NuxtLink to="/admin">
                <DropdownMenuItem>
                  Analytics
                </DropdownMenuItem>
              </NuxtLink>

              <NuxtLink to="/admin/categories">
                <DropdownMenuItem>
                  Categories
                </DropdownMenuItem>
              </NuxtLink>

              <NuxtLink to="/admin/colors">
                <DropdownMenuItem>
                  Colors
                </DropdownMenuItem>
              </NuxtLink>

              <NuxtLink to="/admin/sizes">
                <DropdownMenuItem>
                  Sizes
                </DropdownMenuItem>
              </NuxtLink>

              <NuxtLink to="/admin/products">
                <DropdownMenuItem>
                  Products
                </DropdownMenuItem>
              </NuxtLink>

            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" class="relative w-8 h-8 rounded-full">
                <Avatar>
                  <Icon name="radix-icons:avatar" class="w-4 h-4"></Icon>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent class="w-56" align="end">
              
              <DropdownMenuLabel class="flex font-normal">
                <div class="flex flex-col space-y-1">
                  <p class="text-sm font-medium leading-none">
                    {{ user.name }}
                  </p>
                </div>
              </DropdownMenuLabel>
              
              <DropdownMenuSeparator />

              <DropdownMenuItem @click="logout">
                <Icon name="solar:logout-2-broken" class="mr-2 w-4 h-4"></Icon>
                <span>Logout</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>

        </template>
        
        <NuxtLink to="/cart">
          <Button class="relative px-5 py-1 h-8 rounded-full">
            <Icon name="lucide:shopping-bag" class="mr-2 w-4 h-4"></Icon>
          </Button>
        </NuxtLink>
      </nav>
    </div>
    
  </header>
</template>