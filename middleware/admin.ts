export default defineNuxtRouteMiddleware(async () => {
  const { user } = useUserSession();

  if (!user.value) return navigateTo('/auth/login');

  if (user.value && user.value.role !== 'ADMIN') return navigateTo('/auth/login');
});