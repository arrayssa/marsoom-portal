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
            <label for="date1">{{ $t('startingDate') }}</label>
            <Calendar inputId="date1" v-model="organizationForm.start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <label for="date1">{{ $t('endingDate') }}</label>
            <Calendar inputId="date1" v-model="organizationForm.end_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.number_of_shipping" :name="'number_of_shipping'" :label="$t('numberOfShipping')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.issues_quantity" :name="'issues_quantity'" :label="$t('issuesQuantity')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.account_number" :name="'account_number'" :label="$t('account_number')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.raranking" :name="'raranking'" :label="$t('raranking')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.local_publishers_membership" :name="'local_publishers_membership'" :label="$t('local_publishers_membership')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.publishing_license" :name="'publishing_license'" :label="$t('publishing_license')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="organizationForm.list_type_id" :name="'list_type_id'" :options="listTypes?.data?.rows" :label="$t('listedType')" :optionLabel="'specification'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="organizationForm.egent_id" :name="'egent_id'" :label="$t('egent_id')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="organizationForm.organization_id" :name="'organization_id'" :options="organizations?.data?.rows" :label="$t('organization')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="organizationForm.event_id" :name="'event_id'" :options="events?.data?.rows" :label="$t('events')" :optionLabel="'title'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="organizationForm.revision" :name="'revision'" :inputId="'revision'" :label="$t('revision')" :errors="errors" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="organizationForm.acceptability" :name="'acceptability'" :inputId="'acceptability'" :label="$t('acceptability')" :errors="errors" />
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

let organizationForm = ref({
  start_date: null,
  end_date: null,
  number_of_shipping: '',
  issues_quantity: '',
  account_number: '',
  raranking: '',
  local_publishers_membership: '',
  publishing_license: '',
  list_type_id: null,
  egent_id: '',
  organization_id: null,
  event_id: null,
  revision: false,
  acceptability: false
});

const { data: events } = useGetApi('events');
const { data: organizations } = useGetApi('organizations');
const { data: listTypes } = useGetApi('list-types');

const { pending, execute } = useGetApi(
  `event-organizations/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      organizationForm.value = res.data;
      organizationForm.value.organization_id = Number(res.data?.organization_id)
      organizationForm.value.event_id = Number(res.data?.event_id)
      organizationForm.value.list_type_id = Number(res.data?.list_type_id)
      organizationForm.value.revision = Boolean(Number(res.data?.revision))
      organizationForm.value.acceptability = Boolean(Number(res.data?.acceptability))
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
      await usePutApi(`event-organizations/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('event-organizations', value);
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
