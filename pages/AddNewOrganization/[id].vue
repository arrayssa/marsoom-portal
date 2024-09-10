<template>
  <div class="flex justify-start items-center mb-9 mt-1">
    <i class="pi pi-arrow-left mr-2" @click="$router.go(-1)"></i>
    <div class="text-xl font-medium">{{ $t('form.addNewOrganization') }}</div>
  </div>
  <ProgressSpinner v-if="pending && theId" />
  <Form v-else @submit="onSubmit" v-slot:default="{ errors }">
    <div class="container card m-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.name" name="name" :label="$t('form.name')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.commercial_Name" name="commercial_Name" :label="$t('form.commercialName')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.abbreviation" name="abbreviation" :label="$t('form.abbreviation')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.name_tag" name="name_tag" :label="$t('form.nameTag')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.commercial_rgistryID" name="commercial_rgistryID" :label="$t('form.commercialID')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <label for="commercial_registry_expiration" style="margin-bottom: 17px">{{ $t('form.commercialExpiration') }}</label>
        <Calendar :name="'commercial_registry_expiration'" inputId="commercial_registry_expiration" v-model="theData.commercial_registry_expiration" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />
        <!--        <CustomeTextInput v-model="theData.commercial_registry_expiration" name="Commercial_registry_expiration" :label="$t('form.commercialExpiration')" :errors="errors" :rules="'required'"/>-->
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.tax_registry_expiration" name="tax_registry_expiration" :label="$t('form.taxExpiration')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.email" name="email" :label="$t('form.email')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <label for="establish_date" style="margin-bottom: 17px">{{ $t('form.establishDate') }}</label>

        <Calendar :name="'establish_date'" inputId="establish_date" v-model="theData.establish_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />

        <!--        <CustomeTextInput v-model="theData.establish_date" name="establish_date" :label="$t('form.establishDate')" :errors="errors" :rules="'required|numeric'"/>-->
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.zip" name="zip" :label="$t('form.zip')" :errors="errors" :rules="'required|numeric'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.Phone1" name="Phone1" :label="$t('form.phone.1')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.Phone2" name="Phone2" :label="$t('form.phone.2')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.WhatsApp" name="WhatsApp" :label="$t('form.whatsApp')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.head_office_address" name="head_office_address" :label="$t('form.headOfficeAddress')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.website" name="website" :label="$t('form.websiteURL')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <label for="city_id" class="text-xl font-medium text-label mb-4">{{ $t('table.city') }}</label>
        <Field name="city_id" label="City" rules="required" v-model="theData.city_id">
          <Dropdown v-model="theData.city_id" name="city_id" :options="cities?.data?.rows" optionLabel="name" optionValue="id" :placeholder="$t('common.select')" :invalid="errors.city_id" />
          <ErrorMessage name="city_id" class="text-red-500 mt-2" />
        </Field>
      </div>

      <div class="flex flex-col">
        <label for="nationality_country_Id" class="text-xl font-medium text-label mb-4">{{ $t('form.nationalityID') }}</label>
        <Field name="nationality_country_Id" label="Nationality" rules="required" v-model="theData.nationality_country_Id">
          <Dropdown v-model="theData.nationality_country_Id" name="nationality_country_Id" :options="nationalities?.data?.rows" optionValue="id" optionLabel="name" :placeholder="$t('common.select')" :invalid="errors.nationality_id" />
          <ErrorMessage name="nationality_country_Id" class="text-red-500 mt-2" />
        </Field>
      </div>

      <div class="flex flex-col">
        <label for="org_classification_id" class="text-xl font-medium text-label mb-4">{{ $t('form.classification') }}</label>
        <Field name="org_classification_id" label="Classification" rules="required" v-model="theData.org_classification_id">
          <Dropdown v-model="theData.org_classification_id" name="org_classification_id" :options="classifications?.data?.rows" optionValue="id" optionLabel="name" :placeholder="$t('common.select')" :invalid="errors.org_classification_id" />
          <ErrorMessage name="org_classification_id" class="text-red-500 mt-2" />
        </Field>
      </div>

      <!--      <div class="flex flex-col">-->
      <!--        <CustomeTextInput v-model="theData.organization_parent_Sn" name="organization_parent_Sn" :label="$t('form.companyCode')" :errors="errors" :rules="'required'"/>-->
      <!--      </div>-->
    </div>
    <!-- end card 1 -->
    <div class="card container m-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
      <div class="flex flex-col">
        <label for="photo" class="text-xl font-medium text-label mb-4">{{ $t('form.uploadCompanyLogo') }}</label>
        <FileUpload name="theFile" accept="image/*" @select="onSelectedLogoFiles" :auto="true" chooseLabel="Browse" :showUploadButton="false" :showCancelButton="false" :maxFileSize="1000000">
          <template #empty>
            <p class="text-blue3">Or Drag and drop files here to upload.</p>
          </template>
        </FileUpload>
      </div>

      <div class="flex flex-col">
        <label for="photo" class="text-xl font-medium text-label mb-4">{{ $t('form.commercialFile') }}</label>
        <FileUpload name="theFile" accept="image/*" @select="onSelectedCommercialFiles" :auto="true" chooseLabel="Browse" :showUploadButton="false" :showCancelButton="false" :maxFileSize="1000000">
          <template #empty>
            <p class="text-blue3">Or Drag and drop files here to upload.</p>
          </template>
        </FileUpload>
      </div>

      <div class="flex flex-col">
        <label for="photo" class="text-xl font-medium text-label mb-4">{{ $t('form.publishingFile') }}</label>
        <FileUpload name="theFile" accept="image/*" @select="onSelectedPublishFiles" :auto="true" chooseLabel="Browse" :showUploadButton="false" :showCancelButton="false" :maxFileSize="1000000">
          <template #empty>
            <p class="text-blue3">Or Drag and drop files here to upload.</p>
          </template>
        </FileUpload>
      </div>
    </div>

    <div class="!p-5 card container m-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
      <div class="flex flex-col">
        <label for="manager_id" class="text-xl font-medium text-label mb-4">{{ $t('form.manager') }}</label>
        <Field name="manager_id" label="Manager" rules="required" v-model="theData.manager_id">
          <Dropdown v-model="theData.manager_id" name="manager_id" :options="persons?.data?.rows" optionValue="id" optionLabel="first_name" :placeholder="$t('common.select')" :invalid="errors.manager_id" />
          <ErrorMessage name="manager_id" class="text-red-500 mt-2" />
        </Field>
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.iban" name="iban" :label="$t('form.iBAN')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.swift_code" name="swift_code" :label="$t('form.swiftCode')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.bank" name="bank" :label="$t('form.bank')" :errors="errors" :rules="'required'" />
      </div>

      <!--      <div class="flex flex-col">-->
      <!--        <CustomeTextInput v-model="theData.Bank_account_form" name="Bank_account_form" :label="$t('form.bankAccount')" :errors="errors" :rules="'required'"/>-->
      <!--      </div>-->

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.account_number" name="account_number" :label="$t('form.account_number')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.membership_number" name="membership_number" :label="$t('form.membershipNumber')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.publishing_license_number" name="publishing_license_number" :label="$t('form.publishingLicense')" :errors="errors" :rules="'required'" />
      </div>

      <div class="flex flex-col col-span-2">
        <CustomeTextInput v-model="theData.publishing_license_expiration" name="publishing_license_expiration" :label="$t('form.publishingLicenseExpiration')" :errors="errors" :rules="'required'" />
      </div>

      <!--      <div class="flex flex-col">-->
      <!--        <label class="text-xl font-medium text-label mb-4">{{ $t('form.activities') }}</label>-->
      <!--        <MultiSelect v-model="theData.activities" :maxSelectedLabels="3" :options="activities?.data?.rows" optionLabel="specifications" optionValue="id" placeholder="Select Activities" />-->
      <!--      </div>-->

      <div class="flex flex-col">
        <CustomeTextInput v-model="theData.organization_Sn" name="organization_Sn" :label="$t('form.organizationSn')" :errors="errors" :rules="'required'" />
      </div>

      <div v-for="error in apiErrors" class="mb-4">
        <InlineMessage severity="error">
          {{ error.join(' ') }}
        </InlineMessage>
      </div>
    </div>
    <!-- end form -->
    <div class="flex justify-end mb-10">
      <Button class="bg-bgcancel text-primary h-48 font-normal text-2xl mt-4 mr-6" @click="navigateTo('/organization')">
        {{ $t('common.cancel') }}
      </Button>
      <Button type="submit" class="bg-primary h-48 font-normal text-2xl mt-4" :loading="submiting" :label="theId ? $t('common.edit') : $t('common.save')" />
    </div>
  </Form>
