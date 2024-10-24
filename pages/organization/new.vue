<template>
  <div class="form-container">
    <div class="steps-container rounded-md border-gray-200">
      <div v-for="(step, index) in steps" :key="index" :class="{ active: currentStep.id === step.id }" @click="goToStep(step.id)">
        <span class="number">{{ step.id }}</span>
        <span class="title">{{ step.title }}</span>
        <span class="spacer" v-if="step.id < 3">- -- -- -</span>
      </div>
    </div>
    
    <div v-if="currentStep.id === 1">
      <form @submit.prevent="goToStep(2)">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">
          <!-- Row 1 -->
          <div class="row">
            <div class="column">
              <label for="name">Name</label>
              <input v-model="form.name" id="name" type="text" placeholder="Enter Name" @input="(event) => onInputChange('name', event)"/>
              <span class="error-message" v-if="errors.name">{{ getErrorMessage('name') }}</span>
            </div>
            <div class="column">
              <label for="commercialName">Commercial Name</label>
              <input v-model="form.commercialName" id="commercialName" type="text" placeholder="Enter Commercial Name" @input="(event) => onInputChange('commercialName', event)"/>
              <span class="error-message" v-if="errors.commercialName">{{ getErrorMessage('commercialName') }}</span>
            </div>
            <div class="column">
              <label for="commercialId">Commercial ID</label>
              <input v-model="form.commercialId" id="commercialId" type="text" placeholder="Enter ID" @input="(event) => onInputChange('commercialId', event)"/>
              <span class="error-message" v-if="errors.commercialId">{{ getErrorMessage('commercialId') }}</span>
            </div>
            <div class="column">
              <label for="commercialExpiration">Commercial Expiration</label>
              <input v-model="form.commercialExpiration" id="commercialExpiration" type="date" @input="(event) => onInputChange('commercialExpiration', event)"/>
              <span class="error-message" v-if="errors.commercialExpiration">{{ getErrorMessage('commercialExpiration') }}</span>
            </div>
          </div>

          <!-- Row 2 -->
          <div class="row">
            <div class="column">
              <label for="email">Email</label>
              <input v-model="form.email" id="email" type="email" placeholder="Enter Email" @input="(event) => onInputChange('email', event)"/>
              <span class="error-message">{{ getErrorMessage('email') }}</span>
            </div>
            <div class="column">
              <label for="zip">Zip</label>
              <input v-model="form.zip" id="zip" type="text" placeholder="Enter Zip" @input="(event) => onInputChange('zip', event)"/>
              <span class="error-message">{{ getErrorMessage('zip') }}</span>
            </div>
            <div class="column">
              <label for="phone1">Phone 1</label>
              <vue-tel-input v-model="form.phone1" mode="international" @input="onPhone1Change" @country-changed="onCountryChanged" class="border border-gray-200 h-12 bg-gray-200"></vue-tel-input>
              <span class="error-message">{{ getErrorMessage('phone1') }}</span>
            </div>
            <div class="column">
              <label for="phone2">Phone 2</label>
              <vue-tel-input v-model="form.phone2" mode="international" @input="onPhone2Change" @country-changed="onCountryChanged" class="border border-gray-200 h-12 bg-gray-200"></vue-tel-input>
              <span class="error-message">{{ getErrorMessage('phone2') }}</span>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="row">
            <div class="column">
              <label for="nationalityId">Country</label>
              <select v-model="form.nationalityId" id="nationalityId" @change="fetchCities">
                <option value="" selected>Select Country</option>
                <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
              </select>
              <span class="error-message">{{ getErrorMessage('nationalityId') }}</span>
            </div>
            <div class="column">
              <label for="cityId">City</label>
              <select v-model="form.cityId" id="cityId">
                <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
              </select>
              <span class="error-message">{{ getErrorMessage('cityId') }}</span>
            </div>
            <div class="column">
              <label for="publishingLicense">Publishing License</label>
              <input v-model="form.publishingLicense" id="publishingLicense" type="text" placeholder="Enter Publishing License" @input="(event) => onInputChange('publishingLicense', event)"/>
              <span class="error-message">{{ getErrorMessage('publishingLicense') }}</span>
            </div>
            <div class="column">
              <label for="publishingLicenseExpiration">Publishing License Expiration</label>
              <input v-model="form.publishingLicenseExpiration" id="publishingLicenseExpiration" type="date" @input="(event) => onInputChange('publishingLicenseExpiration', event)"/>
              <span class="error-message">{{ getErrorMessage('publishingLicenseExpiration') }}</span>
            </div>
          </div>
        </div>
        <!-- Submit Button -->
        <div class="button-row">
          <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>
          <button type="submit" class="next-btn">Next step</button>
        </div>
      </form>
    </div>

    <div v-if="currentStep.id === 2">
      <form @submit.prevent="goToStep(3)">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">
          <!-- File Uploads -->
          <div class="row">
            <div class="column">
              <label>Upload Company Logo</label>
              <DropFile field="companyLogo" :fileData="form.companyLogo" @file-changed="handleFileChange" @file-removed="handleFileRemove" />
              <span class="error-message">{{ getErrorMessage('companyLogo') }}</span>
            </div>
            <div class="column">
              <label>Commercial File</label>
              <DropFile field="commercialFile" :fileData="form.commercialFile" @file-changed="handleFileChange" @file-removed="handleFileRemove" />
              <span class="error-message">{{ getErrorMessage('commercialFile') }}</span>
            </div>
            <div class="column">
              <label>Publishing File</label>
              <DropFile field="publishingFile" :fileData="form.publishingFile" @file-changed="handleFileChange" @file-removed="handleFileRemove" />
              <span class="error-message">{{ getErrorMessage('publishingFile') }}</span>
            </div>
          </div>
          <!-- Submit Button -->
          <div class="button-row">
            <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>
            <button type="submit" class="next-btn">Next step</button>
          </div>
        </div>
      </form>
    </div>

    <div v-if="currentStep.id === 3">
      <div v-for="error in errors" :key="error">
        <span class="error-message">{{ error }}</span>
      </div>
      <form @submit.prevent="submitForm">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">
          <div class="row">
            <div class="column">
              <label for="iban">IBAN</label>
              <input v-model="form.iban" id="iban" type="text" placeholder="Enter IBAN" @input="(event) => onInputChange('iban', event)"/>
              <span class="error-message">{{ getErrorMessage('iban') }}</span>
            </div>
            <div class="column">
              <label for="swiftCode">Swift Code</label>
              <input v-model="form.swiftCode" id="swiftCode" type="text" placeholder="Enter Swift Code" @input="(event) => onInputChange('swiftCode', event)"/>
              <span class="error-message">{{ getErrorMessage('swiftCode') }}</span>
            </div>
            <div class="column">
              <label for="bank">Bank</label>
              <input v-model="form.bank" id="bank" type="text" placeholder="Enter Bank" @input="(event) => onInputChange('bank', event)"/>
              <span class="error-message">{{ getErrorMessage('bank') }}</span>
            </div>
            <div class="column">
              <label for="bankAccount">Bank Account</label>
              <input v-model="form.bankAccount" id="bankAccount" type="text" placeholder="Enter Bank Account" @input="(event) => onInputChange('bankAccount', event)"/>
              <span class="error-message">{{ getErrorMessage('bankAccount') }}</span>
            </div>
          </div>
        </div>
        <div class="flex justify-end">
          <ProgressSpinner v-if="loading" />
        </div>
        <!-- Submit Button -->
        <div class="button-row">
          <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>
          <button type="submit" class="next-btn">Save</button>
        </div>
      </form>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Form Submitted Successfully!</h3>
        <p>Your organization details have been saved.</p>
        <p v-if="org_status == 'Pending'">Please wait for admin approval to complete steps.</p>
        <button @click="closeModal" class="close-btn">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import DropFile from '../../components/DropFile.vue';
