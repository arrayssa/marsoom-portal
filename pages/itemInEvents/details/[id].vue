<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ $t('itemInEventDetails') }}</h2>
  </div>
  <ProgressSpinner v-if="pending && eventItemId" class="flex justify-content-center mt-5" />
  <div class="grid my-gutter" v-else>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('autherName') }}:</p>
          <p class="w-8">{{ data.data.auther_id }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('id') }}:</p>
          <p class="w-8">{{ data.data.id }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('title') }}:</p>
          <p class="w-8">{{ data.data.title }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('review') }}:</p>
          <p class="w-8">{{ data.data.review }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('acceptability') }}:</p>
          <p class="w-8">{{ data.data.acceptability }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('numberOfCopies') }}:</p>
          <p class="w-8">{{ data.data.number_of_copies }}</p>
        </div>
      </div>
    </div>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed">
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('iSBNNumber') }}:</p>
          <p class="w-8">{{ data.data.ISBN_number }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('price') }}:</p>
          <p class="w-8">{{ data.data.price }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('organizationDiscount') }}:</p>
          <p class="w-8">{{ data.data.organization_discount }}</p>
        </div>
        <div class="flex justify-content-between mb-3">
          <p class="font-medium">{{ $t('contentSummary') }}:</p>
          <p class="w-8">{{ data.data.content_summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRouter().currentRoute.value;
const eventItemId = route.params.id;

const { pending, data } = useGetApi(`event-items/${eventItemId}`);
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
