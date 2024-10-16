import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    // Create a new instance of axios with a custom config
    const apiBaseUrl = useRuntimeConfig().public.apiBaseUrl || process.env.API_BASE_URL;

    const api = axios.create({
        baseURL: apiBaseUrl, // Replace with your API base URL
    });

    // Provide axios globally within the app
    return {
        provide: {
            axios: api,
        },
    };
});

