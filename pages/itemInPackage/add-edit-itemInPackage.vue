<template>
  <Dialog
    :visible="true"
    @update:visible="closeModal"
    modal
    :header="id ? $t('editForm', { name: $t('itemInPackage') }) : $t('addNewForm.feminine', { name: $t('itemInPackage') })"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInPackageForm.name" :name="'name'" :label="$t('name')" :errors="errors" :rules="'required'" />
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

let itemInPackageForm = ref({
  name: ''
});

const { pending, execute } = useGetApi(
  `item-in-package/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      itemInPackageForm.value = res.data;
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
      await usePutApi(`item-in-package/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('item-in-package', value);
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
