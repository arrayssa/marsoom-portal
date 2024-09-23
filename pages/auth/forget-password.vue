<template>
  <div class="card-container">
    <div class="card-grid">
      <div class="card-image">
        <img src="/layout/images/bg.png" alt="Forget Password Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 4px" />
      </div>
      <div class="flex align-items-start justify-content-center">
        <div class="card-form">
          <div class="text-center mb-5">
            <div class="text-3xl font-bold mb-3">Forget Password</div>
            <span v-if="false" class="text-600">Welcome back to Al Raya</span>
          </div>
          <div>
            <InputText id="email1" v-model="email" type="email" placeholder="Enter Email" class="w-full mb-3" style="padding: 1rem" />
            <Button label="Reset password" class="w-full p-3 text-xl mt-5" @click="sendResetLink"></Button>
            <nuxt-link to="/en/auth/signup"  class="text-black-alpha-90 flex align-items-center justify-content-center gap-2 mt-5">
              <i class="pi pi-arrow-left text-lg"></i>
              <span class="text-xl font-medium cursor-pointer">Back to sign up</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
});

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';

const email = ref('');
const router = useRouter();

const sendResetLink = () => {
  // Implement send reset link logic here
  router.push('/auth/verify-code');
};
</script>

<style scoped>
.card-container {
  background: #ffffff;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 100%;
  max-width: 1200px;
}

.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: 4px;
}

.card-form {
  width: 100%;
  max-width: 500px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .card-grid {
    grid-template-columns: 1fr;
  }

  .card-container {
    padding: 1rem;
  }

  .card-image {
    display: none;
  }
}
</style>
