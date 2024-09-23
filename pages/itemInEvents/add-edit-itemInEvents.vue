<template>
  <Dialog
    :visible="true"
    @update:visible="closeModal"
    modal
    :header="id ? $t('editForm', { name: $t('itemInEvents') }) : $t('addNewForm.feminine', { name: $t('itemInEvents') })"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.title" :name="'title'" :label="$t('title')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.auther_id" :name="'auther_id'" :label="$t('auther')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <AppTextarea v-model="itemInEventsForm.content_summary" :name="'content_summary'" :label="$t('contentSummary')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.number_of_copies" :name="'number_of_copies'" :label="$t('numberOfCopies')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.price" :name="'price'" :label="$t('price')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.ISBN_number" :name="'ISBN_number'" :label="$t('iSBNNumber')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="itemInEventsForm.organization_discount" :name="'organization_discount'" :label="$t('organizationDiscount')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="itemInEventsForm.organization_id" :name="'organization_id'" :options="organizations?.data?.rows" :label="$t('organization')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="itemInEventsForm.event_id" :name="'event_id'" :options="events?.data?.rows" :label="$t('events')" :optionLabel="'title'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="itemInEventsForm.review" :name="'review'" :inputId="'review'" :label="$t('review')" :errors="errors" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="itemInEventsForm.acceptability" :name="'acceptability'" :inputId="'acceptability'" :label="$t('acceptability')" :errors="errors" />
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

let itemInEventsForm = ref({
  title: '',
  auther_id: '',
  content_summary: '',
  number_of_copies: '',
  price: '',
  ISBN_number: '',
  organization_discount: '',
  organization_id: null,
  event_id: null,
  review: false,
  acceptability: false
});

const { data: events } = useGetApi('events');
const { data: organizations } = useGetApi('organizations');

const { pending, execute } = useGetApi(
  `event-items/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      itemInEventsForm.value = res.data;
      itemInEventsForm.value.organization_id = Number(res.data?.organization_id);
      itemInEventsForm.value.event_id = Number(res.data?.event_id);
      itemInEventsForm.value.review = Boolean(Number(res.data?.review));
      itemInEventsForm.value.acceptability = Boolean(Number(res.data?.acceptability));
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
      await usePutApi(`event-items/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('event-items', value);
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
