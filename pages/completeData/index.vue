<template>
  <div class="">
    <div class="flex justify-between items-center mb-10">
      <p class="font-medium text-blue10 text-xl capitalize">{{ $t('books') }}</p>
      <Button v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && !showUpload" :label="$t('uploadBooks')" icon="pi pi-upload" class="bg-primary text-base h-42 px-3 text-white" @click="toggleUpload"/>
      <a v-else-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && showUpload"
        href="/assets/demo.xlsx"
        download
        target="_blank"
        rel="noopener noreferrer">
        <Button :label="$t('Download demo excel file')" icon="pi pi-download" class="bg-red-600 text-white text-base h-42 px-3"/>
      </a>
    </div>
    <div class="block h-100 py-10 mb-10 text-center bg-white rounded-md border-gray-200 border" v-if="orgStore.organization !== null && orgStore.organization.status !== 'Approved'">
      <p class="text-red-700">Waiting For administration approval!</p>
    </div>
    <div v-if="showUpload">
      <div class="block p-5 mb-10 bg-white rounded-md border-gray-200 border">
        <div class="upload-container">
          <label for="bookFile">Upload Excel File (.xlsx)</label>
          <DropFile
              field="bookFile"
              :fileData="bookFile"
              @file-changed="handleFileUploadExcel"
              @file-removed="handleFileRemove"
            />
        </div>
        <div v-if="fileError" class="text-red-500">{{ fileError }}</div>
        <div class="flex justify-center mt-5">
          <Button v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && showUpload" :label="$t('cancel')" icon="pi pi-times" class=" bg-slate-100 text-base h-42 px-3" @click="toggleUpload"/>
          <Button v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && showUpload" :label="$t('uploadBooks')" icon="pi pi-upload" class="bg-primary text-base h-42 px-3 mx-5 text-white" @click="submitBookFile"/>
        </div>
      </div>
    </div>
    <DataTable v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved'" :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
      <Column field="rdmk" :header="$t('RDMK')"></Column>
      <Column field="title" :header="$t('title')"></Column>
      <Column field="author" :header='$t("Writer name")'></Column>
      <Column field="issue_date" :header='$t("issue_date")'></Column>
      <Column field="book_language" :header='$t("Language")'></Column>
      <Column field="quantity" :header='$t("Quantity")'></Column>
      <Column field="price" :header='$t("Price")'></Column>
      <Column field="barcode" :header='$t("Barcode")'></Column>
      <Column :header='$t("Is Complete")'>
        <template #body="slotProps">
          <span
            :class="{
              'bg-green-500 text-white px-2 py-1 rounded': isComplete(slotProps.data),
              'bg-red-500 text-white px-2 py-1 rounded': !isComplete(slotProps.data),
            }"
          >
            {{ isComplete(slotProps.data) ? 'Yes' : 'No' }}
          </span>
        </template>
      </Column>
      <Column field="actions" :header="$t('action')">
        <template #body="slotProps">
          <div class="flex justify-center">
            <Button type="button" text :icon="isComplete(slotProps.data) ? 'pi pi-pencil' : 'pi pi-check'" @click="openEditModal(slotProps.data)" :label="isComplete(slotProps.data) ? 'Edit' : 'Complete Data'" />
          </div>
        </template>
      </Column>
    </DataTable>
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
  <div v-if="showEditModal" class="modal">
    <div class="modal-content h-3/4 overflow-hidden">
      <!-- Modal Header -->
      <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h3 class="text-lg font-semibold">{{ isComplete(editBook) ? 'Edit book' : 'Complete data' }}</h3>
        <button class="text-gray-500 hover:text-gray-700" @click="closeEditModal">&times;</button>
      </div>
      
      <!-- Modal Body -->
      <div class="modal-body h-4/5 overflow-auto p-4">
        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">Total Quantity:</label>
          <input 
            type="number" 
            v-model="editBook.quantity" 
            id="quantity" 
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
          <input 
            type="number" 
            v-model="editBook.price" 
            id="price" 
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div class="mb-4">
          <label for="barcode" class="block text-sm font-medium text-gray-700">Barcode:</label>
          <input 
            type="text" 
            v-model="editBook.barcode" 
            id="barcode" 
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        
        <div class="b-4 text-start ">
          <div class="mb-4 border-t py-2" v-for="(pnumber, index) in editBook.packages" :key="index">
            <label :for="'package-' + index" class="block text-sm font-bold underline text-gray-700">Package {{ index + 1 }}:</label>
            <div class="flex justify-between">
              <div class="block w-5/12">
                <label :for="'package-' + index" class="block text-sm font-medium text-gray-700">Number</label>
                <input 
                  type="text" 
                  v-model="pnumber.number" 
                  :id="'package-' + index" 
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div class="block w-5/12">
                <label :for="'quantity-' + index" class="block text-sm font-medium text-gray-700">Quantity</label>
                <input 
                  type="text" 
                  v-model="pnumber.quantity" 
                  :id="'quantity-' + index" 
                  class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <!-- Remove button for package numbers, except the first one -->
            <button 
              v-if="index > 0"
              class="mt-2 text-red-500 hover:text-red-700"
              @click="removeInput(index)"
            >
              Remove
            </button>
          </div>
          <div class="px-4 py-3 border-t border-gray-200 flex justify-center space-x-2">
            <button 
              class="px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
              @click="addNewInput"
            >
              <i class="pi pi-plus"></i>
              Add
            </button>
          </div>
        </div>
      </div>
      
      <!-- Modal Footer -->
      <div class="px-4 py-3 border-t border-gray-200 flex justify-end space-x-2">
        <button 
          class="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
          @click="closeEditModal"
        >
          Cancel
        </button>
        <button 
          class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
          @click="saveChanges"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGetApi } from '../../composables/useApi';
