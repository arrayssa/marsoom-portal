<template>
    <div class="">
      <div class="flex justify-between items-center mb-10">
        <p class="font-medium text-blue10 text-xl capitalize">{{ $t('organization') }}</p>
        <div class="flex gap-5">
          <NuxtLink v-if="organization !== null && organization.status === 'Approved'" :to="'books'">
            <Button :label="$t('uploadBooks')" icon="pi pi-book" class="bg-primary text-base h-42 px-3"/>
          </NuxtLink>
          <NuxtLink v-if="organization === null" :to="'organization/new'">
            <Button :label="$t('addNew')" icon="pi pi-plus" class="bg-primary text-base h-42 px-3"/>
          </NuxtLink>
          <NuxtLink v-else :to="'organization/edit'">
            <Button :label="$t('edit')" icon="pi pi-pencil" class="bg-primary text-base h-42 px-3"/>
          </NuxtLink>
        </div>
      </div>
      <div class="block h-100 py-10 mb-10 text-center bg-white rounded-md border-gray-200 border" v-if="organization !== null && organization.status !== 'Approved'">
        <p class="text-red-700">Waiting For administration approval!</p>
      </div>
      <div class="block h-120 py-10 text-center bg-white rounded-md border-gray-200 border" v-if="organization === null">
        <p>You must add an organization first!</p>
      </div>
      <div v-else class="mx-auto p-4 bg-white shadow-md rounded-lg">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="(value, key) in organization" :key="key" class="p-4 border rounded-lg bg-gray-50">
            <strong>{{ formatKey(key) }}:</strong>
            <span v-if="isLink(key)" class="text-blue-600 underline">
              <a :href="value" target="_blank">{{ value }}</a>
            </span>
            <span v-else class="text-gray-700">{{ value }}</span>
          </div>
        </div>
      </div>
      
    </div>
  </template>
  
  <script setup>
  
  import { ref, onMounted } from 'vue';

  let organization = ref(null)

  onMounted(() => {
    fetchOrganization();
  })

  // Utility function to format the keys
const formatKey = (key) => key.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

// Utility function to determine if the value is a link
const isLink = (key) => ['commercial_registry_file', 'website'].includes(key);

  const fetchOrganization = async () => {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem('authToken'); // Get the token from localStorage

      try {
        const response = await $axios.get('organizations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        organization.value = response.data.data.organization; // Assuming the data is inside the `data.organization`
        console.log(organization.value);
        
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    }
  </script>
  