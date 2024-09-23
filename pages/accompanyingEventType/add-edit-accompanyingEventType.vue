<template>
  <Dialog
    :visible="true"
    @update:visible="closeModal"
    modal
    :header="id ? $t('editForm', { name: $t('accompanyingEventType') }) : $t('addNewForm.feminine', { name: $t('accompanyingEventType') })"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <AppInput v-model="accompanyingEventTypeForm.serial_number" :name="'serial_number'" :label="$t('sn')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <AppInput v-model="accompanyingEventTypeForm.specifications" :name="'specifications'" :label="$t('specifications')" :errors="errors" :rules="'required'" />
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

let accompanyingEventTypeForm = ref({
  sn: '',
  specifications: '',
});

const { pending, execute } = useGetApi(
  `accompanying-event-list-types/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      accompanyingEventTypeForm.value = res.data;
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
      await usePutApi(`accompanying-event-list-types/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('accompanying-event-list-types', value);
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
