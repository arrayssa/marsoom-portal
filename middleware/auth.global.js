import { useAuthStore } from '../store/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore());
  const token = useCookie('token');
  const localePath = useLocalePath();

  if (token.value) {
    // check if value exists
    authenticated.value = true;
  }

  // Array of route names to check
  const authRoutes = ['/auth/login', '/auth/signup'];

  // Check if the route name starts with any of the auth routes
  if (token.value && authRoutes.some((route) => to.path.startsWith(route))) {
     return navigateTo('/');
   }

  // If not authenticated and trying to access any page other than auth routes, redirect to login page
  if (!token.value && !authRoutes.some((route) => to.path.startsWith(route))) {
     abortNavigation();
     return navigateTo('/auth/login');
 }
});
