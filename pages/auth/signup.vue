<template>
  <div class="sign-up-form">
    <h2>Sign Up</h2>
    <p>Let's create a new account</p>
    <form @submit.prevent="handleSignup" class="loading">
      <div class="form-row">
        <div class="w-full block">
          <label>First name</label>
          <input type="text" v-model="first_name" placeholder="First name" @input="(event) => onInputChange('first_name', event)" />
        </div>
        <div class="w-full block">
          <label>Last Name</label>
          <input type="text" v-model="last_name" placeholder="Last name" @input="(event) => onInputChange('last_name', event)" />
        </div>
        <div class="w-full block">
          <label>Family Name</label>
          <input type="text" v-model="family_name" placeholder="Family" @input="(event) => onInputChange('family_name', event)" />
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Phone Number</label>
          <vue-tel-input v-model="phoneNumber" mode="international" @input="onPhoneChange" @country-changed="onCountryChanged" class="w-full" style="height: 46px;"></vue-tel-input>
        </div>
        <div class="w-full block">
          <label>Email</label>
          <input type="email" class="w-full" v-model="email" placeholder="Email" @input="(event) => onInputChange('email', event)" />
        </div>
        <div class="w-full block">
          <label>Identity</label>
          <input type="text" class="w-full" v-model="confirm_identity" placeholder="Confirm identity" @input="(event) => onInputChange('confirm_identity', event)" />
        </div>
      </div>
      
      <div class="form-row">
        <div class="w-full block">
          <label>Identity Expiration</label>
          <input type="date" class="w-full" v-model="identity_expiration_date" placeholder="Identity expiration date" @input="(event) => onInputChange('identity_expiration_date', event)" />
        </div>
      </div>

      <div class="form-row">
        <div class="column w-1/2">
          <label>Upload an image of the document</label>
          <DropFile field="doc_image" :fileData="doc_image" @file-changed="onFileChange('doc_image', $event)" @file-removed="handleFileRemove"/>
        </div>
        <div class="column w-1/2">
          <label>Upload a personal photo</label>
          <DropFile field="personal_image" :fileData="personal_image" @file-changed="onFileChange('personal_image', $event)" @file-removed="handleFileRemove"/>
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Country</label>
          <select v-model="city_id" class="w-full" @change="(event) => onInputChange('city_id', event)">
            <option value="" selected disabled>Select a city</option>
            <option v-for="city in cities" :key="city.id" :value="city.id">
              {{ city.name }}
            </option>
          </select>
        </div>
        <div class="w-full block">
          <label>City</label>
          <input type="text" class="w-full" v-model="district" placeholder="District" @input="(event) => onInputChange('district', event)" />
        </div>
        <div class="w-full block">
          <label>Street</label>
          <input type="text" class="w-full" v-model="street" placeholder="Street" @input="(event) => onInputChange('street', event)" />
        </div>
      </div>

      <div class="form-row">
        <div class="w-full block">
          <label>Password</label>
          <input type="password" class="w-full" v-model="password" placeholder="Password" @input="(event) => onInputChange('password', event)" />
        </div>
        <div class="w-full block">
          <label>Password Confirmation</label>
          <input type="password" class="w-full" v-model="password_confirmation" placeholder="Confirm Password" @input="(event) => onInputChange('password_confirmation', event)" />
        </div>
        <div class="w-full block">
          <label>Date of Birth</label>
          <input type="date" class="w-full" v-model="date_of_birth" placeholder="Birth date" @input="(event) => onInputChange('date_of_birth', event)" />
        </div>
      </div>

      <ProgressSpinner v-if="loading" />
      <div class="w-full text-center">
        <button type="submit" class="bg-primary text-base px-3 w-1/3  p-3 mt-5 text-white rounded-md">Sign up</button>
      </div>
    </form>

    <p class="mt-4">Already have an account?  <router-link class="font-bold text-primary underline" :to="`/` + $i18n.locale + `/auth/login`">Sign in!</router-link></p>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input'
import { useSignupStore } from '../../store/auth';
import { useRouter } from 'vue-router'; // Import useRouter
import { useRuntimeConfig } from '#imports';
import DropFile from '../../components/DropFile.vue';

export default {
  components: {
    VueTelInput,
  },
  setup() {
    definePageMeta({
      layout: 'login'
    });
    const signupStore = useSignupStore();
    const cities = ref([]);
    const router = useRouter();
    const { locale } = useI18n();
    let phoneNumber = ref(null);
    let countryCode = ref(null);
    let doc_image = ref(null);
    let personal_image = ref(null);
    let loading = ref(false);

    // Fetch cities from API when the component is mounted
    onMounted(async () => {
      try {
        const response = await fetch(useRuntimeConfig().public.apiBaseUrl+'cities'); // Replace with your API URL
        const data = await response.json();
        cities.value = data.data.cities; // Assuming your API response has a "cities" array
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    });

    const onPhoneChange = (number) => {
      phoneNumber.value = number.target.value
      signupStore['phone'] = phoneNumber.value
    }
    
    const onCountryChanged = (country) => {
      countryCode.value = country.dialCode;
    }

    const onFileChange = (field, file) => {
      // const file = event.target.files[0];
      signupStore[field] = file;
      if (field == 'doc_image') {
        doc_image.value = file
      } else if (field == 'personal_image') {
        personal_image.value = file
      }
    };
    const handleFileRemove = (field) => {
      signupStore[field] = null;
      if (field == 'doc_image') {
        doc_image.value = null
      } else if (field == 'personal_image') {
        personal_image.value = null
      }
    }

    const handleSignup = async () => {
      loading.value = true;
      console.log(loading.value);
      
      try {
        const data= await signupStore.signup();
        //console.log(data.user);

        // localStorage.setItem('authToken',  data.token);
        // router.push(`/${locale.value}/auth/profile`);

        // Redirect to login and refresh the page completely
        window.location.replace(`/${locale.value}/auth/login`);

        console.log('Signup successful');
      } catch (error) {
        console.error('Signup failed:', error.message);
      } finally {
        loading.value = false;
      }
    };

    const onInputChange = (field, event) => {
      const value = event.target.value;
      console.log(`Input change for ${field}:`, value);
      // console.log(`Input change for ${field}:`, phoneNumber.value);
      signupStore[field] = value;
      // console.log('Updated store values:', signupStore.$state);
    };

    return {
      ...signupStore,
      cities,
      handleSignup,
      onFileChange,
      onInputChange,
      onPhoneChange,
      onCountryChanged,
      phoneNumber,
      handleFileRemove,
      personal_image,
      doc_image,
      loading
    };
  }
};
</script>

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