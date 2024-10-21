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

  const organization = reactive({
    id: '',
    name: '',
    commercial_Name: '',
    commercial_rgistryID: '',
    commercial_registry_expiration: '',
    email: '',
    zip: '',
    Phone1: '',
    Phone2: '',
    country: '',
    city: '',
    publishing_license_number: '',
    publishing_license_expiration: '',
    company_logo: '',
    commercial_registry_file: '',
    publishing_file: '',
    iban: '',
    swift_code: '',
    bank: '',
    account_number: '',
    status: '',
  });

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
        let org_data = response.data.data.organization; // Assuming the data is inside the `data.organization`
        organization.id = org_data.id
        organization.name = org_data.name
        organization.email = org_data.email
        organization.Phone1 = org_data.Phone1
        organization.Phone2 = org_data.Phone2
        organization.zip = org_data.zip
        organization.country = org_data.country.name
        organization.city = org_data.city.name
        organization.publishing_license_number = org_data.publishing_license_number
        organization.publishing_license_expiration = org_data.publishing_license_expiration
        organization.establish_date = org_data.establish_date
        organization.status = org_data.status
        organization.commercial_Name = org_data.commercial_Name
        organization.commercial_rgistryID = org_data.commercial_rgistryID
        organization.commercial_registry_expiration = org_data.commercial_registry_expiration
        organization.company_logo = org_data.company_logo
        organization.commercial_registry_file = org_data.commercial_registry_file
        organization.publishing_file = org_data.publishing_file
        organization.iban = org_data.iban
        organization.swift_code = org_data.swift_code
        organization.bank = org_data.bank
        organization.account_number = org_data.account_number
        
      } catch (error) {
        console.error('Error fetching organization data:', error);
        organization.value = null
      }
    }
  </script>
  