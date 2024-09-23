<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ $t('eventDetails') }}</h2>
  </div>
  <ProgressSpinner v-if="pending && eventId" class="flex justify-content-center mt-5" />
  <div class="grid my-gutter" v-else>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('name') }}:</p>
          <p class="w-8">{{ data.data.title }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('abbreviation') }}:</p>
          <p class="w-8">{{ data.data.abbreviation }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('nameTag') }}:</p>
          <p class="w-8">{{ data.data.name_tag }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('email') }}:</p>
          <p class="w-8">{{ data.data.email }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('zip') }}:</p>
          <p class="w-8">{{ data.data.email }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('phonenumer.1') }}:</p>
          <p class="w-8">{{ data.data.phone1 }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('phonenumer.2') }}:</p>
          <p class="w-8">{{ data.data.phone2 }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('whatsapp') }}:</p>
          <p class="w-8">{{ data.data.whatsapp }}</p>
        </div>
        <div class="flex justify-content-between">
          <p class="font-medium">{{ $t('websiteURL') }}:</p>
          <p class="w-8">{{ data.data.website }}</p>
        </div>
      </div>
    </div>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('cityID') }}:</p>
          <p class="w-8">{{ data.data.city_id }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('president') }}:</p>
          <p class="w-8">{{ data.data.president }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('startingDate') }}:</p>
          <p class="w-8">{{ data.data.start_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('registrationStartDate') }}</p>
          <p class="w-8">{{ data.data.registration_start_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('registrationEndDate') }}</p>
          <p class="w-8">{{ data.data.registration_end_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('eventEndDate') }}:</p>
          <p class="w-8">{{ data.data.event_end_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('publicStartDate') }}:</p>
          <p class="w-8">{{ data.data.public_event_start_date }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('location') }}:</p>
          <p class="w-8">{{ data.data.map_location }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('eventSpecialtySn') }}:</p>
          <p class="w-8">{{ data.data.event_specialty_id }}</p>
        </div>
        <div class="flex justify-content-between">
          <p class="font-medium">{{ $t('eventSeries') }}:</p>
          <p class="w-8">{{ data.data.event_series_id }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRouter().currentRoute.value;
const eventId = route.params.id;

const { pending, data } = useGetApi(`events/${eventId}`);
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
