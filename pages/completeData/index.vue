<template>
  <div class="">
    <!-- <div class="flex justify-between items-center mb-10">
      <p class="font-medium text-blue10 text-xl capitalize">{{ $t('books') }}</p>
      <div class="flex justify-end space-x-2" v-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && orgStore.organization.pending_books < 1">
        <Button :disabled="!isButton1Enabled" @click="handleButton1Click" :label="$t('Step1: Complete Data')" class="bg-primary text-base h-42 px-3 text-white"/>
        <Button :disabled="!isButton2Enabled" @click="handleButton2Click" :label="$t('Step2: Warehouse/Pavilion')" icon="pi pi-arrow-right" class="bg-primary text-base h-42 px-3 text-white"/>
        <Button :disabled="!isButton3Enabled" @click="handleButton3Click" :label="$t('Step3: Shippers')" icon="pi pi-check" class="bg-primary text-base h-42 px-3 text-white"/>
      </div>
    </div> -->
    <div class="steps-container flex space-x-4 mb-8 border rounded-md border-gray-200 bg-white p-4">
      <div class="flex items-center p-2 cursor-pointer">
        <span :class="[ 'rounded-full flex h-14 justify-center w-14 p-4 font-bold', currentStep === 1 ? 'bg-primary text-white' : currentStep > 1 ? 'bg-green-500 text-white' : 'bg-gray-300 text-primary']">1</span>
        <span class="font-bold mx-2">Complete Data</span>
        <span class="font-bold">- -- -- -</span>
      </div>
      <div class="flex items-center p-2 cursor-pointer">
        <span :class="[ 'rounded-full flex h-14 justify-center w-14 p-4 font-bold', currentStep === 2 ? 'bg-primary text-white' : currentStep > 2 ? 'bg-green-500 text-white' : 'bg-gray-300 text-primary']">2</span>
        <span class="font-bold mx-2">Warehouse/Pavilion</span>
        <span class="font-bold">- -- -- -</span>
      </div>
      <div class="flex items-center p-2 cursor-pointer">
        <span :class="[ 'rounded-full flex h-14 justify-center w-14 p-4 font-bold', currentStep === 3 ? 'bg-primary text-white' : currentStep > 3 ? 'bg-green-500 text-white' : 'bg-gray-300 text-primary']">3</span>
        <span class="font-bold mx-2">Shippers</span>
      </div>
    </div>
    <div class="block h-100 py-10 mb-10 text-center bg-white rounded-md border-gray-200 border" v-if="orgStore.organization !== null && orgStore.organization.status !== 'Approved'">
      <p class="text-red-700">Waiting For administration approval!</p>
    </div>
    <DataTable v-else-if="orgStore.organization !== null && orgStore.organization.status === 'Approved' && currentStep === 1" :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
      <Column field="rdmk" :header="$t('RDMK')"></Column>
      <Column field="title" :header="$t('title')"></Column>
      <Column field="author" :header='$t("Author name")'></Column>
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
    <div v-if="currentStep === 2">
      <div class="block h-100 py-10 mb-10 text-center bg-red-50 rounded-md border-red-500 border" v-if="!stickerConstent">
          <p class="text-red-700">
            بانتقالكم الى الخطوة التالية هذا يعني بانك قمت بطباعة جميع الملصقات و تتعهد بإلصاقها على الطرود الخاصة بها حسب المدخلات من قبلكم و في حال مخالفة ذلك سيعرضعكم ذلك الى الاجراءات القانونية.
          </p>
        </div>
      <div class="p-6 bg-white rounded-lg shadow-md">
        <div class="flex items-center text-center">
          <div class="flex items-center justify-between w-20 border border-gray-100 px-2 py-3 rounded-md">
            <input 
              type="checkbox" 
              v-model="selectAll" 
              @change="toggleSelectAll" 
              class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <i class="pi pi-angle-down text-gray-500"></i>
          </div>
          <span class="text-xl font-semibold mx-4">Manifests</span>
        </div>
        <div class="h-96 overflow-y-auto space-y-2 rounded-md p-2 mb-4">
          <div 
            v-for="(manifest, index) in manifests.data.manifests" 
            :key="index" 
            class="flex items-center border-b border-gray-200 px-2 py-3 cursor-pointer"
            @click="toggleSelection(manifest.manifest_number)"
          >
            <!-- Check if manifest_location exists before rendering checkbox -->
            <input 
              v-if="!manifest.manifest_location" 
              type="checkbox" 
              :value="manifest.manifest_number" 
              v-model="selectedManifests"
              class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span class="ml-2 text-sm text-gray-800">{{ manifest.manifest_number }}</span>
            <span class="ml-2 text-sm text-gray-500">Quantity:
              <span class="bg-gray-200 p-1 rounded">{{ manifest.quantity }}</span>
            </span>
            <span 
              v-if="manifest.manifest_location" 
              :class="[
                'ml-2 px-2 py-1 text-xs font-semibold rounded',
                manifest.manifest_location === 'warehouse' ? 'bg-blue-100 text-blue-500 border ' : 
                manifest.manifest_location === 'pavilion' ? 'bg-gray-100 text-gray-500 border ' : 
                'bg-gray-500 text-white'  // Fallback color if location is neither
              ]"
            >
              {{ manifest.manifest_location }}
            </span>
          </div>
        </div>
      </div>
      <div class="mt-4 flex space-x-4 justify-end">
        <button 
          @click="sendToWarehouse" 
          :disabled="selectedManifests.length === 0" 
          class=" bg-green-300 text-green-900 py-2 px-4 rounded-md hover:bg-green-600 disabled:opacity-50"
        >
          Send to Warehouse
        </button>
        <button 
          @click="sendToPavilion" 
          :disabled="selectedManifests.length === 0" 
          class=" bg-gray-300 text-gray-900 py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          Send to Pavilion
        </button>
      </div>
    </div>
    <div v-else-if="currentStep === 3">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <div class="flex items-center">
          <div class="flex items-center justify-between w-20 border border-gray-200 px-2 py-3 rounded-md">
            <input 
              type="checkbox" 
              v-model="selectAll" 
              @change="toggleSelectAll" 
              class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <i class="pi pi-angle-down text-gray-500"></i>
          </div>
          <select v-model="selectedShipper" id="shipper" class="mx-2 block border border-gray-200 rounded py-2 focus:ring-gray-200 focus:border-gray-200">
            <option value="" disabled>Assign to shipper</option>
            <option v-for="shipper in shippers.data.shippers" :key="shipper.id" :value="shipper.id">
              {{ shipper.shipper_name }}
            </option>
          </select>
        </div>
          <div class="h-96 overflow-y-auto space-y-2 rounded-md p-2 my-4">
            <div 
              v-for="(manifest, index) in manifests.data.manifests" 
              :key="index" 
              class="flex items-center border-b border-gray-200 px-2 py-3 rounded-md cursor-pointer"
              @click="toggleSelection(manifest.manifest_number)"
            >
              <!-- Check if manifest_location exists before rendering checkbox -->
              <input 
                type="checkbox" 
                :value="manifest.manifest_number" 
                v-model="selectedManifests"
                class="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <span class="ml-2 text-sm text-gray-800">{{ manifest.manifest_number }}</span>
              <span class="ml-2 text-sm text-gray-500">Quantity:
                <span class="bg-gray-200 p-1 rounded">{{ manifest.quantity }}</span>
              </span>
              <span 
                v-if="manifest.manifest_location" 
                :class="[
                  'ml-2 px-2 py-1 text-xs font-semibold rounded',
                  manifest.manifest_location === 'warehouse' ? 'bg-blue-100 text-blue-500 border ' : 
                  manifest.manifest_location === 'pavilion' ? 'bg-gray-100 text-gray-500 border ' : 
                  'bg-gray-500 text-white'  // Fallback color if location is neither
                ]"
              >
                {{ manifest.manifest_location }}
              </span>
              <span 
                v-if="manifest.shipper" 
                :class="[
                  'ml-2 px-2 py-1 text-xs font-semibold rounded bg-orange-100 text-orange-500 border' // Fallback color if location is neither
                ]"
              >
                {{ manifest.shipper.shipper_name }}
              </span>
            </div>
          </div>
      </div>
      
      <div class="mt-4 flex justify-end space-x-4">
        <button 
          @click="assignToShipper" 
          :disabled="selectedManifests.length === 0 || !selectedShipper" 
          class=" bg-primary text-white py-2 px-4 rounded-md hover:bg-primary disabled:opacity-50"
        >
          Assign to Shipper
        </button>
      </div>
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
  <div v-if="showEditModal" class="modal">
    <form @submit.prevent="submitForm">
      <div class="modal-content h-3/4 overflow-hidden">
        <!-- Modal Header -->
        <div class="flex justify-between items-center px-4 py-2 border-b border-gray-200">
          <h3 class="text-lg font-semibold">{{ isComplete(editBook) ? 'Edit book' : 'Complete data' }}</h3>
          <button class="text-gray-500 hover:text-gray-700" @click="closeEditModal">&times;</button>
        </div>
          <!-- Modal Body -->
          <div class="modal-body h-4/5 overflow-auto p-4" style="max-height: 80vh;">
            <div class="mb-4">
              <label for="quantity" class="block text-sm font-medium text-gray-700">Total Quantity:</label>
              <Field 
                type="number" 
                v-model="editBook.quantity" 
                id="quantity" 
                name="quantity"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="quantity" class="text-red-500 text-sm" />
            </div>

            <div class="mb-4">
              <label for="price" class="block text-sm font-medium text-gray-700">Price:</label>
              <Field 
                type="number" 
                v-model="editBook.price" 
                id="price" 
                name="price"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="price" class="text-red-500 text-sm" />
            </div>

            <div class="mb-4">
              <label for="barcode" class="block text-sm font-medium text-gray-700">Barcode:</label>
              <Field 
                type="text" 
                v-model="editBook.barcode" 
                id="barcode" 
                name="barcode"
                class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage name="barcode" class="text-red-500 text-sm" />
            </div>
            
            <div class="b-4 text-start">
              <div class="mb-4 border-t py-2" v-for="(manifest, index) in editBook.manifests" :key="index">
                <label :for="'package-' + index" class="block text-sm font-bold underline text-gray-700">Package {{ index + 1 }}:</label>
                <div class="flex justify-between">
                  <div class="block w-5/12">
                    <label :for="'package-' + index" class="block text-sm font-medium text-gray-700">Number</label>
                    <Field 
                      type="text" 
                      v-model="manifest.manifest_number" 
                      :id="'package-' + index"
                      :name="'manifests.' + index + '.manifest_number'"
                      class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage :name="'manifests.' + index + '.manifest_number'" class="text-red-500 text-sm" />
                  </div>
                  <div class="block w-5/12">
                    <label :for="'quantity-' + index" class="block text-sm font-medium text-gray-700">Quantity</label>
                    <Field 
                      type="number" 
                      v-model="manifest.quantity" 
                      :id="'quantity-' + index" 
                      :name="'manifests.' + index + '.quantity'"
                      class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage :name="'manifests.' + index + '.quantity'" class="text-red-500 text-sm" />
                  </div>
                </div>
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
        <div class="px-4 py-3 border-t border-gray-200 block">
          <p class="text-red-500 text-sm mb-0" v-if="editBookError">{{ editBookError }}</p>
          <div class="flex justify-end space-x-2">
            <button 
              class="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-md hover:bg-gray-600"
              @click="closeEditModal"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useGetApi } from '../../composables/useApi';