import { useNuxtApp } from '#app';

const form = ref({
  name: '',
  commercialName: '',
  commercialId: '',
  commercialExpiration: '',
  email: '',
  zip: '',
  phone1: '',
  phone2: '',
  nationalityId: '',
  cityId: '',
  publishingLicense: '',
  publishingLicenseExpiration: '',
  companyLogo: null,
  commercialFile: null,
  publishingFile: null,
  iban: '',
  swiftCode: '',
  bank: '',
  bankAccount: '',
});

const currentStep = ref({
  id: 1,
  title: 'Critical Informations'
});
const steps = ref([
  { id: 1, title: 'Critical Informations' },
  { id: 2, title: 'Upload file' },
  { id: 3, title: 'Bank account' },
]);

const countries = ref([]);
const cities = ref([]);
const loading = ref(false);
const showModal = ref(false);
const org_status = ref('');
const errors = ref({});

const onCountryChanged = (country) => {
  form.value.countryCode = country.dialCode;
};

const onPhone1Change = (number) => {
  form.value.phone1 = number.target.value;
  errors.value.phone1 = ''
};

const onPhone2Change = (number) => {
  form.value.phone2 = number.target.value;
  errors.value.phone2 = ''
};

const onInputChange = (field, event) => {
  const value = event.target.value;
  if (value) {
    errors.value[field] = ''; // Clear error on input
  } else {
    validateStep()
  }
};

