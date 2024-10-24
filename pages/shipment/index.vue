<template>
  <div class="">
    <div class="flex justify-between items-center mb-10">
      <p class="font-medium text-blue10 text-xl capitalize">{{ $t('Shipment') }}</p>
    </div>
    <DataTable v-if="orgStore.organization !== null && orgStore.orgMeta.data_completed" stripedRows v-model:expandedRows="expandedRows" dataKey="id" :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
      
      <Column expander style="width: 5rem"></Column>
      <Column field="manifest_number" :header="$t('Manifest Number')" sortable></Column>
      <Column field="quantity" :header="$t('Quantity')" sortable></Column>
      <Column field="shipper" :header='$t("Shipper")'>
        <template #body="slotProps">
          <span>
            {{ slotProps.data.shipper.shipper_name }}
          </span>
        </template>
      </Column>
      <Column field="manifest_location" :header='$t("Warehouse/Pavilion")'>
        <template #body="slotProps">
          <span
            :class="{
              'bg-green-100 text-green-500 border border-green-500 px-2 py-1 rounded': slotProps.data.manifest_location === 'warehouse',
              'bg-orange-100 text-orange-500 border border-orange-500 px-2 py-1 rounded': slotProps.data.manifest_location === 'pavilion',
            }"
          >
            {{ slotProps.data.manifest_location }}
          </span>
        </template>
      </Column>
      
      <!-- Row expansion content -->
      <template #expansion="slotProps">
        <div class="p-4">
            <h5>Books for Parcel {{ slotProps.data.manifest_number }}</h5>
            <DataTable :value="slotProps.data.books">
                <!-- <Column field="id" header="Id" sortable></Column> -->
                <Column field="title" header="Book Title" sortable></Column>
                <Column field="pivot_quantity" header="Quantity" sortable></Column>
                <Column field="price" header="Price" sortable></Column>
            </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script setup>
// const addEditInterest = defineAsyncComponent(() => import('./add-edit-book.vue'));
import { useGetApi } from '../../composables/useApi';
import { useOrganizationStore } from '../../store/auth';
import { onMounted, ref } from 'vue';

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const orgStore = useOrganizationStore();

const menu = ref();

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);
let selectedLocation = ref('')
let expandedRows = ref({});

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

await orgStore.fetchOrganization();

const { pending, data, refresh } = useGetApi(`get_manifests_by_organization/${orgStore.organization?.id}`, {
  location: selectedLocation,
  page: currentPage,
  paginate: 1
});

onMounted(async () => {
  refresh()
})
watch(
  () => orgStore.organization?.id, // Watch only the organization ID
  async (newOrgId) => {
    
    if (newOrgId) {
      await refresh()
    }
  },
  { immediate: true } // Run the watcher immediately on load
);
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