import { useOrganizationStore } from '../../store/auth';
import { onMounted, ref, defineComponent } from 'vue';
import { Field, Form, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';

const { t, locale } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const orgStore = useOrganizationStore();
const router = useRouter();

const menu = ref();
const selectedId = ref();
const currentStep = ref(1);
const selectedManifests = ref([]);
const selectedShipper = ref('');
const selectAll = ref(false);
const showConfirmation = ref(false);
const currentAction = ref('');
const stickerConstent = ref(false)

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);

let showEditModal = ref(false);
let showModal2 = ref(false);
let showUpload = ref(false);
let bookFile = ref(null);
let fileError = ref('');
let editBookError = ref('');
const editBook = ref({
  quantity: 0,
  price: 0,
  barcode: '',
  manifests: [{ manifest_number: '', quantity: 1 }] // Start with one empty package number
});

const addNewInput = () => {
  editBook.value.manifests.push({ manifest_number: '', quantity: 0 });
};

const removeInput = (index) => {
  editBook.value.manifests.splice(index, 1);
};

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

await orgStore.fetchOrganization();

const { pending, data, refresh } = useGetApi(`get_books_by_organization/${orgStore.organization?.id}?status=1`, {
  limit: perPage,
  page: currentPage
});

const { data: manifests, refresh: refreshManifests } = useGetApi(`get_manifests_by_organization/${orgStore.organization?.id}`);

