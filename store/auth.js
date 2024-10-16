import { defineStore } from 'pinia';
import axios from 'axios';
import { useRuntimeConfig } from '#imports';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
    authenticated: false,//!!localStorage.getItem('authToken')
  }),

  actions: {
    async authenticateUser({ email, password }) {
      try {
        const response = await axios.post(useRuntimeConfig().public.apiBaseUrl +'auth/login', {
          email,
          password
        });

        this.user = response.data.data.user;

        this.authenticated = true;
        this.error = null;
        const token = useCookie('token');
        token.value = response.data.data.token;
        localStorage.setItem('authToken', response.data.data.token);

      } catch (err) {
        this.error = err.response ? err.response.data.message : 'An error occurred';
        this.authenticated = false;
        throw err;
      }
    },
    logUserOut() {
      this.user = null;
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      localStorage.removeItem('authToken');
    }
  }
});

export const useSignupStore = defineStore('signup', {
  state: () => ({
    email: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    family_name: '',
    phone: '',
    confirm_identity: 1111111111111,
    identity_expiration_date: '',
    city_id: 1,
    date_of_birth: '',
    personal_image: null,
    doc_image: null,
    district: '',
    street: ''
  }),
  actions: {
    async signup() {
      const formData = new FormData();

      formData.append('email', this.email);
      formData.append('password', this.password);
      formData.append('password_confirmation', this.password_confirmation);
      formData.append('first_name', this.first_name);
      formData.append('last_name', this.last_name);
      formData.append('family_name', this.family_name);
      formData.append('phone', this.phone);
      formData.append('confirm_identity', this.confirm_identity);
      formData.append('identity_expiration_date', this.identity_expiration_date);
      formData.append('city_id', this.city_id);
      formData.append('date_of_birth', this.date_of_birth);
      formData.append('district', this.district);
      formData.append('street', this.street);

      console.log(formData.getAll('street'));
      if (this.personal_image) {
        formData.append('personal_image', this.personal_image);
      }

      if (this.doc_image) {
        formData.append('doc_image', this.doc_image);
      }

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        console.log({ data: formData.get('first_name') });
        const response = await axios.post(useRuntimeConfig().public.apiBaseUrl +'auth/register', formData, config);

        if (!response) {
          throw new Error('Failed to sign up');
        }

        return response.data.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
});

export const useProfileStore = defineStore('profile', {
  state: () => ({
    user: null
  }),
  actions: {
    async fetchProfile() {
      try {
          const api = axios.create({
              baseURL: useRuntimeConfig().public.apiBaseUrl ,
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add the token to the Authorization header
                  'Access-Control-Allow-Origin': '*', // Allow all origins (adjust this based on your security needs)
              },
          });
          const response = await api.get('profile');
          this.user = response.data.data.user;
        //  alert( this.user.city.name)
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    }
  }
});


export const useOrganizationStore = defineStore('organization', {
    state: () => ({
        organization: null
    }),
    actions: {
        async fetchOrganization() {
            try {
                const api = axios.create({
                    baseURL: useRuntimeConfig().public.apiBaseUrl ,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Add the token to the Authorization header
                        'Access-Control-Allow-Origin': '*', // Allow all origins (adjust this based on your security needs)
                    },
                });
                const response = await api.get('/organizations');
                this.organization = response.data.data.organization;
                //  alert( this.user.city.name)
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        }
    }
});
