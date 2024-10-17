<template>
  <div class="card-container">
    <div class="card-grid">
      <div class="card-image">
        <img src="/layout/images/bg.png" alt="Sign In Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 4px" />
      </div>
      <div class="flex align-items-start justify-content-center">
        <div class="card-form">
          <div class="text-center mb-5">
            <div class="text-3xl font-bold mb-3">Sign in</div>
            <div v-if="errorMessage" class="text-red-500 mt-3">{{ errorMessage }}</div>

          </div>
          <div>
            <InputText id="email1" v-model="user.email" type="email" placeholder="Enter Email" class="w-full mb-5" style="padding: 1rem" />
            <Password id="password1" v-model="user.password" placeholder="Password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }" :feedback="false"></Password>
            <Button label="Sign In" class="w-full p-3 text-xl mt-5" @click="login"></Button>
            <div class="flex align-items-center justify-content-between mt-4 gap-5">
              <div class="flex align-items-center">
                <Checkbox id="rememberme1" v-model="checked" binary class="mr-2"></Checkbox>
                <label for="rememberme1">Remember me</label>
              </div>
              <NuxtLink :to="`/${$i18n.locale}/auth/signup`">
                <Button :label="$t('Don\'t Have An Account!')" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"/>
              </NuxtLink>
              <!-- <router-link :to="`/` + $i18n.locale + `/auth/signup`" class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)"> Don't Have An Account! </router-link> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'login'
});

const authStore = useAuthStore();
const user = ref({
  email: '',
  password: ''
});
const checked = ref(false);
const errorMessage = ref('');
const router = useRouter();
const { locale } = useI18n();

const login = async () => {
  try {
    errorMessage.value = ''; // Reset error message
    await authStore.authenticateUser(user.value);
    if (authStore.authenticated) {
      router.push(`/${locale.value}/auth/profile`);
    }
  } catch (error) {
    console.error('Authentication failed:', error);
    errorMessage.value = authStore.error || 'Login failed. Please try again.'; // Display a user-friendly error message
  }
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