import { useOrganizationStore } from '../../store/auth';
import { onMounted, ref } from 'vue';

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const orgStore = useOrganizationStore();

const menu = ref();
const selectedId = ref();
const selectedBook = ref();

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);

let showEditModal = ref(false);
let showModal2 = ref(false);
let showUpload = ref(false);
let bookFile = ref(null);
let fileError = ref('');
const editBook = ref({
  quantity: 0,
  price: 0,
  barcode: '',
  packages: [{ number: '', quantity: 1 }] // Start with one empty package number
});

const addNewInput = () => {
  editBook.value.packages.push({ number: '', quantity: 1 });
};

const removeInput = (index) => {
  editBook.value.packages.splice(index, 1);
};

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const { pending, data, refresh } = useGetApi(`get_books_by_organization/${orgStore.organization?.id}?status=1`, {
  limit: perPage,
  page: currentPage
});

onMounted(() => {
  
})

const toggleUpload = () => {
  showUpload.value = !showUpload.value
  bookFile.value = null
  fileError.value = ''
};

const isComplete = (item) => {
  return item.price && item.quantity && item.barcode;
}

const submitBookFile = () => {
  const { $axios } = useNuxtApp();

  if (bookFile.value === null) {
    fileError.value = "Please upload an Excel file before submitting.";
    return;
  }

  const formData = new FormData();
  formData.append('file', bookFile.value);
  formData.append('organization_id', orgStore.organization.id);

  try {
    const token = localStorage.getItem('authToken');
    const response = $axios.post('import_books', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    showModal2.value = true;
    fileError.value = "Form submitted successfully";
    console.log('Book file submitted successfully:', response.data);
  } catch (error) {
    // Check if error response exists and has validation errors
    if (error.response && error.response.status === 422 && error.response.data.errors) {
      const errors = error.response.data.errors;

      // If file validation error exists, display it
      if (errors.file) {
        fileError.value = errors.file.join(', ');
      } else {
        fileError.value = "An unknown error occurred.";
      }
    } else {
      // Display general error if not validation-related
      fileError.value = error.message || "Error submitting book file.";
    }

    console.error('Error submitting book file:', error.response || error.message);
  }
}

const openEditModal = (book) => {
  editBook.value = {
    ...book,
    packages: Array.isArray(book.packages) && book.packages.length > 0 ? book.packages : [{ number: '', quantity: 1 }]
  };
  showEditModal.value = true
}

const toggle = (event, id) => {
  menu.value.toggle(event);
  selectedId.value = id;
};

const handleFileUploadExcel = (file, field) => {
  // const file = event.target.files[0];
  if (file && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
    bookFile.value = file; // Assign the file to the form field
    fileError.value = ''; // Clear any previous errors
  } else {
    fileError.value = "Please upload a valid Excel file (.xlsx)";
  }
}

const saveChanges = () => {
  const token = localStorage.getItem('authToken');

  // Close the modal after saving changes

  // You could also send the updated book data to the backend here, using $axios.put or $axios.post if needed
  // Example:
  const { $axios } = useNuxtApp();
  $axios.post(`books_update_quantity/${editBook.value.id}`, editBook.value, {
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
  closeEditModal();

}

const handleFileRemove = () => {
  bookFile.value = null;
}

const openModal = (event, book) => {
  selectedBook.value = book;
  visible.value = true;
}

const closeModal = () => {
  visible.value = false;
  selectedId.value = null;
  showModal2.value = false
  showUpload.value = false
  bookFile.value = null
  fileError.value = ''
  orgStore.fetchBooks();
};

const closeEditModal = () => {
  showEditModal.value = false
  editBook.value = null
  orgStore.fetchBooks();
};

await orgStore.fetchOrganization();
// await orgStore.fetchBooks();
</script>

<style>
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
</style>
