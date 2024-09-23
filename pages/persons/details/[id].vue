<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ $t('personDetails') }}</h2>
  </div>
  <ProgressSpinner v-if="pending && personId" class="flex justify-content-center mt-5" />
  <div class="grid my-gutter" v-else>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex align-items-center mb-3">
          <Avatar image="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" class="mr-2" size="large" shape="circle" />
          <p class="font-medium">Lely don adam</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">ID:</p>
          <p class="w-8">{{ data?.data?.id }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">ID Type:</p>
          <p class="w-8">{{ data?.data?.id_type }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">ID Expiration:</p>
          <p class="w-8">{{ data?.data?.id_expiration }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Email Address:</p>
          <p class="w-8">{{ data?.data?.email }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Phone:</p>
          <p class="w-8">{{ data?.data?.Phone1 }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Whatsapp:</p>
          <p class="w-8">{{ data?.data?.WhatsApp }}</p>
        </div>
        <div class="flex justify-content-between">
          <p class="font-medium">CV Resume:</p>
          <p class="w-8">{{}}</p>
        </div>
      </div>
    </div>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Birth:</p>
          <p class="w-8">{{ data?.data?.birthdate }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Zip:</p>
          <p class="w-8">{{ data?.data?.zip }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Street:</p>
          <p class="w-8">{{ data?.data?.street_address }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">URL:</p>
          <p class="w-8">{{}}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Jop Title:</p>
          <p class="w-8">{{}}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Leader SN:</p>
          <p class="w-8">{{}}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">Organization:</p>
          <p class="w-8">{{}}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">City:</p>
          <p class="w-8">{{ data?.data?.WhatsApp }}</p>
        </div>
        <div class="flex justify-content-between">
          <p class="font-medium">Nationality:</p>
          <p class="w-8">{{ data?.data?.nationality }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRouter().currentRoute.value;
const personId = route.params.id;

const { pending, data } = useGetApi(`persons/${personId}`);
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
