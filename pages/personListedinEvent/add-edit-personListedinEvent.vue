<template>
  <Dialog
    :visible="true"
    @update:visible="closeModal"
    modal
    :header="id ? $t('editForm', { name: $t('personListedinEvent') }) : $t('addNewForm.feminine', { name: $t('personListedinEvent') })"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <label for="date1">{{ $t('startingDate') }}</label>
            <Calendar inputId="date1" v-model="personForm.start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <label for="date1">{{ $t('endingDate') }}</label>
            <Calendar inputId="date1" v-model="personForm.end_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="personForm.vip" :name="'vip'" :label="$t('vip')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="personForm.role" :name="'role'" :label="$t('role')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="personForm.account_number" :name="'account_number'" :label="$t('account_number')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="personForm.person_id" :name="'person_id'" :label="$t('person_id')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="personForm.list_type_id" :name="'list_type_id'" :options="listTypes?.data?.rows" :label="$t('listedType')" :optionLabel="'specification'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="personForm.event_id" :name="'event_id'" :options="events?.data?.rows" :label="$t('events')" :optionLabel="'title'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="personForm.revision" :name="'revision'" :inputId="'revision'" :label="$t('revision')" :errors="errors" />
          </div>
        </div>
        <div class="col-6 md:col-6">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="personForm.acceptability" :name="'acceptability'" :inputId="'acceptability'" :label="$t('acceptability')" :errors="errors" />
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

let personForm = ref({
  start_date: null,
  end_date: null,
  vip: '',
  role: '',
  account_number: '',
  person_id: '',
  list_type_id: null,
  event_id: null,
  revision: false,
  acceptability: false
});

const { data: events } = useGetApi('events');
const { data: listTypes } = useGetApi('list-types');

const { pending, execute } = useGetApi(
  `event-persons/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      personForm.value = res.data;
      personForm.value.event_id = Number(res.data?.event_id)
      personForm.value.list_type_id = Number(res.data?.list_type_id)
      personForm.value.revision = Boolean(Number(res.data?.revision))
      personForm.value.acceptability = Boolean(Number(res.data?.acceptability))
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
      await usePutApi(`event-persons/${props.id}`, value);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('event-persons', value);
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
