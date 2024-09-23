<template>
  <div class="flex align-items justify-content-between mt-5 mb-3">
    <h2 class="text-xl">{{ $t('trucks') }}</h2>
    <Button :label="$t('addNew')" icon="pi pi-plus" class="text-base" @click="openModal" />
  </div>
  <DataTable :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
    <Column field="id" :header="$t('id')"></Column>
    <Column field="actions" :header="$t('action')" style="width: 10rem">
      <template #body="slotProps">
        <div class="flex justify-center">
          <Button type="button" text class="text-blue3" icon="pi pi-ellipsis-h" @click="toggle($event, slotProps.data.id)" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" :model="actionsMenu" class="bg-white" id="overlay_menu" :popup="true" />
        </div>
      </template>
    </Column>
  </DataTable>
  <addEditTruck v-if="visible" :id="selectedId" @close-modal="closeModal" @submit="refresh" />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
const addEditTruck = defineAsyncComponent(() => import('./add-edit-truck.vue'));

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();

const menu = ref();
const selectedId = ref();

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const { pending, data, refresh } = useGetApi(`trucks`, {
  limit: perPage,
  page: currentPage
});

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
    type: 'delete',
    label: t('delete'),
    icon: 'pi pi-trash',
    command: () => {
      deleteConfirm();
    }
  }
]);

const toggle = (event, id) => {
  menu.value.toggle(event);
  selectedId.value = id;
};

const openModal = () => {
  selectedId.value = null;
  visible.value = true;
};

const closeModal = () => {
  visible.value = false;
  selectedId.value = null;
};

const deleteConfirm = () => {
  confirm.require({
    message: t('deleteConfirm'),
    header: t('delete'),
    rejectClass: 'p-button-text p-button-text bg-primary',
    acceptClass: 'p-button-danger p-button-text bg-red-500 text-white',
    acceptLabel: t('yes'),
    rejectLabel: t('no'),
    accept: async () => {
      try {
        await useDeleteApi(`trucks/${selectedId.value}`);
        refresh();
        toast.add({ severity: 'info', summary: t('confirmed'), detail: t('doneDeleted'), life: 3000 });
      } catch (error) {
        toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
      }
    },
    reject: () => {}
  });
};
</script>

<style></style>