const handleFileChange = (file, field) => {
  form.value[field] = file;
  errors.value[field] = ''
};

const handleFileRemove = (field) => {
  form.value[field] = null;
};

const goToStep = (stepId) => {
  if (validateStep()) {
    currentStep.value = steps.value.find(step => step.id === stepId);
  } else {
    console.log('Validation failed:', errors.value);
  }
};

const cancelForm = () => {
  useRouter().push('/en/organization');
};

const closeModal = () => {
  showModal.value = false;
  useRouter().push('/en/organization');
};

const fetchCountries = async () => {
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get('countries');  // Replace with your API endpoint
    countries.value = response.data.data.countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

const fetchCities = async () => {
  errors.value.nationalityId = ''
  const { $axios } = useNuxtApp();
  if (!form.value.nationalityId) return;
  try {
    const response = await $axios.get(`cities/${form.value.nationalityId}`); // Replace with actual API
    cities.value = response.data.data.cities;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
};

async function fetchOrganization() {
  const token = localStorage.getItem('authToken'); // Get the token from localStorage
  const { $axios } = useNuxtApp();
  try {
    const response = await $axios.get('organizations', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    org.value = response.data.data.organization; // Assuming the data is inside the `data.organization`

    if (org.value !== null) {
      if (org.value.status === 'Approved') {
        // Redirect to edit page
        useRouter().push('/en/organization/edit');
      } else {
        // Redirect to organization page
        useRouter().push('/en/organization');
      }
    }

    const organization = org.value;
    // Populate the form with the organization's details
    form.value.name = organization.name;
    form.value.commercialName = organization.commercial_Name;
    form.value.abbreviation = organization.abbreviation;
    form.value.nameTag = organization.name_tag;
    form.value.commercialId = organization.commercial_rgistryID;
    form.value.commercialExpiration = organization.commercial_registry_expiration;
    form.value.taxExpiration = organization.tax_registry_expiration;
    form.value.email = organization.email;
    form.value.establishDate = organization.establish_date;
    form.value.zip = organization.zip;
    form.value.phone1 = organization.Phone1;
    form.value.phone2 = organization.Phone2;
    form.value.whatsapp = organization.WhatsApp;
    form.value.headOfficeAddress = organization.head_office_address;
    form.value.websiteUrl = organization.website;
    form.value.cityId = organization.city_id;
    form.value.nationalityId = organization.nationality_country_Id;
    form.value.classificationCode = organization.org_classification_id;
    form.value.iban = organization.iban;
    form.value.swiftCode = organization.swift_code;
    form.value.bank = organization.bank;
    form.value.bankAccount = organization.account_number;
    form.value.membershipNumber = organization.membership_number;
    form.value.publishingLicense = organization.publishing_license_number;
    form.value.publishingLicenseExpiration = organization.publishing_license_expiration;
    organization_id.value = organization.id;
    org_status.value = organization.status;

    // Trigger fetching cities based on the selected nationalityId
    await fetchCities();
  } catch (error) {
    console.error('Error fetching organization data:', error);
  }
}

async function submitForm() {
  if (validateStep()) {
    loading.value = true
    const { $axios } = useNuxtApp();
    // Create FormData to handle both form fields and file uploads
    const formData = new FormData();
    formData.append('name', form.value.name);
    formData.append('commercial_Name', form.value.commercialName);
    formData.append('commercial_rgistryID', form.value.commercialId);
    formData.append('commercial_registry_expiration', form.value.commercialExpiration);
    formData.append('email', form.value.email);
    formData.append('zip', form.value.zip);
    formData.append('Phone1', form.value.phone1);
    formData.append('Phone2', form.value.phone2);
    formData.append('city_id', form.value.cityId);
    formData.append('nationality_country_Id', form.value.nationalityId);
    formData.append('iban', form.value.iban);
    formData.append('swift_code', form.value.swiftCode);
    formData.append('bank', form.value.bank);
    formData.append('account_number', form.value.bankAccount);
    formData.append('publishing_license_number', form.value.publishingLicense);
    formData.append('publishing_license_expiration', form.value.publishingLicenseExpiration);

    // Add files (if available)
    if (form.value.companyLogo) {
      formData.append('company_logo', form.value.companyLogo);
    }
    if (form.value.commercialFile) {
      formData.append('commercial_registry_file', form.value.commercialFile);
    }
    if (form.value.publishingFile) {
      formData.append('publishing_file', form.value.publishingFile);
    }

    // Retrieve the Bearer token from localStorage
    const token = localStorage.getItem('authToken');

    try {
      // Send form data with authorization token
      const response = await $axios.post('organizations', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      org_status.value = response.data.data.status;
      // if (org_status.value === 'Approved') {
      //   goToStep(2);
      // }
      // alert(org_status.value);
      console.log('Form submitted successfully:', response.data);
      showModal.value = true;
    } catch (error) {
      console.error('Error submitting form:', error.response || error.message);
      if (error.response && error.response.data) {
        Object.keys(error.response.data.errors).forEach((key) => {
          errors.value[key] = error.response.data.errors[key][0]; // Get the first error message
        });
      }
    }
    loading.value = false
  }
}

onMounted(async () => {
  await fetchCountries();
  await fetchOrganization();
});

function validateStep() {
  // Clear previous errors
  errors.value = {};
  
  // Check required fields based on the current step
  if (currentStep.value.id === 1) {
    // Validate Step 1 Fields
    const requiredFields = [
      'name',
      'commercialName',
      'commercialId',
      'commercialExpiration',
      'email',
      'zip',
      'phone1',
      'phone2',
      'nationalityId',
      'cityId',
      'publishingLicense',
      'publishingLicenseExpiration',
    ];
    
    requiredFields.forEach(field => {
      if (!form.value[field]) {
        errors.value[field] = `${field} is required`;
      }
    });
  } else if (currentStep.value.id === 2) {
    // Validate Step 2 Fields
    const requiredFields = [
      'companyLogo',
      'commercialFile',
      'publishingFile',
    ];
    
    requiredFields.forEach(field => {
      if (!form.value[field]) {
        errors.value[field] = `${field} is required`;
      }
    });
  } else if (currentStep.value.id === 3) {
    // Validate Step 2 Fields
    const requiredFields = [
      'iban',
      'swiftCode',
      'bank',
      'bankAccount',
    ];
    
    requiredFields.forEach(field => {
      if (!form.value[field]) {
        errors.value[field] = `${field} is required`;
      }
    });
  }

  return Object.keys(errors.value).length === 0; // Return true if no errors
}

function getErrorMessage(field) {
  return errors.value[field] || '';
}
</script>

<style scoped>


.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 400px;
  text-align: center;
  border-radius: 10px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}

.close-btn {
  background-color: #005076;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.close-btn:hover {
  background-color: #003d59;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.column {
  flex: 1;
  min-width: 200px;
  margin-right: 15px;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

input[type="text"],
input[type="email"],
input[type="date"],
select {
  width: 100%;
  padding: 10px 8px;
  border: 1px solid #ececec;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #e2e6ea;
  color: #495057;
  border: none;
  margin-right: 10px;
  width: 150px;
}

.cancel-btn:hover {
  background-color: #d1d5d9;
}

.next-btn {
  background-color: #005076;
  color: #fff;
  border: none;
  width: 150px;
}

.next-btn:hover {
  background-color: #003d59;
}

.steps-container {
  display: flex;
  /* justify-content: space-between; */
  background: #FFFFFF;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  padding: 1rem 5rem;
}

.steps-container div {
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.steps-container div.active span.number {
  color: #FFFFFF;
  background: #005076;
}

.steps-container span.number {
  background: #EDEDED;
  padding: 1rem;
  color: #005076;
  border-radius: 100px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  font-weight: 600;
}

.steps-container span.title {
  margin: 0 1rem;
  font-weight: 600;
}

.steps-container span.spacer {
  font-weight: 600;
}

.upload-container {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input[type="file"] {
  display: block;
  margin-bottom: 15px;
}

.error-message {
  color: red;
  font-size: 11px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0rem;
}

.back-btn,
.submit-btn {
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 10px;
}

.submit-btn {
  background-color: #005076;
  color: #fff;
}

.back-btn {
  background-color: #e2e6ea;
  color: #495057;
}

.books-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.books-table th,
.books-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.books-table th {
  background-color: #f2f2f2;
}

.no-books-message {
  margin-top: 20px;
  color: #ff0000;
}

/* Modal background styling */
.modal2 {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal content styling */
.modal-content2 {
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 100%;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}

/* Modal header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5em;
  font-weight: 600;
  color: #333;
}

/* Close button styling */
.close-btn {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #999;
}

.close-btn:hover {
  color: #555;
}

/* Modal body */
.modal-body {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Form group styling */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 1em;
  margin-bottom: 5px;
  color: #333;
}

.form-group input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  transition: border 0.3s ease;
}

.form-group input:focus {
  border: 1px solid #3b82f6;
  outline: none;
}

/* Modal footer with buttons */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn {
  padding: 10px 20px;
  font-size: 1em;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-save {
  background-color: #3b82f6;
  color: #fff;
  border: none;
}

.btn-save:hover {
  background-color: #2563eb;
}

.btn-cancel {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

.btn-cancel:hover {
  background-color: #e5e5e5;
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }


  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.autocomplete-container {
  position: relative;
  width: 100%;
}

/* Input field styling */
.autocomplete-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  outline: none;
  transition: border-color 0.3s ease;
}

.autocomplete-input:focus {
  border-color: #3b82f6;
}

/* Suggestions list styling */
.suggestions-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 999;
  list-style-type: none;
  padding: 0;
  margin: 5px 0 0;
}

/* Individual suggestion item */
.suggestions-list li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.suggestions-list li:hover,
.suggestions-list li.highlighted {
  background-color: #f3f4f6;
}

.add-book-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-book-btn:hover {
  background-color: #2563eb;
}

/* Disable button when no book is selected */
.add-book-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.backBtn {
  display: flex;
  align-items: center;
  padding: 2rem 4rem;
}

.backBtn i.icon {
  padding: 10px;
  cursor: pointer;
}

.backBtn span.title {
  font-weight: 600;
}

.form-body {
  margin: 2rem 5rem;
  background: #ffffff;
  padding: 1.4rem;
  border: 1px solid #EDEDED;
  border-radius: 10px;
}


</style>
