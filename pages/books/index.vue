<template>
  <div class="">
    <div class="flex justify-between items-center mb-10">
      <p class="font-medium text-blue10 text-xl capitalize">{{ $t('books') }}</p>
      <Button v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && !showUpload" :label="$t('uploadBooks')" icon="pi pi-upload" class="bg-primary text-base h-42 px-3" @click="toggleUpload"/>
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
          <Button v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && showUpload" :label="$t('uploadBooks')" icon="pi pi-upload" class="bg-primary text-base h-42 px-3 mx-5" @click="submitBookFile"/>
        </div>
      </div>
    </div>
    <div class="form-body">
        <table v-if="orgStore.organization && orgStore.books?.length" class="min-w-full table-auto border-collapse text-left bg-white shadow-md rounded-md overflow-hidden">
          <thead class="bg-gray-50">
            <tr class="bg-primary">
              <th class="px-4 py-2 border-b text-white font-medium">RDMK</th>
              <th class="px-4 py-2 border-b text-white font-medium">Title</th>
              <th class="px-4 py-2 border-b text-white font-medium">Author</th>
              <th class="px-4 py-2 border-b text-white font-medium">Issue Date</th>
              <th class="px-4 py-2 border-b text-white font-medium">Language</th>
              <th class="px-4 py-2 border-b text-white font-medium">Status</th>
              <th class="px-4 py-2 border-b text-white font-medium">Quantity</th>
              <th class="px-4 py-2 border-b text-white font-medium">Price</th>
              <th class="px-4 py-2 border-b text-white font-medium">Bar Code</th>
              <th class="px-4 py-2 border-b text-white font-medium">Action</th> <!-- New Action Column -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(book, index) in orgStore.books" :key="index" class="hover:bg-gray-50">
              <td class="px-4 py-2 border-b">{{ book.rdmk }}</td>
              <td class="px-4 py-2 border-b">{{ book.title }}</td>
              <td class="px-4 py-2 border-b">{{ book.author }}</td>
              <td class="px-4 py-2 border-b">{{ book.issue_date }}</td>
              <td class="px-4 py-2 border-b">{{ book.book_language }}</td>
              <td class="px-4 py-2 border-b">
                <span
                  :class="{
                    'bg-yellow-100 text-yellow-800': book.status_name === 'Pending',
                    'bg-green-100 text-green-800': book.status_name === 'Approved',
                    'bg-red-100 text-red-800': book.status_name === 'Rejected'
                  }"
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                >
                  {{ book.status_name }}
                </span>
              </td>
              <td class="px-4 py-2 border-b">{{ book.quantity }}</td>
              <td class="px-4 py-2 border-b">{{ book.price }}</td>
              <td class="px-4 py-2 border-b">{{ book.barcode }}</td>
              <td class="px-4 py-2 border-b">
                <button v-if="book.status_name == 'Approved'" @click="openEditModal(book)" class="text-blue-500 hover:text-blue-700 font-semibold">Edit</button> <!-- New Edit Button -->
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="!orgStore.books?.length" class="no-books-message">
          No books found. Please upload a book list or try again later.
        </div>
      </div>
    <!-- <DataTable v-else :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
      <Column field="rdmk" :header="$t('RDMK')"></Column>
      <Column field="title" :header="$t('title')"></Column>
      <Column field="author" :header='$t("Writer name")'></Column>
      <Column field="author_nationality" :header='$t("Nationality")'></Column>
      <Column field="publisher_name" :header='$t("Publishing")'></Column>
      <Column field="book_language" :header='$t("book_language")'></Column>
      <Column field="issue_date" :header='$t("issue_date")'></Column>
      <Column field="actions" :header="$t('action')" style="width: 10rem">
        <template #body="slotProps">
          <div class="flex justify-center">

            <Button type="button" text class="text-blue3" icon="pi pi-ellipsis-h" @click="toggle($event, slotProps.data.id)" aria-haspopup="true" aria-controls="overlay_menu" />
            <Menu ref="menu" :model="actionsMenu" class="bg-white" id="overlay_menu" :popup="true" />
          </div>
        </template>
      </Column>
    </DataTable> -->
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
    <div class="modal-content">
      <!-- Modal Header -->
      <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200">
        <h3 class="text-lg font-semibold">Edit Book</h3>
        <button class="text-gray-500 hover:text-gray-700" @click="closeEditModal">&times;</button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-4">
        <div class="mb-4">
          <label for="quantity" class="block text-sm font-medium text-gray-700">Quantity:</label>
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
// const addEditInterest = defineAsyncComponent(() => import('./add-edit-book.vue'));
import Form from './add-edit-book.vue'
import { fetchApi } from '../../composables/useApi';
import { useOrganizationStore } from '../../store/auth';
import { onMounted, ref } from 'vue';

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const orgStore = useOrganizationStore();

const menu = ref();
const selectedId = ref();

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);

let showEditModal = ref(false);
let showModal2 = ref(false);
let showUpload = ref(false);
let bookFile = ref(null);
let fileError = ref('');
let editBook = ref(null);

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const { pending, data, refresh } = fetchApi(`get_books_by_organization/${orgStore.organization?.id}`, {
  limit: perPage,
  page: currentPage
});

onMounted(() => {
  
})

const actionsMenu = computed(() => [
  {
    type: 'edit',
    label: t('edit'),
    icon: 'pi pi-pencil',
    command: () => {
      visible.value = true;
    }
  },
  {
    type: 'approve',
    label: t('Approve'),
    icon: 'pi pi-check',
    command: () => {
      approve();
    }
  },
  {
    type: 'reject',
    label: t('Reject'),
    icon: 'pi pi-times',
    command: () => {
      reject();
    }
  },

  {
    type: 'delete',
    label: t('delete'),
    icon: 'pi pi-trash',
    command: () => {
      deleteConfirm();
    }
  }
]);

const toggleUpload = () => {
  showUpload.value = !showUpload.value
  bookFile.value = null
  fileError.value = ''
};

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
  editBook.value = book;
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

const openModal = () => {
  selectedId.value = null;
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

const deleteConfirm = () => {
  confirm.require({
    message: t('deleteConfirm'),
    header: t('delete'),
    rejectClass: 'p-button-text p-button-text bg-primary',
    acceptClass: 'p-button-danger p-button-text bg-red-500 text-white',
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
    accept: () => {
      use$Fetch(`books/${selectedId.value}`, { method: 'DELETE' }).then(() => {

        refresh();
        toast.add({ severity: 'info', summary: t('common.confirmed'), detail: t('common.doneDeleted'), life: 3000 });
      })
    },

    reject: () => {}
  });
};

const reject = () => {
  confirm.require({
    message: t('Do you want to Reject this book?'),
    header: t('Reject'),
    rejectClass: 'p-button-text p-button-text bg-primary',
    acceptClass: 'p-button-danger p-button-text bg-red-500 text-white',
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
    accept: async () => {
      try {

        await    use$Fetch(`review-books`,{ method:  'POST', body: {'book_id':selectedId.value,'block':1} });
        refresh();
        toast.add({ severity: 'info', summary: t('confirmed'), detail: t('doneUpdated'), life: 3000 });
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
      }
    },
    reject: () => {}
  });
};
const approve = () => {
  try {

     use$Fetch(`review-books`,{ method:  'POST', body: {'book_id':selectedId.value,'block':0} });

    refresh();
    toast.add({ severity: 'info', summary: t('confirmed'), detail: t('doneUpdated'), life: 3000 });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  }
};

await orgStore.fetchOrganization();
await orgStore.fetchBooks();
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
