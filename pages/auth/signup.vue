<template>
  <div class="sign-up-form">
    <h2>Sign Up</h2>
    <p>Let's create a new account</p>

    <form @submit.prevent="handleSignup">
      <div class="form-row">
        <input type="text" v-model="first_name" placeholder="First name" @input="(event) => onInputChange('first_name', event)" />
        <input type="text" v-model="last_name" placeholder="Last name" @input="(event) => onInputChange('last_name', event)" />
        <input type="text" v-model="family_name" placeholder="Family" @input="(event) => onInputChange('family_name', event)" />
      </div>

      <div class="form-row">
        <input type="tel" v-model="phone" placeholder="+966 Phone" @input="(event) => onInputChange('phone', event)" />
        <input type="email" v-model="email" placeholder="Email" @input="(event) => onInputChange('email', event)" />
        <input type="text" v-model="confirm_identity" placeholder="Confirm identity" @input="(event) => onInputChange('confirm_identity', event)" />
      </div>

      <div class="form-row">
        <input type="date" v-model="identity_expiration_date" placeholder="Identity expiration date" @input="(event) => onInputChange('identity_expiration_date', event)" />
      </div>

      <div class="form-row">
        <label>
          Upload an image of the document
          <input type="file" @change="onFileChange('doc_image', $event)" />
        </label>

        <label>
          Upload a personal photo
          <input type="file" @change="onFileChange('personal_image', $event)" />
        </label>
      </div>

      <div class="form-row">
        <select v-model="city_id">
          <option value="" disabled>Select a city</option>
          <option v-for="city in cities" :key="city.id" :value="city.id">
            {{ city.name }}
          </option>
        </select>
        <input type="text" v-model="district" placeholder="District" @input="(event) => onInputChange('district', event)" />
        <input type="text" v-model="street" placeholder="Street" @input="(event) => onInputChange('street', event)" />
      </div>

      <div class="form-row">
        <input type="password" v-model="password" placeholder="Password" @input="(event) => onInputChange('password', event)" />
        <input type="password" v-model="password_confirmation" placeholder="Confirm Password" @input="(event) => onInputChange('password_confirmation', event)" />
        <input type="date" v-model="date_of_birth" placeholder="Birth date" @input="(event) => onInputChange('date_of_birth', event)" />
      </div>

      <button type="submit">Sign up</button>
    </form>

    <p>Already have an account?  <router-link :to="`/` + $i18n.locale + `/auth/login`">Sign in!</router-link></p>
  </div>
</template>

<script>
import { useSignupStore } from '../../store/auth';
import { useRouter } from 'vue-router'; // Import useRouter

export default {
  setup() {
    const signupStore = useSignupStore();
    const cities = ref([]);
    const router = useRouter();
    // Fetch cities from API when the component is mounted
    onMounted(async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/cities'); // Replace with your API URL
        const data = await response.json();
        cities.value = data.data.cities; // Assuming your API response has a "cities" array
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    });

    const onFileChange = (field, event) => {
      const file = event.target.files[0];
      console.log(file);
      signupStore[field] = file;
    };

    const handleSignup = async () => {
      try {
        const data= await signupStore.signup();
        //console.log(data.user);

        localStorage.setItem('authToken',  data.token);
        router.push('/en/auth/profile');

        console.log('Signup successful');
      } catch (error) {
        console.error('Signup failed:', error.message);
      }
    };

    const onInputChange = (field, event) => {
      const value = event.target.value;
      console.log(`Input change for ${field}:`, value);
      signupStore[field] = value;
      console.log('Updated store values:', signupStore.$state);
    };

    return {
      ...signupStore,
      cities,
      handleSignup,
      onFileChange,
      onInputChange
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
  color: #888;
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
select,
button {
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

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 2px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}

label input[type='file'] {
  display: none;
}
</style>