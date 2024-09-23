<template>
  <Dialog :visible="true" @update:visible="closeModal" modal :header="id ? $t('editForm', { name: $t('country') }) : $t('addNewForm.feminine', { name: $t('country') })" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="grid">
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="countryForm.name" :name="'name'" :label="$t('name')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="countryForm.initials" :name="'initials'" :label="$t('initials')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppInput v-model="countryForm.code" :name="'code'" :label="$t('code')" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12 md:col-6">
          <div class="flex flex-column gap-2">
            <AppSelect v-model="countryForm.nationality_id" :name="'nationality_id'" :options="nationalities?.data?.rows" :label="$t('nationality')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
          </div>
        </div>
        <div class="col-12">
          <div class="flex flex-column gap-2">
            <label for="photo">{{ $t('flag') }}</label>
            <FileUpload accept="image/*" :multiple="false" :auto="true" :maxFiles="1" @select="onSelectedFiles" :maxFileSize="1000000">
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

let countryForm = ref({
  name: '',
  code: '',
  initials: '',
  flag: '',
  nationality_id: ''
});

const { data: nationalities } = useGetApi('nationalities');

const { pending, execute } = useGetApi(
  `countries/${props.id}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      countryForm.value = res.data;
      countryForm.value.nationality_id = Number(res.data?.nationality_id);
      if (res.data.flag) {
        countryForm.value.flag = res.data.flag;
        imgFiles.value = [
          {
            name: 'Existing flag',
            objectURL: res.data.flag
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

// Start Uplpod File //
const imgFiles = ref([]);

const onSelectedFiles = (event) => {
  imgFiles.value = [];

  imgFiles.value = event.files;
  imgFiles.value.forEach((file) => {
    // Update the flag with the new file
    countryForm.value.flag = file;
  });
};
// End Upload File

const onSubmit = async () => {
  submiting.value = true;
  
  let formData = new FormData();
  formData.append('id', props.id ? props.id : '');
  formData.append('name', countryForm.value.name);
  formData.append('code', countryForm.value.code);
  formData.append('initials', countryForm.value.initials);
  formData.append('nationality_id', countryForm.value.nationality_id);
  formData.append('flag', countryForm.value.flag);

  try {
    if (props.id) {
      await usePutApi(`countries/${props.id}`, formData);
      closeModal();
      emit('submit');
    } else {
      await usePostApi('countries', formData);
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
