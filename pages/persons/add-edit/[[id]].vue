<template>
  <div class="flex align-items-center justify-content-start mt-5 mb-5">
    <i class="pi pi-arrow-left mr-2 rtl:ml-2 text-lg" @click="$router.go(-1)"></i>
    <h2 class="text-xl mb-0 mt-0">{{ personId ? $t('editForm', { name: $t('person') }) : $t('addNewForm.feminine', { name: $t('person') }) }}</h2>
  </div>
  <ProgressSpinner v-if="pending && personId" class="flex justify-content-center mt-5" />
  <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.person_Sn" :name="'person_Sn'" :label="$t('person_Sn')" :errors="errors" :rules="'required|numeric'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.first_name" :name="'first_name'" :label="$t('firstname')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.second_name" :name="'second_name'" :label="$t('lastname')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.surName" :name="'surName'" :label="$t('surname')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.name_tag" :name="'name_tag'" :label="$t('nameTag')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.id" :name="'id'" :label="$t('id')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.id_type" :name="'id_type'" :label="$t('idType')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.id_expiration" :name="'id_expiration'" :label="$t('idExpiration')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.Honor" :name="'Honor'" :label="$t('honor')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.email" :name="'email'" :label="$t('email')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label for="date1">{{ $t('birthdate') }}</label>
          <Calendar inputId="date1" v-model="personForm.birthdate" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="personForm.gender" :name="'gender'" :options="genders" :label="$t('gender')" :optionLabel="'name'" :optionValue="'value'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.zip" :name="'zip'" :label="$t('zip')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.Phone1" :name="'Phone1'" :label="$t('phone')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.WhatsApp" :name="'WhatsApp'" :label="$t('whatsApp')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.street_address" :name="'street_address'" :label="$t('streetAddress')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.linkedIn" :name="'linkedIn'" :label="$t('linkedUrl')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.jopTitle" :name="'jopTitle'" :label="$t('jopTitle')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.leader_sn" :name="'leader_sn'" :label="$t('leader_sn')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.organization" :name="'organization'" :label="$t('organization')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <label>{{ $t('personInterest') }}</label>
          <MultiSelect v-model="personForm.intersets" :maxSelectedLabels="3" :options="interests?.data?.rows" optionLabel="name" optionValue="id" placeholder="Select Interest" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="personForm.country_id" :name="'country_id'" :options="countries?.data?.rows" :label="$t('country')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppSelect v-model="personForm.nationality" :name="'nationality'" :options="nationalities?.data?.rows" :label="$t('nationality')" :optionLabel="'name'" :optionValue="'id'" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-12 md:col-6 lg:col-3 mb-4">
        <div class="flex flex-column gap-2">
          <AppInput v-model="personForm.account_number" :name="'account_number'" :label="$t('account_number')" :errors="errors" :rules="'required'" />
        </div>
      </div>
      <div class="col-6">
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
      <div class="col-6">
        <div class="flex flex-column gap-2">
          <label>{{ $t('uploadCv') }}</label>
          <FileUpload accept="image/*" :multiple="false" :auto="true" :maxFiles="1" @select="onSelectedCvFiles" :maxFileSize="1000000">
            <template #header="{ chooseCallback }">
              <div class="flex flex-wrap justify-between items-center flex-1 gap-4">
                <div class="flex gap-2">
                  <Button @click="chooseCallback()" icon="pi pi-cloud-upload" rounded outlined severity="secondary"></Button>
                </div>
              </div>
            </template>
            <template #empty v-if="!cvFiles.length">
              <p class="text-blue3">Drag and drop files to here to upload.</p>
            </template>
            <template #content>
              <div v-for="file of cvFiles" :key="file.name + file.type + file.size" class="p-2 rounded-border flex border align-items-center border-surface items-center gap-4">
                <div>
                  <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                </div>
              </div>
            </template>
          </FileUpload>
        </div>
      </div>
    </div>
    <div class="flex justify-content-end mb-4 mt-4 gap-3">
      <Button severity="secondary" @click="navigateTo(localePath(`/persons`))" size="large">{{ $t('cancel') }}</Button>
      <Button type="submit" :loading="submiting" :label="$t('save')" size="large" />
    </div>
  </Form>
</template>

<script setup>
const { t } = useI18n();
const route = useRouter().currentRoute.value;
const personId = route.params.id;

let submiting = ref(false);
const toast = useToast();
const localePath = useLocalePath();

let personForm = ref({
  id: '',
  first_name: '',
  second_name: '',
  email: '',
  nationality: '',
  surName: '',
  name_tag: '',
  idType: '',
  id_expiration: '',
  Honor: '',
  birthdate: null,
  gender: '',
  zip: '',
  Phone1: '',
  WhatsApp: '',
  street_address: '',
  linkedIn: '',
  person_Sn: '',
  jopTitle: '',
  leader_sn: '',
  organization: '',
  residence_city: '',
  country_id: null,
  Image: null,
  cv: null
});

const genders = ref([
  { name: 'Male', code: 'M', value: '1' },
  { name: 'Female', code: 'F', value: '2' }
]);

const { data: nationalities } = useGetApi('nationalities');
const { data: countries } = useGetApi('countries');
const { data: interests } = useGetApi('interests');

const { pending, execute } = useGetApi(
  `persons/${personId}`,
  {},
  {
    immediate: false,
    transform: (res) => {
      personForm.value = res.data;
      if (res.data.Image) {
        personForm.value.Image = res.data.Image;
        imgFiles.value = [
          {
            name: 'Existing image',
            objectURL: res.data.Image
          }
        ];
      }
    }
  }
);

onMounted(() => {
  if (personId) {
    execute();
  }
});

// Start Uplpod File //
const imgFiles = ref([]);
const cvFiles = ref([]);

const onSelectedImgFiles = (event) => {
  imgFiles.value = [];

  imgFiles.value = event.files;
  imgFiles.value.forEach((file) => {
    // Update the Image with the new file
    personForm.value.Image = file;
  });
};

const onSelectedCvFiles = (event) => {
  cvFiles.value = [];

  cvFiles.value = event.files;
  cvFiles.value.forEach((file) => {
    // Update the Cv with the new file
    personForm.value.cv = file;
  });
};
// End Upload File

const onSubmit = async (value) => {
  submiting.value = true;

  let formData = new FormData();
  // loop over the object and add it to the formData
  for (const [key, val] of Object.entries(value)) {
    formData.append(key, val);
  }

  formData.append('Image', personForm.value.Image);
  formData.append('cv', personForm.value.cv);

  try {
    if (personId) {
      await usePutApi(`persons/${personId}`, formData);
      navigateTo(localePath(`/persons`));
    } else {
      await usePostApi('persons', formData);
      navigateTo(localePath(`/persons`));
    }
    toast.add({ severity: 'success', summary: t('Successful'), detail: personId ? t('UpdatedSuccessfully') : t('CreatedSuccessfully'), life: 3000 });
  } catch (error) {
    console.log(error)
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
