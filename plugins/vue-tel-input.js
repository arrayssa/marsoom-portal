// plugins/vue-tel-input.js
import VueTelInput from 'vue-tel-input';
import '~/assets/vue-tel-input.css';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTelInput);
});
