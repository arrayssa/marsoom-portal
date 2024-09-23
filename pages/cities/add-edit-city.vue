<template>
  <Dialog :visible="true" @update:visible="closeModal" modal :header="id ? $t('editForm', { name: $t('city') }) : $t('addNewForm.feminine', { name: $t('city') })" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="cityForm.name" :name="'name'" :label="$t('name')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="cityForm.initials" :name="'initials'" :label="$t('initials')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="cityForm.code" :name="'code'" :label="$t('code')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="cityForm.country_id" :name="'country_id'" :options="countries?.data?.rows" :label="$t('country')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-6">
          <Button type="submit" :loading="submiting" :label="props.id ? $t('edit') : $t('create')" />
        </div>
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
const emit = defineEmits(['close-modal', 'submit']);
const closeModal = () => {
  emit('close-modal');
};

let submiting = ref(false);
const toast = useToast();
const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  id: {
    default: ''
  }
});

let cityForm = ref({
  name: '',
  initials: '',
  code: '',
  country_id: ''
});

const { data: countries } = useGetApi('countries');

const { pending, execute } = useGetApi(
  `cities/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      cityForm.value = res.data;
      cityForm.value.country_id = Number(res.data?.country?.id);
    }
  }
);

onMounted(() => {
  if (props.id) {
    execute();
  }
});

const onSubmit = async (value) => {
  submiting.value = true;
  
  try {
    if (props.id) {
      await usePutApi(`cities/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('cities', value);
      closeModal();
      emit('submit');
    }
    toast.add({ severity: 'success', summary: t('Successful'), detail: props.id ? t('UpdatedSuccessfully') : t('CreatedSuccessfully'), life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
