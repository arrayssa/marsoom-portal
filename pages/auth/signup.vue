<template>
  <div class="sign-up-form">
    <h2>Sign Up</h2>
    <p>Let's create a new account</p>
    <form @submit.prevent="handleSignup" class="loading">
      <div class="form-row">
        <div class="w-full block">
          <label>First name</label>
          <input type="text" class="w-full" v-model="first_name" placeholder="First name" @input="(event) => onInputChange('first_name', event)" />
          <span v-if="errors.first_name" class="text-sm text-red-500">{{ errors.first_name }}</span>
        </div>
        <div class="w-full block">
          <label>Last Name</label>
          <input type="text" class="w-full" v-model="last_name" placeholder="Last name" @input="(event) => onInputChange('last_name', event)" />
          <span v-if="errors.last_name" class="text-sm text-red-500">{{ errors.last_name }}</span>
        </div>
        <div class="w-full block">
          <label>Family Name</label>
          <input type="text" class="w-full" v-model="family_name" placeholder="Family" @input="(event) => onInputChange('family_name', event)" />
          <span v-if="errors.family_name" class="text-sm text-red-500">{{ errors.family_name }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Phone Number</label>
          <vue-tel-input v-model="phoneNumber" mode="international" @input="onPhoneChange" @country-changed="onCountryChanged" class="w-full" style="height: 46px;"></vue-tel-input>
          <span v-if="errors.phoneNumber" class="text-sm text-red-500">{{ errors.phoneNumber }}</span>
        </div>
        <div class="w-full block">
          <label>Email</label>
          <input type="email" class="w-full" v-model="email" placeholder="Email" @input="(event) => onInputChange('email', event)" />
          <span v-if="errors.email" class="text-sm text-red-500">{{ errors.email }}</span>
        </div>
        <div class="w-full block">
          <label>Identity</label>
          <input type="text" class="w-full" v-model="confirm_identity" placeholder="Confirm identity" @input="(event) => onInputChange('confirm_identity', event)" />
          <span v-if="errors.confirm_identity" class="text-sm text-red-500">{{ errors.confirm_identity }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Identity Expiration</label>
          <input type="date" class="w-full" v-model="identity_expiration_date" placeholder="Identity expiration date" @input="(event) => onInputChange('identity_expiration_date', event)" />
          <span v-if="errors.identity_expiration_date" class="text-sm text-red-500">{{ errors.identity_expiration_date }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="column w-1/2">
          <label>Upload an image of the document</label>
          <DropFile field="doc_image" :fileData="doc_image" @file-changed="handleFileChange('doc_image', $event)" @file-removed="handleFileRemove" />
          <span v-if="errors.doc_image" class="text-sm text-red-500">{{ errors.doc_image }}</span>
        </div>
        <div class="column w-1/2">
          <label>Upload a personal photo</label>
          <DropFile field="personal_image" :fileData="personal_image" @file-changed="handleFileChange('personal_image', $event)" @file-removed="handleFileRemove" />
          <span v-if="errors.personal_image" class="text-sm text-red-500">{{ errors.personal_image }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>City</label>
          <select v-model="city_id" class="w-full" @change="(event) => onInputChange('city_id', event)">
            <option value="" selected disabled>Select a city</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
          <span v-if="errors.city_id" class="text-sm text-red-500">{{ errors.city_id }}</span>
        </div>
        <div class="w-full block">
          <label>District</label>
          <input type="text" class="w-full" v-model="district" placeholder="District" @input="(event) => onInputChange('district', event)" />
          <span v-if="errors.district" class="text-sm text-red-500">{{ errors.district }}</span>
        </div>
        <div class="w-full block">
          <label>Street</label>
          <input type="text" class="w-full" v-model="street" placeholder="Street" @input="(event) => onInputChange('street', event)" />
          <span v-if="errors.street" class="text-sm text-red-500">{{ errors.street }}</span>
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Password</label>
          <input type="password" class="w-full" v-model="password" placeholder="Password" @input="(event) => onInputChange('password', event)" />
          <span v-if="errors.password" class="text-sm text-red-500">{{ errors.password }}</span>
        </div>
        <div class="w-full block">
          <label>Password Confirmation</label>
          <input type="password" class="w-full" v-model="password_confirmation" placeholder="Confirm Password" @input="(event) => onInputChange('password_confirmation', event)" />
          <span v-if="errors.password_confirmation" class="text-sm text-red-500">{{ errors.password_confirmation }}</span>
        </div>
        <div class="w-full block">
          <label>Date of Birth</label>
          <input type="date" class="w-full" v-model="date_of_birth" placeholder="Birth date" @input="(event) => onInputChange('date_of_birth', event)" />
          <span v-if="errors.date_of_birth" class="text-sm text-red-500">{{ errors.date_of_birth }}</span>
        </div>
      </div>

      <ProgressSpinner v-if="loading" />
      <div class="w-full text-center">
        <button type="submit" class="bg-primary text-base px-3 w-1/3 p-3 mt-5 text-white rounded-md">Sign up</button>
      </div>
    </form>

    <p class="mt-4">Already have an account? <router-link class="font-bold text-primary underline" :to="`/` + $i18n.locale + `/auth/login`">Sign in!</router-link></p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'; 
import { useRuntimeConfig } from '#imports';
import { VueTelInput } from 'vue-tel-input';
import { useSignupStore } from '../../store/auth';
import DropFile from '../../components/DropFile.vue';

definePageMeta({
  layout: 'login'
});

const { t } = useI18n();
const signupStore = useSignupStore();
const router = useRouter();
const config = useRuntimeConfig();
const toast = useToast();

const first_name = ref('');
const last_name = ref('');
const family_name = ref('');
const phoneNumber = ref(null);
const email = ref('');
const confirm_identity = ref('');
const identity_expiration_date = ref('');
const city_id = ref('');
const district = ref('');
const street = ref('');
const password = ref('');
const password_confirmation = ref('');
const date_of_birth = ref('');
const loading = ref(false);
const doc_image = ref(null);
const personal_image = ref(null);
const cities = ref([]);

// Error messages
const errors = ref({
  first_name: '',
  last_name: '',
  family_name: '',
  phoneNumber: '',
  email: '',
  confirm_identity: '',
  identity_expiration_date: '',
  city_id: '',
  district: '',
  street: '',
  password: '',
  password_confirmation: '',
  date_of_birth: '',
  doc_image: '',
  personal_image: ''
});

onMounted(async () => {
  try {
    const response = await fetch(`${config.public.apiBaseUrl}cities`);
    const data = await response.json();
    cities.value = data.data.cities;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
});

const onPhoneChange = (number) => {
  phoneNumber.value = number.target.value
  signupStore['phone'] = phoneNumber.value
  errors.value.phoneNumber = ''; // Clear error on change
};


const onCountryChanged = (country) => {
  console.log('Selected country:', country);
};

const onInputChange = (field, event) => {
  errors.value[field] = ''; // Clear error on input
  const value = event.target.value;
  signupStore[field] = value;
};


const handleFileChange = (field, file) => {
  signupStore[field] = file;
  if (field === 'doc_image') {
    doc_image.value = file;
  } else if (field === 'personal_image') {
    personal_image.value = file;
  }
  errors.value[field] = ''; // Clear error on file change
};

const handleFileRemove = (field) => {
  signupStore[field] = null;
  if (field === 'doc_image') {
    doc_image.value = null;
  } else if (field === 'personal_image') {
    personal_image.value = null;
  }
  errors.value[field] = ''; // Clear error on file remove
};

const validateFields = () => {
  // Reset errors
  Object.keys(errors.value).forEach((key) => {
    errors.value[key] = '';
  });

  let isValid = true;

  if (!first_name.value) {
    errors.value.first_name = 'First name is required';
    isValid = false;
  }
  if (!last_name.value) {
    errors.value.last_name = 'Last name is required';
    isValid = false;
  }
  if (!family_name.value) {
    errors.value.family_name = 'Family name is required';
    isValid = false;
  }
  if (!phoneNumber.value) {
    errors.value.phoneNumber = 'Phone number is required';
    isValid = false;
  }
  if (!email.value) {
    errors.value.email = 'Email is required';
    isValid = false;
  }
  if (!confirm_identity.value) {
    errors.value.confirm_identity = 'Identity confirmation is required';
    isValid = false;
  }
  if (!identity_expiration_date.value) {
    errors.value.identity_expiration_date = 'Identity expiration date is required';
    isValid = false;
  }
  if (!city_id.value) {
    errors.value.city_id = 'City is required';
    isValid = false;
  }
  if (!district.value) {
    errors.value.district = 'District is required';
    isValid = false;
  }
  if (!street.value) {
    errors.value.street = 'Street is required';
    isValid = false;
  }
  if (!password.value) {
    errors.value.password = 'Password is required';
    isValid = false;
  }
  if (password.value !== password_confirmation.value) {
    errors.value.password_confirmation = 'Passwords do not match';
    isValid = false;
  }
  if (!date_of_birth.value) {
    errors.value.date_of_birth = 'Date of birth is required';
    isValid = false;
  }
  if (!doc_image.value) {
    errors.value.doc_image = 'Document image is required';
    isValid = false;
  }
  if (!personal_image.value) {
    errors.value.personal_image = 'Personal image is required';
    isValid = false;
  }

  return isValid;
};

const handleSignup = async () => {
  if (validateFields()) {
    loading.value = true;
    const userData = {
      first_name: first_name.value,
      last_name: last_name.value,
      family_name: family_name.value,
      phone_number: phoneNumber.value,
      email: email.value,
      confirm_identity: confirm_identity.value,
      identity_expiration_date: identity_expiration_date.value,
      city_id: city_id.value,
      district: district.value,
      street: street.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      date_of_birth: date_of_birth.value,
      doc_image: doc_image.value,
      personal_image: personal_image.value
    };
    const result = await signupStore.signup(userData);
    
    if (result.success === false) {
      // Handle validation errors returned from the API
      Object.keys(result.errors).forEach((key) => {
        errors.value[key] = result.errors[key][0]; // Get the first error message
      });
      toast.add({ severity: 'error', summary: t('common.Error'), detail: t('common.Error'), life: 3000 });
    } else {
      // Handle successful signup, e.g., redirect
      console.log('Signup successful:', result);
      toast.add({ severity: 'success', summary: t('common.Successful'), detail: t('common.Successfully'), life: 3000 });
      router.push('/');
    }

    loading.value = false;
  }
};
</script>

<style scoped>
/* Your styles here */
</style>


<style scoped>
/* Add any necessary styles here */
</style>


<style scoped>
.sign-up-form {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

p {
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-row {
  display: flex;
  flex: 1 1 100%;
  gap: 20px;
}

input,
select {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #004e5c;
  color: #fff;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #003946;
}
</style>