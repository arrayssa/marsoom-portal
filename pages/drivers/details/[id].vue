<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ $t('driverDetails') }}</h2>
  </div>
  <ProgressSpinner v-if="pending && id" class="flex justify-content-center mt-5" />
  <div class="grid my-gutter" v-else>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed"></div>
    </div>
    <div class="col md:col-6">
      <div class="card border-2 border-dashed"></div>
    </div>
  </div>
</template>

<script setup>
const route = useRouter().currentRoute.value;
const id = route.params.id;

const { pending, data } = useGetApi(`drivers/${id}`);
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
