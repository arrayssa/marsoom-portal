<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ $t('organizationListedInEventDetails') }}</h2>
  </div>
  <ProgressSpinner v-if="pending && organizationId" class="flex justify-content-center mt-5" />
  <div class="grid my-gutter" v-else>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('raranking') }}:</p>
          <p class="w-8">{{ data.data.raranking }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('id') }}:</p>
          <p class="w-8">{{ data.data.id }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('issues_quantity') }}:</p>
          <p class="w-8">{{ data.data.issues_quantity }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('revision') }}:</p>
          <p class="w-8" :class="{ 'text-primary-500': data.data.revision !== '0', 'text-red-500': data.data.revision === '0' }">{{ data.data.revision !== '0' ? 'Yes' : 'No' }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('acceptability') }}:</p>
          <p class="w-8" :class="{ 'text-primary-500': data.data.acceptability !== '0', 'text-red-500': data.data.acceptability === '0' }">{{ data.data.acceptability !== '0' ? 'Yes' : 'No' }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('publishing_license') }}:</p>
          <p class="w-8">{{ data.data.publishing_license }}</p>
        </div>
      </div>
    </div>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('start_date') }}:</p>
          <p class="w-8">{{ data.data.start_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('end_date') }}:</p>
          <p class="w-8">{{ data.data.end_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('account_number') }}:</p>
          <p class="w-8">{{ data.data.account_number }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('number_of_shipping') }}:</p>
          <p class="w-8">{{ data.data.number_of_shipping }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('local_publishers_membership') }}:</p>
          <p class="w-8">{{ data.data.local_publishers_membership }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRouter().currentRoute.value;
const organizationId = route.params.id;

const { pending, data } = useGetApi(`event-organizations/${organizationId}`);
</script>

<style lang="scss">
.my-gutter {
  [class*='col'] {
    &:nth-of-type(1) {
      padding-inline-end: 2rem;
    }

    &:nth-of-type(2) {
      padding-inline-start: 2rem;
    }
  }
}
</style>
