// plugins/vue-phone-number-input.js
import VuePhoneNumberInput from 'vue-phone-number-input';
import 'vue-phone-number-input/dist/vue-phone-number-input.css';




export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('VuePhoneNumberInput', VuePhoneNumberInput);
  });