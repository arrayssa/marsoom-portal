<template>
    <div class="">
      <div class="flex justify-between items-center mb-10">
        <p class="font-medium text-blue10 text-xl capitalize">{{ $t('organization') }}</p>
        <div class="flex gap-5">
          <NuxtLink v-if="organization !== null && organization.status === 'Approved'" :to="'books'">
            <Button :label="$t('uploadBooks')" icon="pi pi-book" class="bg-primary text-base h-42 px-3 text-white"/>
          </NuxtLink>
          <NuxtLink v-if="organization === null" :to="'organization/new'">
            <Button :label="$t('addNew')" icon="pi pi-plus" class="bg-primary text-base h-42 px-3 text-white"/>
          </NuxtLink>
          <NuxtLink v-else-if="organization !== null && organization.status === 'Approved'" :to="'organization/edit'">
            <Button :label="$t('edit')" icon="pi pi-pencil" class="bg-primary text-base h-42 px-3 text-white"/>
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
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="(value, key) in organization" :key="key" class="min-w-[300px]">
            <label class=" font-semibold" :for="key">{{ formatKey(key) }}</label>
            <p v-if="isLink(key)" class="text-gray-700 p-2 border rounded-lg bg-gray-50 underline mt-2">
              <a :href="`/${value}`" target="_blank">{{ key }} <i class="pi pi-link"></i></a>
            </p>
            <p v-else class="text-gray-700 p-2 border rounded-lg bg-gray-50 min-h-10 mt-2">{{ value }}</p>
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
        
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    }
  </script>
  