import VueGoogleMaps from "@fawmi/vue-google-maps";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: "AIzaSyD-3W0yDWNg3MgehOnu2Ibi1Y4wNLNUcYw",
      libraries: "places", // This is required if you use the Autocomplete plugin
    },
    autobindAllEvents: true,
  });
});