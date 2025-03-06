<template>
  <Card>
    <CardContent class="p-0">
      <div class="grid gap-4 p-4 pt-4 w-full">
        <div class="min-h-[170px] overflow-hidden relative rounded-md">
          <Skeleton class="min-h-[170px] transition-all hover:scale-105 bg-foreground-muted" />

          <div class="flex absolute top-2 right-2 flex-col space-y-2">
            <Skeleton class="rounded-full size-8" />
            <Skeleton class="rounded-full size-8" />
          </div>
        </div>

        <Skeleton class="h-4 w-[90%] bg-foreground/20" />
        <Skeleton class="h-4 w-[80%] bg-foreground/20" />
      </div>
    </CardContent>

    <CardFooter class="justify-between p-4 pt-4 w-full border-t">
      <Skeleton class="h-4 w-[200px] bg-foreground/20" />
    </CardFooter>
  </Card> 
</template>