</template>

<script setup>
import CustomTextInput from '../../components/AppInput.vue';

console.log('Page loaded');

console.log('Component mounted');

const { t } = useI18n();

// const emit = defineEmits(['next']);

// let theData = ref({});

// const route = useRouter().currentRoute.value;
// const theId = route.params.id;

// const { data: activities } = useApi('activities');

// const { pending, execute } = useApi(`organizations/${theId}`, {
//   immediate: false,
//   transform: (res) => {
//     theData.value = res.data;
//   }
// });

// onMounted(() => {
//   if (theId) {
//     execute();
//   }
// });
// const { data: cities } = useApi('cities');

// const { data: nationalities } = useApi('countries');

// const { data: classifications } = useApi('organization-classification');
// const { data: persons } = useApi('persons');
// const logoFiles = ref([]);
// const publishFiles = ref([]);
// const commercialFiles = ref([]);
// let company_logo = ref('');
// let publishFile = ref('');
// let commercial_registry_file = ref('');

// const onSelectedLogoFiles = (event) => {
//   logoFiles.value = [];

//   logoFiles.value = event.files;
//   logoFiles.value.forEach((file) => {
//     // Update the Image with the new file
//     company_logo.value = file;
//   });
// };
// const onSelectedPublishFiles = (event) => {
//   publishFiles.value = [];