const { data: shippers, refresh: refreshShippers } = useGetApi(`get_shippers`);

onMounted(() => {
  refresh()
})

const isComplete = (item) => {
  return item.price && item.quantity && item.barcode && item.manifests.length > 0;
}
// Computed properties to determine button states
const isButton1Enabled = computed(() => 
  data.value?.data?.meta?.data_completed !== undefined 
    ? !data.value.data.meta.data_completed 
    : false // or true, depending on your initial requirement
);

const isButton2Enabled = computed(() => 
  data.value?.data?.meta?.data_completed === true && 
  manifests.value?.data?.meta?.locations_completed !== undefined 
    ? !manifests.value.data.meta.locations_completed 
    : false // or true, depending on your initial requirement
);

const isButton3Enabled = computed(() => 
  manifests.value?.data?.meta?.locations_completed === true && 
  manifests.value?.data?.meta?.shippers_completed !== undefined 
    ? !manifests.value.data.meta.shippers_completed 
    : false // or true, depending on your initial requirement
);
// Method to set the initial step based on the button states
const setInitialStep = () => {
  if (isButton1Enabled.value) {
    currentStep.value = 1;
  } else if (isButton2Enabled.value) {
    currentStep.value = 2;
  } else if (isButton3Enabled.value) {
    currentStep.value = 3;
  } else {
    currentStep.value = null; // or a default step if necessary
    router.push(`/${locale.value}/shipment`);
  }
};

