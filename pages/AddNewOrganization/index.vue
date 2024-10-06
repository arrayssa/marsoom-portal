<template>
  <div class="form-container">
    <div class="progress-container">
      <div class="step" v-for="step in steps" :key="step" :class="{ active: currentStep >= step.number }">
        <div class="step-number" @click="goToStep(step.number)">{{ step.number }}</div>
        <div class="step-label" @click="goToStep(step.number)">{{ step.label }}</div>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progressWidth }"></div>
      </div>
    </div>



    <div v-if="currentStep === 1">
      <form @submit.prevent="submitForm" v-if="currentStep === 1">
        <!-- Row 1 -->
        <div class="row">
          <div class="column form-group">
            <label for="name">Name</label>
            <input v-model="form.name" id="name" type="text" placeholder="Enter Name" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="commercialName">Commercial Name</label>
            <input v-model="form.commercialName" id="commercialName" type="text" class="form-control"
              placeholder="Enter Commercial Name" />
          </div>
          <div class="column form-group">
            <label for="abbreviation">Abbreviation</label>
            <input v-model="form.abbreviation" id="abbreviation" type="text" class="form-control"
              placeholder="Enter Abbreviation" />
          </div>
          <div class="column form-group" v-if="false">
            <label for="nameTag">Name Tag</label>
            <input v-model="form.nameTag" id="nameTag" type="text" class="form-control" placeholder="Enter Name Tag" />
          </div>
        </div>

        <!-- Row 2 -->
        <div class="row">
          <div class="column form-group">
            <label for="commercialId">Commercial ID</label>
            <input v-model="form.commercialId" id="commercialId" type="number" class="form-control"
              placeholder="Enter ID" />
          </div>
          <div class="column form-group">
            <label for="commercialExpiration">Commercial Expiration</label>
            <input v-model="form.commercialExpiration" id="commercialExpiration" type="date" class="form-control" />
          </div>
          <div class="column form-group" v-if="false">
            <label for="taxExpiration">Tax Expiration</label>
            <input v-model="form.taxExpiration" id="taxExpiration" type="date" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="email">Email</label>
            <input v-model="form.email" id="email" type="email" placeholder="Enter Email" class="form-control" />
          </div>
        </div>

        <!-- Row 3 -->
        <div class="row">
          <div class="column form-group" v-if="false">
            <label for="establishDate">Establish Date</label>
            <input v-model="form.establishDate" id="establishDate" type="date" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="zip">Zip</label>
            <input v-model="form.zip" id="zip" type="text" placeholder="Enter Zip" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="phone1">Phone 1</label>
            <vue-tel-input v-model="form.phone1" id="phone2" placeholder="Enter Phone Number"
              :preferred-countries="['eg']" />

          </div>
          <div class="column form-group">
            <label for="phone2">Phone 2</label>

            <vue-tel-input v-model="form.phone2" id="phone2" placeholder="Enter Phone Number"
              :preferred-countries="['eg']" />
          </div>
        </div>

        <!-- Row 4 -->
        <div class="row">
          <div class="column form-group" v-if="false">
            <label for="whatsapp">WhatsApp</label>
            <input v-model="form.whatsapp" id="whatsapp" type="text" placeholder="WhatsApp Number"
              class="form-control" />
          </div>
          <div class="column form-group" v-if="false">
            <label for="headOfficeAddress">Head Office Address</label>
            <input v-model="form.headOfficeAddress" id="headOfficeAddress" type="text" placeholder="Enter Address"
              class="form-control" />
          </div>
          <div class="column form-group">
            <label for="websiteUrl">Website URL</label>
            <input v-model="form.websiteUrl" id="websiteUrl" type="text" placeholder="Enter Website URL"
              class="form-control" />
          </div>
        </div>

        <!-- Row 5 - Dropdowns -->
        <div class="row">

          <div class="column form-group">
            <label for="nationalityId">Country</label>

            <select v-model="form.nationalityId" id="nationalityId" @change="fetchCities" class="form-control">
              <option v-for="country in countries" :key="country.id" :value="country.id">{{ country.name }}</option>
            </select>
          </div>

          <div class="column form-group">
            <label for="cityId">City</label>
            <select v-model="form.cityId" id="cityId" class="form-control">
              <option v-for="city in cities" :key="city.id" :value="city.id">{{ city.name }}</option>
            </select>
          </div>
          <div class="column form-group">
            <label for="classificationCode">Classification Code</label>
            <select v-model="form.classificationCode" id="classificationCode" class="form-control">
              <option v-for="classification in classifications" :key="classification.id" :value="classification.id">
                {{ classification.name }}
              </option>
            </select>
          </div>
        </div>

        <!-- File Uploads -->
        <h3>Upload Files</h3>
        <div class="row">
          <div class="column form-group">
            <label>Upload Company Logo</label>
            <input type="file" class="form-control" @change="handleFileUpload($event, 'companyLogo')" />
          </div>
          <div class="column form-group">
            <label>Commercial File</label>
            <input type="file" class="form-control" @change="handleFileUpload($event, 'commercialFile')" />
          </div>
          <div class="column form-group">
            <label>Publishing File</label>
            <input type="file" class="form-control" @change="handleFileUpload($event, 'publishingFile')" />
          </div>
        </div>
        <div class="row">
          <div class="column form-group">
            <label for="iban">IBAN</label>
            <input v-model="form.iban" id="iban" type="text" placeholder="Enter IBAN" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="swiftCode">Swift Code</label>
            <input v-model="form.swiftCode" id="swiftCode" type="text" placeholder="Enter Swift Code"
              class="form-control" />
          </div>
          <div class="column form-group">
            <label for="bank">Bank</label>
            <input v-model="form.bank" id="bank" type="text" placeholder="Enter Bank" class="form-control" />
          </div>
          <div class="column form-group">
            <label for="bankAccount">Bank Account</label>
            <input v-model="form.bankAccount" id="bankAccount" type="text" placeholder="Enter Bank Account"
              class="form-control" />
          </div>
        </div>

        <div class="row">
          <div class="column form-group" v-if="false">
            <label for="membershipNumber">Membership Number</label>
            <input v-model="form.membershipNumber" id="membershipNumber" type="text" class="form-control"
              placeholder="Enter Membership Number" />
          </div>
          <div class="column form-group">
            <label for="publishingLicense">Publishing License</label>
            <input v-model="form.publishingLicense" id="publishingLicense" type="text" class="form-control"
              placeholder="Enter Publishing License" />
          </div>
          <div class="column form-group">
            <label for="publishingLicenseExpiration">Publishing License Expiration</label>
            <input v-model="form.publishingLicenseExpiration" id="publishingLicenseExpiration" type="date"
              class="form-control" />
          </div>
        </div>

        <!-- Submit Button -->
        <div class="button-row">
          <button type="button" class="cancel-btn" @click="cancelForm">Cancel</button>





          <div>
            <!-- Button shown when org_status is not 'Approved' -->
            <button v-if="org_status !== 'Approved'" type="submit" class="next-btn">
              send request
            </button>

            <!-- Button shown when org_status is 'Approved' -->
            <button v-else type="button" class="next-btn" @click="goToStep(2)">

              Next Step
            </button>
          </div>

        </div>

      </form>
      <div v-show="false" class="autocomplete-container" v-if="org_status == 'Approved' && !org.employee">
        <label for="search">Search Employee (by name, email or phone:</label>
        <input type="text" id="search" v-model="searchQuery" @input="fetchSuggestions"
          @keydown.down="highlightSuggestion(1)" @keydown.up="highlightSuggestion(-1)" @keydown.enter="selectSuggestion"
          placeholder="Start typing the book title..." class="autocomplete-input" />

        <!-- Suggestions Dropdown -->
        <ul v-if="suggestions.length" class="suggestions-list">
          <li v-for="(suggestion, index) in suggestions" :key="index"
            :class="{ 'highlighted': index === selectedIndex }" @click="selectSuggestion(index)"
            @mouseover="highlightIndex(index)">
            {{ suggestion.first_name }} {{ suggestion.last_name }}
          </li>
        </ul>

        <button v-if="search_id" @click="addSelectedEmployee" class="add-book-btn">
          Add Employee
        </button>
      </div>
    </div>

    <div v-if="currentStep === 2 && org_status == 'Approved'" class="upload-section">
      <h2>Upload Book List</h2>

      <div class="file-upload-container">
        <div v-if="fileError" class="error-message my-5">{{ fileError }}</div>

        <!-- Custom File Upload Button -->
        <label for="bookFile" class="custom-file-upload">
          <input type="file" id="bookFile" @change="handleFileUploadExcel($event, 'bookFile')" accept=".xlsx"
            class="hidden-file-input" />
          <span>Select File</span>
        </label>

      </div>

      <!-- Demo file download -->

      <div class="download-demo">
        <a href="../../assets/demo.xlsx" class="demo-link" download>Download Demo Excel File</a>
      </div>

      <div class="button-row">
        <button type="button" class="back-btn" @click="goToStep(1)">Back</button>
        <button type="button" class="submit-btn" @click="submitBookFile">Submit Book List</button>
      </div>

      <h3>Books List</h3>
      <table v-if="books && books.length" class="books-table">
        <thead>
          <tr>
            <th>RDMK</th>
            <th>Title</th>
            <th>Author</th>
            <th>Issue Date</th>
            <th>Language</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Bar Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(book, index) in books" :key="index">
            <td>{{ book.rdmk }}</td>
            <td>{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td>{{ book.issue_date }}</td>
            <td>{{ book.book_language }}</td>
            <td>{{ book.quantity }}</td>
            <td>{{ book.price }}</td>
            <td>{{ book.barcode }}</td>
            <td>{{ book.status_name }}</td>
            <td>
              <button v-if="book.status_name == 'Approved'" @click="openEditModal(book)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!books.length" class="no-books-message">
        No books found. Please upload a book list or try again later.
      </div>

      <!-- Edit Book Modal -->
      <div v-if="showEditModal" class="modal2">
        <div class="modal-content2">
          <div class="modal-header">
            <h3>Edit Book</h3>
            <button class="close-btn" @click="closeEditModal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="quantity">Quantity:</label>
              <input type="number" v-model="editBook.quantity" id="quantity" />
            </div>

            <div class="form-group">
              <label for="price">Price:</label>
              <input type="number" v-model="editBook.price" id="price" />
            </div>

            <div class="form-group">
              <label for="barcode">Barcode:</label>
              <input type="text" v-model="editBook.barcode" id="barcode" />
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-save" @click="saveChanges">Save</button>
            <button class="btn btn-cancel" @click="closeEditModal">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="closeModal">&times;</span>
          <h3>File Submitted Successfully!</h3>
          <button @click="closeModal" class="close-btn">Close</button>
        </div>
      </div>

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

    <div v-if="showModal2" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Form Submitted Successfully!</h3>
        <p>Your book list have been uploaded.</p>
        <p>Please wait for admin approval to Your book list.</p>

        <button @click="closeModal" class="close-btn">Close</button>
      </div>
    </div>
  </div>

  <!-- Submit Button -->

</template>
<script>
import VueTelInput from 'vue-tel-input';

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
      currentStep: 1,
      steps: [
        { number: 1, label: 'Add Organization' },
        { number: 2, label: 'Books' }
      ],
      fileError: '',
      showModal: false,
      showModal2: false,
      org: null,

      org_status: '',
      organization_id: '',

      countries: [],
      cities: [],
      classifications: [],
      searchQuery: '',
      search_id: '',

      suggestions: [],
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
    await this.fetchBooks();

  },
  methods: {
    nextStep() {
      if (this.currentStep < 3) {

        this.goToStep(this.currentStep++);

      }
    },
    goToStep(step) {
      console.log(this.org_status);
      if (this.org_status != 'Approved') {
        this.currentStep = 1;
        return;
      }

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
      formData.append('name', this.form.name);
      formData.append('commercial_Name', this.form.commercialName);
      formData.append('abbreviation', this.form.abbreviation);
      formData.append('name_tag', this.form.nameTag);
      formData.append('commercial_registry_id', this.form.commercialId);
      formData.append('commercial_registry_expiration', this.form.commercialExpiration);
      formData.append('tax_registry_expiration', this.form.taxExpiration);
      formData.append('email', this.form.email);
      formData.append('establish_date', this.form.establishDate);
      formData.append('zip', this.form.zip);
      formData.append('Phone1', this.form.phone1);
      formData.append('Phone2', this.form.phone2);
      formData.append('WhatsApp', this.form.whatsapp);
      formData.append('head_office_address', this.form.headOfficeAddress);
      formData.append('website', this.form.websiteUrl);
      formData.append('city_id', this.form.cityId);
      formData.append('nationality_country_Id', this.form.nationalityId);
      formData.append('org_classification_id', this.form.classificationCode);
      formData.append('iban', this.form.iban);
      formData.append('swift_code', this.form.swiftCode);
      formData.append('bank', this.form.bank);
      formData.append('account_number', this.form.bankAccount);
      formData.append('membership_number', this.form.membershipNumber);
      formData.append('publishing_license_number', this.form.publishingLicense);
      formData.append('publishing_license_expiration', this.form.publishingLicenseExpiration);

      // Add files (if available)
      if (this.form.companyLogo) {
        formData.append('company_logo', this.form.companyLogo);
      }
      if (this.form.commercialFile) {
        formData.append('commercial_registry_file', this.form.commercialFile);
      }
      if (this.form.publishingFile) {
        formData.append('publishing_file', this.form.publishingFile);
      }

      // Retrieve the Bearer token from localStorage
      const token = localStorage.getItem('authToken');

      try {
        // Send form data with authorization token
        const response = await $axios.post('organizations', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.org_status = response.data.data.status;
        if (this.org_status == 'Approved') {
          this.goToStep(2);
        }
        // alert(this.org_status);
        console.log('Form submitted successfully:', response.data);
        this.showModal = true;
      } catch (error) {
        console.error('Error submitting form:', error.response || error.message);
      }
    },
    handleFileUploadExcel(event, field) {
      const file = event.target.files[0];
      if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        this.form[field] = file; // Assign the file to the form field
        this.fileError = ''; // Clear any previous errors
      } else {
        this.fileError = "Please upload a valid Excel file (.xlsx)";
      }
    },
    async fetchBooks() {
      // Use Nuxt.js $axios for making the API call
      const { $axios } = useNuxtApp();
      const token = localStorage.getItem('authToken'); // Get the token from localStorage

      try {
        const response = await $axios.get('get_books_by_organization/' + this.organization_id, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.books = response.data.data.books; // Set the response data to books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },

    async submitBookFile() {
      const { $axios } = useNuxtApp();

      if (!this.form.bookFile) {
        this.fileError = "Please upload an Excel file before submitting.";
        return;
      }

      const formData = new FormData();
      formData.append('file', this.form.bookFile);
      formData.append('organization_id', this.organization_id);

      try {
        const token = localStorage.getItem('authToken');
        const response = await $axios.post('import_books', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });

        this.showModal2 = true;
        this.fileError = "Book file submitted successfully";
        console.log('Book file submitted successfully:', response.data);
      } catch (error) {
        // Check if error response exists and has validation errors
        if (error.response && error.response.status === 422 && error.response.data.errors) {
          const errors = error.response.data.errors;

          // If file validation error exists, display it
          if (errors.file) {
            this.fileError = errors.file.join(', ');
          } else {
            this.fileError = "An unknown error occurred.";
          }
        } else {
          // Display general error if not validation-related
          this.fileError = error.message || "Error submitting book file.";
        }

        console.error('Error submitting book file:', error.response || error.message);
      }
    },
    cancelForm() {
      console.log('Form canceled');
    },
    handleFileUpload(event, field) {
      this.form[field] = event.target.files[0];
    },
    closeModal() {
      // Close the modal
      this.showModal = false;
      this.showModal2 = false;

    },
    openEditModal(book) {
      this.showEditModal = true;
      // Create a copy of the book to edit, so original data remains unchanged until saved
      this.editBook = { ...book };
      this.originalBook = book; // Store a reference to the original book
    },
    closeEditModal() {
      this.showEditModal = false;
      this.editBook = {};
    },
    saveChanges() {
      // Update the original book with the edited values
      this.originalBook.quantity = this.editBook.quantity;
      this.originalBook.price = this.editBook.price;
      this.originalBook.barcode = this.editBook.barcode;
      const token = localStorage.getItem('authToken');

      // Close the modal after saving changes

      // You could also send the updated book data to the backend here, using $axios.put or $axios.post if needed
      // Example:
      const { $axios } = useNuxtApp();
      $axios.post(`books_update_quantity/${this.originalBook.id}`, this.originalBook, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          console.log('Book updated successfully');
        })
        .catch(error => {
          console.error('Error updating book:', error);
        });
      this.closeEditModal();

    },
    async fetchSuggestions() {
      if (this.searchQuery.length < 3) {
        this.suggestions = [];
        return;
      }
      try {
        // Simulating API call to fetch books that match search query
        const { $axios } = useNuxtApp();
        const token = localStorage.getItem('authToken');
        const response = await $axios.get(`employee_search?search=${this.searchQuery}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          }
        });

        this.suggestions = response.data.data.persons; // Assuming the API returns a list of book suggestions
        this.search_id = '';
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    },
    highlightSuggestion(direction) {
      if (!this.suggestions.length) return;
      const total = this.suggestions.length;
      this.selectedIndex = (this.selectedIndex + direction + total) % total; // Circular navigation
    },
    highlightIndex(index) {
      this.selectedIndex = index;
    },
    selectSuggestion(index = this.selectedIndex) {
      if (index >= 0 && index < this.suggestions.length) {
        this.searchQuery = this.suggestions[index].first_name + ' ' + this.suggestions[index].last_name;
        this.search_id = this.suggestions[index].id;

        this.suggestions = [];
      }
    },
    async addSelectedEmployee() {
      if (this.search_id) {
        try {
          const { $axios } = useNuxtApp();
          // Simulate API call to add the selected book
          this.add_employee.employee_id = this.search_id;
          this.add_employee.organization_id = this.organization_id;
          const token = localStorage.getItem('authToken');

          const response = await $axios.post('add_employee', this.add_employee, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Add the selected book to the local books array

          // Clear the search input and selected book
          this.searchQuery = '';
          this.search_id = null;

          alert('Employee added successfully! please wait for his acceptance');
        } catch (error) {
          console.error('Error adding book:', error);
        }
      }
    }

  }
};
</script>

<style scoped>
.form-container {
  padding: 20px;
}

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
}

input[type="text"],
input[type="email"],
input[type="date"],
select,
input[type="file"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.button-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
}

.cancel-btn:hover {
  background-color: #d1d5d9;
}

.next-btn {
  background-color: #005076;
  color: #fff;
  border: none;
}

.next-btn:hover {
  background-color: #003d59;
}

.steps-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.steps-container div {
  padding: 10px 20px;
  background-color: #f1f1f1;
  border-radius: 5px;
  cursor: pointer;
}

.steps-container div.active {
  background-color: #005076;
  color: #fff;
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


.form-container {
  position: relative;
  /* To position child elements relative to this container */
}

.progress-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;

  margin-bottom: 80px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.step-number {
  width: 30px;
  height: 30px;
  background-color: #e0e0e0;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.step-label {
  margin-top: 5px;
}

.step.active .step-number {
  background-color: #4caf50;
}

.progress-bar {
  position: absolute;
  top: 15px;
  /* Adjust to center between steps */
  left: 0;
  width: 100%;
  height: 5px;
  background-color: #e0e0e0;
  z-index: 0;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

.upload-section {
  padding: 20px;
}

.upload-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.upload-container input[type="file"] {
  margin-top: 10px;
}

.button-row {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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
}

.books-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.no-books-message {
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .button-row {
    flex-direction: column;
    align-items: center;
  }

  .books-table,
  .upload-container {
    font-size: 14px;
  }
}

/* Custom file upload styles */
.file-upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-file-upload {
  display: inline-block;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  margin-bottom: 10px;
}

.custom-file-upload:hover {
  background-color: #45a049;
}

.hidden-file-input {
  display: none;
}

.file-name {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.error {
  color: red;
  margin-bottom: 10px;
}

.submit-button {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0b7dda;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