//   publishFiles.value = event.files;
//   publishFiles.value.forEach((file) => {
//     // Update the Image with the new file
//     publishFile.value = file;
//   });
// };
// const onSelectedCommercialFiles = (event) => {
//   commercialFiles.value = [];
//   commercialFiles.value = event.files;
//   commercialFiles.value.forEach((file) => {
//     // Update the Image with the new file
//     commercial_registry_file.value = file;
//   });
// };

// const toast = useToast();

// const apiErrors = ref([]);
// const submiting = ref(false);
// const onSubmit = async (value) => {
//   submiting.value = true;
//   apiErrors.value = [];
//   let formData = new FormData();
//   // loop over the object and add it to the formData
//   for (const [key, val] of Object.entries(value)) {
//     formData.append(key, val);
//   }

//   if (company_logo.value) formData.append('company_logo', company_logo.value);
//   if (publishFile.value) formData.append('publishing_file', publishFile.value);
//   if (commercial_registry_file.value) formData.append('commercial_registry_file', commercial_registry_file.value);

//   if (theData.value.commercial_registry_expiration) formData.append('commercial_registry_expiration', theData.value.commercial_registry_expiration);
//   if (theData.value.establish_date) formData.append('establish_date', theData.value.establish_date);

//   if (theId) formData.append('_method', 'PUT');

//   try {
//     await use$Fetch(theId ? `organizations/${theId}` : 'organizations', {
//       method: 'POST',
//       body: formData
//     });
//     submiting.value = false;
//     toast.add({
//       severity: 'success',
//       summary: t('common.Successful'),
//       detail: t('common.UpdatedSuccessfully'),
//       life: 3000
//     });
//     emit('submit');
//   } catch (error) {
//     submiting.value = false;
//     apiErrors.value = Object.values(error?.response?._data?.errors);
//   }
// };
</script>
