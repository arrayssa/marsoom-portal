import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
    // Create a new instance of axios with a custom config
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
    });

    // Provide axios globally within the app
    return {
        provide: {
            axios: api,
        },
    };
});

