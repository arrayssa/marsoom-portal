<template>
  <div class="card-container">
    <div class="card-grid">
      <div class="card-image">
        <img src="/layout/images/bg.png" alt="New password Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 4px" />
      </div>
      <div class="flex align-items-start justify-content-center">
        <div class="card-form">
          <div class="text-center mb-5">
            <div class="text-3xl font-bold mb-3">New password</div>
            <span class="text-600"
              >Make the password consist of at least 8 <br />
              letters and numbers</span
            >
          </div>
          <div>
            <Password id="password1" v-model="pass1" placeholder="New password" :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <Password id="password2" v-model="pass2" placeholder="Confirm new password " :toggleMask="true" class="w-full mb-3" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
            <Button label="Reset password" class="w-full p-3 text-xl mt-5" @click="submit"></Button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal :closable="false" :header="false" :style="{ width: '35vw' }" :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">
    <div class="flex flex-column align-items-center justify-content-center text-center p-5 gap-3">
      <img src="/layout/images/success.png" />
      <p class="text-xl">
        Congratulations, your password has been <br />
        successfully reset. Click Continue to be <br />
        redirected
      </p>
      <Button label="Continue" class="w-full p-3 text-xl w-5" @click="closeDialog"></Button>
    </div>
  </Dialog>
</template>

<script setup>
definePageMeta({
  layout: false
});

import { useRouter } from 'vue-router';

const pass1 = ref('');
const pass2 = ref('');

const router = useRouter();

const visible = ref(false);

const submit = () => {
  visible.value = true;
};

const closeDialog = () => {
  visible.value = false;
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