// Watch for changes in the data or manifests and set the initial step accordingly
watch(
  () => [data.value, manifests.value, orgStore.organization?.id], // Watch both data and manifests
  async (newValues) => {
    const [newData, newManifests] = newValues;
    
    // Check if the necessary data is available
    if (newData?.data?.meta && newManifests?.data?.meta) {
      setInitialStep();
    }
  },
  { immediate: true } // Run the watcher immediately to set the initial step on load
);

const openEditModal = (book) => {
  editBook.value = {
    ...book,
    manifests: Array.isArray(book.manifests) && book.manifests.length > 0 ? book.manifests : [{ manifest_number: '', quantity: 1 }]
  };
  showEditModal.value = true
}

// Validation schema
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    quantity: yup.number().required('Total Quantity is required').positive('Total Quantity must be positive'),
    price: yup.number().required('Price is required').positive('Price must be positive'),
    barcode: yup.string().required('Barcode is required'),
    manifests: yup.array().of(
      yup.object().shape({
        manifest_number: yup.string().required('Manifest number is required'),
        quantity: yup.number().required('Manifest quantity is required').positive('Manifest quantity must be positive'),
      })
    ).required('At least one manifest is required').min(1, 'At least one manifest is required'),
  }),
});

// Form submission handler
const submitForm = handleSubmit(values => {
  const token = localStorage.getItem('authToken');
  const { $axios } = useNuxtApp();

  // Assuming `manifests` is an array of manifest objects with a `quantity` field
  const totalManifestQuantity = editBook.value.manifests.reduce((total, manifest) => {
    const quantity = manifest.quantity; // Get the quantity
    return total + (typeof quantity === 'number' && quantity > 0 ? quantity : 0); // Add only valid quantities
  }, 0);

  if (totalManifestQuantity !== editBook.value.quantity) {
    console.error('Error: Total manifest quantities do not match the book quantity.');
    editBookError.value = 'Total manifest quantities do not match the book quantity.'
    return; // Stop the function execution if quantities do not match
  }
  $axios.post(`books_update_quantity/${editBook.value.id}`, editBook.value, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      console.log('Book updated successfully');
      toast.add({ severity: 'success', summary: t('common.Successful'), detail: t('common.UpdatedSuccessfully'), life: 3000 });
      closeEditModal();
      refresh()
    })
    .catch(error => {
      console.error('Error updating book:', error);
      toast.add({ severity: 'error', summary: t('common.error'), detail: t('common.Error'), life: 3000 });
    });
});

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

