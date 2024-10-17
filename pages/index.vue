<template>
 <div class="grid">
   <div class="col-12 lg:col-6 xl:col-3">
     <div class="card mb-0">
       <div class="flex justify-content-between mb-3">
         <div>
           <span class="block text-500 font-medium mb-3">{{ $t('welcome') }}</span>
           <div class="text-900 font-medium text-xl">152</div>
         </div>
         <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width: 2.5rem; height: 2.5rem">
           <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
         </div>
       </div>
       <span class="text-green-500 font-medium">24 new </span>
       <span class="text-500">since last visit</span>
     </div>
   </div>
   <div class="col-12 lg:col-6 xl:col-3">
     <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
         <div>
           <span class="block text-500 font-medium mb-3">Revenue</span>
           <div class="text-900 font-medium text-xl">$2.100</div>
         </div>
         <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
           <i class="pi pi-map-marker text-orange-500 text-xl"></i>
         </div>
       </div>
       <span class="text-green-500 font-medium">%52+ </span>
       <span class="text-500">since last week</span>
     </div>
   </div>
 </div>
</template>

<!--<script setup></script>-->
<!-- <template>
  <div class="card-container">
    <div class="card-grid">
      <div class="card-image">
        <img src="/layout/images/bg.png" alt="Sign In Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 4px" />
      </div>
      <div class="flex align-items-start justify-content-center">
        <div class="card-form">
          <div class="text-center mb-5">
            <div class="text-3xl font-bold mb-3">Sign in</div>
            <span class="text-600">Welcome back to Al Raya</span>
          </div>
        </div>
        <span class="text-green-500 font-medium">24 new </span>
        <span class="text-500">since last visit</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Revenue</span>
            <div class="text-900 font-medium text-xl">$2.100</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round" style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">%52+ </span>
        <span class="text-500">since last week</span>
      </div>
    </div>

    <div>
    <button @click="goToProfile">Go to Profile</button>
  </div>
  </div>
</template> -->

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  path: '/',
  alias: '/dashboard',
});

const authStore = useAuthStore();
const user = ref({
  email: '',
  password: ''
});
const checked = ref(false);
const router = useRouter();

const login = async () => {
  try {
    await authStore.authenticateUser(user.value);
    if (authStore.authenticated) {
      router.push('/en/auth/profile');
    }
  }
  catch(error) {
    // Redirect programmatically
    // this.$router.push('/en/auth/profile');
  }
}
</script>
