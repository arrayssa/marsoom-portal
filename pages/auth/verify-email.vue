<template>
  <div class="card-container">
    <div class="card-grid">
      <div class="card-image">
        <img src="/layout/images/bg.png" alt="Enter verification code Image" style="width: 100%; height: auto; object-fit: cover; border-radius: 4px" />
      </div>
      <div class="flex align-items-start justify-content-center">
        <div class="card-form">
          <div class="text-center mb-5">
            <div class="text-3xl font-bold mb-3">Verify Email</div>
            <span class="text-600">
              Enter the OTP code that we sent to your <br />
              email Abd****@example
            </span>
          </div>
          <div class="flex align-items-center justify-content-center gap-2 mb-4">
            <input v-for="(digit, index) in digits" :key="index" :id="'digit' + index" type="text" maxlength="1" class="card-input" v-model="digits[index]" @input="onInput(index)" />
          </div>
          <Button label="Verify Email" class="w-full p-3 text-xl mt-5" @click="verifyEmail"></Button>

          <div class="mt-6 text-center">
            <span class="text-lg">Didn't receive the OTP? </span>
            <nuxt-link class="text-lg font-bold underline cursor-pointer" style="color: var(--primary-color)">Click to resend</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal :closable="false" :header="false" :style="{ width: '35vw' }" :breakpoints="{ '1199px': '50vw', '575px': '90vw' }">
    <div class="flex flex-column align-items-center justify-content-center text-center p-5 gap-3">
      <img src="/layout/images/success.png" />
      <p class="text-xl">
        Congratulations, your account has been <br />
        created successfully!
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
const router = useRouter();

const digits = ref(Array(5).fill(''));

const onInput = (index) => {
  if (digits.value[index] && index < digits.value.length - 1) {
    nextTick(() => {
      document.getElementById(`digit${index + 1}`).focus();
    });
  }

  // If the current input is the last one and it has a value, call the resetPassword function
  if (index === digits.value.length - 1 && digits.value[index]) {
    resetPassword();
  }
};

const resendCode = () => {
  console.log('Resend code clicked');
  // Add logic to resend the verification code
};

const visible = ref(false);

const verifyEmail = () => {
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

.card-input {
  border: 1px solid #dbdbdb;
  padding: 20px;
  border-radius: 6px;
  width: 74px;
  height: 54px;
  text-align: center;
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

input:focus-visible {
  outline: 0;
  background: #f1fcff;
  box-shadow: 0px 0px 14px 0px #156d8929;
  border: 1px solid #156d89;
}
</style>
