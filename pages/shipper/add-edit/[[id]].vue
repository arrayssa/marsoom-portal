<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ id ? $t('editForm', { name: $t('shipper') }) : $t('addNewForm.feminine', { name: $t('shipper') }) }}</h2>
  </div>
  <ProgressSpinner v-if="pending && id" class="flex justify-content-center mt-5" />
  <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="shipperForm.name" :name="'name'" :label="$t('name')" :errors="errors" :rules="'required'" />
        </div>
      </div>
    </div>
    <div class="flex justify-content-end mb-4 mt-4 gap-3">
      <Button severity="secondary" @click="navigateTo(localePath(`/shipper`))" size="large">{{ $t('cancel') }}</Button>
      <Button type="submit" :loading="submiting" :label="$t('save')" size="large" />
    </div>
  </Form>
</template>

<script setup>
const { t } = useI18n();
const route = useRouter().currentRoute.value;
const id = route.params.id;

let submiting = ref(false);
const toast = useToast();
const localePath = useLocalePath();

let shipperForm = ref({
  name: '',
});

const { pending, execute } = useGetApi(
  `shipper/${id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      shipperForm.value = res.data;
    }
  }
);

onMounted(() => {
  if (id) {
    execute();
  }
});


const onSubmit = async (value) => {
  submiting.value = true;

  let formData = new FormData();
  for (const [key, val] of Object.entries(value)) {
    formData.append(key, val);
  }

  try {
    if (id) {
      await usePutApi(`shipper/${id}`, formData);
      navigateTo(localePath(`/shipper`));
    } else {
      await usePostApi('shipper', formData);
      navigateTo(localePath(`/shipper`));
    }
    toast.add({ severity: 'success', summary: t('Successful'), detail: id ? t('UpdatedSuccessfully') : t('CreatedSuccessfully'), life: 3000 });
  } catch (error) {
    console.log(error);
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
