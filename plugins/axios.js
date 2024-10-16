import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    // Create a new instance of axios with a custom config
    const api = axios.create({
        baseURL: 'https://api-staging.arrays.sa/api/', // Replace with your API base URL
    });

    // Provide axios globally within the app
    return {
        provide: {
            axios: api,
        },
    };
});

