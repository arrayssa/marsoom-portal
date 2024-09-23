<template>
  <Dialog
    :visible="true"
    @update:visible="closeModal"
    modal
    :header="id ? $t('editForm', { name: $t('personInListedOrg') }) : $t('addNewForm.feminine', { name: $t('personInListedOrg') })"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="personForm.reranking" :name="'reranking'" :label="$t('reranking')" :errors="errors" :rules="'required'" />
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
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <label>{{ $t('uploadPhoto') }}</label>
            <FileUpload accept="image/*" :multiple="false" :auto="true" :maxFiles="1" @select="onSelectedImgFiles" :maxFileSize="1000000">
              <template #header="{ chooseCallback }">
                <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                  <div class="flex gap-2">
                    <Button @click="chooseCallback()" icon="pi pi-cloud-upload" rounded outlined severity="secondary"></Button>
                  </div>
                </div>
              </template>
              <template #empty v-if="!imgFiles.length">
                <p class="text-blue3">Drag and drop files to here to upload.</p>
              </template>
              <template #content>
                <div v-for="file of imgFiles" :key="file.name + file.type + file.size" class="p-2 rounded-border flex border align-items-center border-surface items-center gap-4">
                  <div>
                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                  </div>
                </div>
              </template>
            </FileUpload>
          </div>
        </div>
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <AppCheckbox v-model="personForm.authorized" :name="'authorized'" :inputId="'authorized'" :label="$t('authorized')" :errors="errors" />
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
  reranking: '',
  role: '',
  account_number: '',
  person_id: '',
  list_type_id: null,
  event_id: null,
  authorized: '',
  authorized_file: ''
});

const { data: events } = useGetApi('events');
const { data: listTypes } = useGetApi('list-types');

const { pending, execute } = useGetApi(
  `organization-persons/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      personForm.value = res.data;
      personForm.value.event_id = Number(res.data?.event_id);
      personForm.value.list_type_id = Number(res.data?.list_type_id);
      personForm.value.authorized = Boolean(Number(res.data?.authorized));
      if (res.data.authorized_file) {
        personForm.value.authorized_file = res.data.authorized_file;
        imgFiles.value = [
          {
            name: 'Existing image',
            objectURL: res.data.authorized_file
          }
        ];
      }
    }
  }
);

onMounted(() => {
  if (props.id) {
    execute();
  }
});

const imgFiles = ref([]);

const onSelectedImgFiles = (event) => {
  imgFiles.value = [];

  imgFiles.value = event.files;
  imgFiles.value.forEach((file) => {
    // Update the Image with the new file
    personForm.value.authorized_file = file;
  });
};

const onSubmit = async (value) => {
  submiting.value = true;

  let formData = new FormData();
  formData.append('id', props.id ? props.id : '');
  formData.append('reranking', value.reranking);
  formData.append('role', value.role);
  formData.append('account_number', value.account_number);
  formData.append('person_id', value.person_id);
  formData.append('event_id', value.event_id);
  formData.append('list_type_id', value.list_type_id);
  formData.append('authorized', value.authorized ? 1 : 0);
  formData.append('authorized_file', personForm.value.authorized_file);

  try {
    if (props.id) {
      await usePutApi(`organization-persons/${props.id}`, formData);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('organization-persons', formData);
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
