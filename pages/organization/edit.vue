<template>
  <div class="form-container">
    <div class="steps-container rounded-md border-gray-200">
      <div v-for="(step, index) in steps" :key="index" :class="{ active: currentStep.id === step.id }"
        @click="goToStep(step.id)">
        <span class="number">{{ step.id }}</span>
        <span class="title">{{ step.title }}</span>
        <span class="spacer" v-if="step.id < 3">- -- -- -</span>
      </div>
    </div>
    <div v-if="currentStep.id === 1">
      <form @submit.prevent="goToStep(2)" v-if="currentStep.id === 1">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">
          <p class="text-red-500"><i class="pi pi-ban"></i> Disabled fields cannot be edited!</p>
          <!-- Row 1 -->
          <div class="row">
            <div class="column">
              <label for="name">
                Name
              </label>
              <input v-model="form.name" id="name" type="text" placeholder="Enter Name"
                :disabled="!allowedFields.includes('name')"
                :class="!allowedFields.includes('name') ? 'bg-gray-200 cursor-not-allowed' : ''" />
                <Field 
                  type="text" 
                  v-model="form.name" 
                  id="name" 
                  name="name"
                  :disabled="!allowedFields.includes('name')"
                  :class="!allowedFields.includes('name') ? 'bg-gray-200 cursor-not-allowed' : ''"
                />
                <ErrorMessage name="name" class="text-red-500 text-sm" />
            </div>
            <div class="column">
              <label for="commercialName">Commercial Name</label>
              <input v-model="form.commercialName" id="commercialName" type="text"
                placeholder="Enter Commercial Name" 
                :disabled="!allowedFields.includes('commercialName')"
                :class="!allowedFields.includes('commercialName') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="commercialId">Commercial ID</label>
              <input v-model="form.commercialId" id="commercialId" type="text" placeholder="Enter ID"
                :disabled="!allowedFields.includes('commercialId')"
                :class="!allowedFields.includes('commercialId') ? 'bg-gray-200 cursor-not-allowed' : ''" />
            </div>
            <div class="column">
              <label for="commercialExpiration">Commercial Expiration</label>
              <input v-model="form.commercialExpiration" id="commercialExpiration" type="date"
                :disabled="!allowedFields.includes('commercial_registry_expiration')"
                :class="!allowedFields.includes('commercial_registry_expiration') ? 'bg-gray-200 cursor-not-allowed' : ''" />
            </div>
          </div>

          <!-- Row 2 -->
          <div class="row">
            <div class="column">
              <label for="email">Email</label>
              <input v-model="form.email" id="email" type="email" placeholder="Enter Email"
                :disabled="!allowedFields.includes('email')"
                :class="!allowedFields.includes('email') ? 'bg-gray-200 cursor-not-allowed' : ''" />
            </div>
            <div class="column">
              <label for="zip">Zip</label>
              <input v-model="form.zip" id="zip" type="text" placeholder="Enter Zip"
                :disabled="!allowedFields.includes('zip')"
                :class="!allowedFields.includes('zip') ? 'bg-gray-200 cursor-not-allowed' : ''" />
            </div>
            <div class="column">
              <label for="phone1">Phone 1</label>
              <input v-model="form.phone1" id="phone1" type="text" placeholder="Enter Phone Number" 
                :disabled="!allowedFields.includes('phone1')"
                :class="!allowedFields.includes('phone1') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="phone2">Phone 2</label>
              <input v-model="form.phone2" id="phone2" type="text" placeholder="Enter Phone Number" 
                :disabled="!allowedFields.includes('phone2')"
                :class="!allowedFields.includes('phone2') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
          </div>

          <!-- Row 3 -->
          <div class="row">
            <div class="column">
              <label for="nationalityId">Nationality ID</label>
              <select v-model="form.nationalityId" id="nationalityId" @change="fetchCities"
                :disabled="!allowedFields.includes('nationalityId')"
                :class="!allowedFields.includes('nationalityId') ? 'bg-gray-200 cursor-not-allowed' : ''">
                <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
              </select>
            </div>
            <div class="column">
              <label for="cityId">City ID</label>
              <select v-model="form.cityId" id="cityId"
                :disabled="!allowedFields.includes('cityId')"
                :class="!allowedFields.includes('cityId') ? 'bg-gray-200 cursor-not-allowed' : ''">
                <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
              </select>
            </div>
            <div class="column">
              <label for="publishingLicense">Publishing License</label>
              <input v-model="form.publishingLicense" id="publishingLicense" type="text"
                placeholder="Enter Publishing License" 
                :disabled="!allowedFields.includes('publishingLicense')"
                :class="!allowedFields.includes('publishingLicense') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="publishingLicenseExpiration">Publishing License Expiration</label>
              <input v-model="form.publishingLicenseExpiration" id="publishingLicenseExpiration" type="date" 
                :disabled="!allowedFields.includes('publishing_license_expiration')"
                :class="!allowedFields.includes('publishing_license_expiration') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
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
      <form @submit.prevent="goToStep(3)" v-if="currentStep.id === 2">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">

          <!-- File Uploads -->
          <div class="row">
            <div class="column">
              <label>Upload Company Logo</label>
              <DropFile field="companyLogo" :fileData="form.companyLogo" @file-changed="handleFileChange"
                @file-removed="handleFileRemove"/>
            </div>
            <div class="column">
              <label>Commercial File</label>
              <DropFile field="commercialFile" :fileData="form.commercialFile" @file-changed="handleFileChange"
                @file-removed="handleFileRemove"/>
            </div>
            <div class="column">
              <label>Publishing File</label>
              <DropFile field="publishingFile" :fileData="form.publishingFile" @file-changed="handleFileChange"
                @file-removed="handleFileRemove" />
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
      <form @submit.prevent="submitForm" v-if="currentStep.id === 3">
        <div class="block p-10 mt-5 bg-white rounded-md border-gray-200 border">

          <div class="row">
            <div class="column">
              <label for="iban">IBAN</label>
              <input v-model="form.iban" id="iban" type="text" placeholder="Enter IBAN" 
                :disabled="!allowedFields.includes('iban')"
                :class="!allowedFields.includes('iban') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="swiftCode">Swift Code</label>
              <input v-model="form.swiftCode" id="swiftCode" type="text" placeholder="Enter Swift Code" 
                :disabled="!allowedFields.includes('swiftCode')"
                :class="!allowedFields.includes('swiftCode') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="bank">Bank</label>
              <input v-model="form.bank" id="bank" type="text" placeholder="Enter Bank" 
                :disabled="!allowedFields.includes('bank')"
                :class="!allowedFields.includes('bank') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
            <div class="column">
              <label for="bankAccount">Bank Account</label>
              <input v-model="form.bankAccount" id="bankAccount" type="text" placeholder="Enter Bank Account" 
                :disabled="!allowedFields.includes('bankAccount')"
                :class="!allowedFields.includes('bankAccount') ? 'bg-gray-200 cursor-not-allowed' : ''"/>
            </div>
          </div>

        </div>
        <!-- Submit Button -->
        <div class="button-row">
          <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>
          <button type="submit" class="next-btn">Update</button>
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

  <!-- Submit Button -->