// Button click handlers
const handleButton1Click = () => {
  // Logic for Step 1
  currentStep.value = 1
};

const handleButton2Click = () => {
  // Logic for Step 2
  currentStep.value = 2
};

const handleButton3Click = () => {
  // Logic for Step 3
  currentStep.value = 3
};

const toggleSelection = (manifestNumber) => {
  const index = selectedManifests.value.indexOf(manifestNumber);
  if (index === -1) {
    selectedManifests.value.push(manifestNumber);
  } else {
    selectedManifests.value.splice(index, 1);
  }
};

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedManifests.value = manifests.value.data.manifests.map(manifest => manifest.manifest_number);
  } else {
    selectedManifests.value = [];
  }
};

const sendToWarehouse = () => {
  currentAction.value = 'warehouse';
  sendData()
};

const sendToPavilion = () => {
  currentAction.value = 'pavilion';
  sendData()
};

const handleConfirm = () => {
  // Process the selected manifests for the specified action
  // Reset selection after confirmation
  selectedManifests.value = [];
  showConfirmation.value = false;
};

// Form submission handler
const sendData = async () => {
  const token = localStorage.getItem('authToken');
  const { $axios } = useNuxtApp();

  $axios.post(`update_manifests_locations/${orgStore.organization?.id}`, {
      manifests: selectedManifests.value,
      action: currentAction.value
    },
    {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      toast.add({ severity: 'success', summary: t('common.Successful'), detail: t('common.UpdatedSuccessfully'), life: 3000 });
      refresh()
      refreshManifests()
      selectedManifests.value = []
    })
    .catch(error => {
      console.error('Error updating book:', error);
      toast.add({ severity: 'error', summary: t('common.error'), detail: t('common.Error'), life: 3000 });
    });
}

// Function to assign the selected shipper to the selected manifests
const assignToShipper = async () => {
  const token = localStorage.getItem('authToken');
  const { $axios } = useNuxtApp();

  $axios.post(`update_manifests_shipper/${orgStore.organization?.id}`, {
      manifests: selectedManifests.value,
      shipper_id: selectedShipper.value
    },
    {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      toast.add({ severity: 'success', summary: t('common.Successful'), detail: t('common.UpdatedSuccessfully'), life: 3000 });
      refresh()
      refreshManifests()
      refreshShippers()
      selectedManifests.value = []
      selectedShipper.value = ''
    })
    .catch(error => {
      console.error('Error updating book:', error);
      toast.add({ severity: 'error', summary: t('common.error'), detail: t('common.Error'), life: 3000 });
    });
};

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
  width: 100%;
  min-width: 500px;
  text-align: start;
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