</template>
<script>
import DropFile from '../../components/DropFile.vue';

import '~/assets/vue-tel-input.css';

const phone = ref('');
export default {
  data() {
    return {
      form: {
        name: '',
        bookFile: null,
        commercialName: '',
        abbreviation: '',
        nameTag: '',
        commercialId: '',
        commercialExpiration: '',
        taxExpiration: '',
        email: '',
        establishDate: '',
        zip: '',
        phone1: '',
        phone2: '',
        whatsapp: '',
        headOfficeAddress: '',
        websiteUrl: '',
        cityId: '',
        nationalityId: '',
        classificationCode: '',
        companyLogo: null,
        commercialFile: null,
        publishingFile: null,
        iban: '',
        swiftCode: '',
        bank: '',
        bankAccount: '',
        membershipNumber: '',
        publishingLicense: '',
        publishingLicenseExpiration: ''
      },
      books: [], // This will hold the list of books fetched from the API
      showEditModal: false, // Flag to control modal visibility
      editBook: {
        quantity: '',
        price: '',
        barcode: ''
      }, // Object to hold the currently edited book data

      add_employee: {
        employee_id: '',
        organization_id: '',
      }, // Object to hold the currently edited book data
      originalBook: null,
      currentStep: {
        'id': 1,
        'title': 'Critical Informations'
      },
      steps: [
        {
          'id': 1,
          'title': 'Critical Informations'
        },
        {
          'id': 2,
          'title': 'Upload file'
        },
        {
          'id': 3,
          'title': 'Bank account'
        },
      ],
      fileError: '',
      showModal: false,
      showModal2: false,
      org: null,
      org: null,

      org_status: '',
      organization_id: '',

      countries: [],
      cities: [],
      classifications: [],
      searchQuery: '',
      search_id: '',
      allowedFields: [
        'commercial_registry_expiration',
        'company_logo',
        'commercial_registry_file',
        'publishing_file',
        'publishing_license_expiration'
      ],
      selectedIndex: -1, // To keep track of highlighted suggestion

    };
  },
  computed: {
    progressWidth() {
      return `${(this.currentStep / this.steps.length) * 100}%`; // Calculate progress width
    },
  },

  async mounted() {

    // Fetch countries and classifications on component load

    await this.fetchCountries();
    await this.fetchClassifications();
    await this.fetchOrganization();

  },
  methods: {
    nextStep() {
      const currentIndex = this.steps.findIndex(s => s.id === this.currentStep.id);
      const nextStep = this.steps[currentIndex + 1];
      if (this.currentStep.id < 3) {
        this.currentStep = nextStep;
      }
    },
    goToStep(stepId) {
      const step = this.steps.find(s => s.id === stepId);
      if (this.org_status != 'Approved')
        this.currentStep = this.steps[0];
      this.currentStep = step;
    },

    async fetchCountries() {
      const { $axios } = useNuxtApp();

      try {
        const response = await $axios.get('countries');  // Replace with your API endpoint
        this.countries = response.data.data.countries;
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    async fetchCities() {
      const { $axios } = useNuxtApp();

      if (!this.form.nationalityId) return;
      try {
        const response = await $axios.get(`cities/${this.form.nationalityId}`); // Replace with actual API
        this.cities = response.data.data.cities;
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    },
    async fetchClassifications() {
      const { $axios } = useNuxtApp();

      try {
        const response = await $axios.get('classifications'); // Replace with actual API
        this.classifications = response.data.data.classifications;
      } catch (error) {
        console.error('Error fetching classifications:', error);
      }
    },
    async fetchOrganization() {
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem('authToken'); // Get the token from localStorage

      try {
        const response = await $axios.get('organizations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.org = response.data.data.organization; // Assuming the data is inside the `data.organization`
        const organization = this.org;
        // Populate the form with the organization's details
        this.form.name = organization.name;
        this.form.commercialName = organization.commercial_Name;
        this.form.abbreviation = organization.abbreviation;
        this.form.nameTag = organization.name_tag;
        this.form.commercialId = organization.commercial_rgistryID;
        this.form.commercialExpiration = organization.commercial_registry_expiration;
        this.form.taxExpiration = organization.tax_registry_expiration;
        this.form.email = organization.email;
        this.form.establishDate = organization.establish_date;
        this.form.zip = organization.zip;
        this.form.phone1 = organization.Phone1;
        this.form.phone2 = organization.Phone2;
        this.form.whatsapp = organization.WhatsApp;
        this.form.headOfficeAddress = organization.head_office_address;
        this.form.websiteUrl = organization.website;
        this.form.cityId = organization.city_id;
        this.form.nationalityId = organization.nationality_country_Id;
        this.form.classificationCode = organization.org_classification_id;
        this.form.iban = organization.iban;
        this.form.swiftCode = organization.swift_code;
        this.form.bank = organization.bank;
        this.form.bankAccount = organization.account_number;
        this.form.membershipNumber = organization.membership_number;
        this.form.publishingLicense = organization.publishing_license_number;
        this.form.publishingLicenseExpiration = organization.publishing_license_expiration;
        this.organization_id = organization.id;
        this.org_status = organization.status;
        this.org_status = organization.status;

        // Trigger fetching cities based on the selected nationalityId
        await this.fetchCities();
      } catch (error) {
        console.error('Error fetching organization data:', error);
      }
    },
    async submitForm() {
      const { $axios } = useNuxtApp();

      // Create FormData to handle both form fields and file uploads
      const formData = new FormData();
      const appendIfAllowed = (fieldName, value) => {
        if (this.allowedFields.includes(fieldName) && value) {
          formData.append(fieldName, value);
        }
      };

      appendIfAllowed('name', this.form.name);
      appendIfAllowed('commercial_Name', this.form.commercialName);
      appendIfAllowed('abbreviation', this.form.abbreviation);
      appendIfAllowed('name_tag', this.form.nameTag);
      appendIfAllowed('commercial_rgistryID', this.form.commercialId);
      appendIfAllowed('commercial_registry_expiration', this.form.commercialExpiration);
      appendIfAllowed('tax_registry_expiration', this.form.taxExpiration);
      appendIfAllowed('email', this.form.email);
      appendIfAllowed('establish_date', this.form.establishDate);
      appendIfAllowed('zip', this.form.zip);
      appendIfAllowed('Phone1', this.form.phone1);
      appendIfAllowed('Phone2', this.form.phone2);
      appendIfAllowed('WhatsApp', this.form.whatsapp);
      appendIfAllowed('head_office_address', this.form.headOfficeAddress);
      appendIfAllowed('website', this.form.websiteUrl);
      appendIfAllowed('city_id', this.form.cityId);
      appendIfAllowed('nationality_country_Id', this.form.nationalityId);
      appendIfAllowed('org_classification_id', this.form.classificationCode);
      appendIfAllowed('iban', this.form.iban);
      appendIfAllowed('swift_code', this.form.swiftCode);
      appendIfAllowed('bank', this.form.bank);
      appendIfAllowed('account_number', this.form.bankAccount);
      appendIfAllowed('membership_number', this.form.membershipNumber);
      appendIfAllowed('publishing_license_number', this.form.publishingLicense);
      appendIfAllowed('publishing_license_expiration', this.form.publishingLicenseExpiration);

      // Add files (if available)
      if (this.form.companyLogo && this.allowedFields.includes('company_logo')) {
        formData.append('company_logo', this.form.companyLogo);
      }
      if (this.form.commercialFile && this.allowedFields.includes('commercial_registry_file')) {
        formData.append('commercial_registry_file', this.form.commercialFile);
      }
      if (this.form.publishingFile && this.allowedFields.includes('publishing_file')) {
        formData.append('publishing_file', this.form.publishingFile);
      }

      formData.append('_method', 'PUT');

      // Retrieve the Bearer token from localStorage
      const token = localStorage.getItem('authToken');

      try {
        // Send form data with authorization token
        const response = await $axios.post('organizations/' + this.org.id, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.org_status = response.data.data.status;
        console.log('Form submitted successfully:', response.data);
        this.showModal = true;
      } catch (error) {
        console.error('Error submitting form:', error.response || error.message);
      }
    },
    cancelForm() {
      console.log('Form canceled');
      this.$router.push('/en/organization')
    },
    handleFileUpload(event, field) {
      this.form[field] = event.target.files[0];
    },
    closeModal() {
      // Close the modal
      this.showModal = false;
      this.$router.push('/en/organization')
    },

    /* Drop Zone */
    handleFileChange(file, field) {
      this.form[field] = file;
    },
    handleFileRemove(field) {
      this.form[field] = null;
    }

  }
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
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
  margin-bottom: 10px;
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
  font-size: 14px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  padding: 1rem 5rem;
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
