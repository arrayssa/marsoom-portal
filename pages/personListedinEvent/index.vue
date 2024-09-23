<template>
  <div class="flex align-items justify-content-between mt-5 mb-3">
    <h2 class="text-xl">{{ $t('personListedinEvent') }}</h2>
    <Button :label="$t('addNew')" icon="pi pi-plus" class="text-base" @click="openModal" />
  </div>
  <DataTable :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" @row-click="onRowClick" tableStyle="min-width: 50rem">
    <Column field="id" :header="$t('id')"></Column>
    <Column field="account_number" :header="$t('account_number')"></Column>
    <Column field="vip" :header="$t('vip')"></Column>
    <Column field="role" :header="$t('role')"></Column>
    <Column field="start_date" :header="$t('startingDate')"></Column>
    <Column field="end_date" :header="$t('endingDate')"></Column>
    <Column field="acceptability" :header="$t('acceptability')">
      <template #body="slotProps">
        <Badge v-if="slotProps.data.acceptability && slotProps.data.acceptability != '0'" value="Yes"></Badge>
        <Badge v-else value="No" severity="danger"></Badge>
      </template>
    </Column>
    <Column field="revision" :header="$t('revision')">
      <template #body="slotProps">
        <Badge v-if="slotProps.data.revision && slotProps.data.revision != '0'" value="Yes"></Badge>
        <Badge v-else value="No" severity="danger"></Badge>
      </template>
    </Column>
    <Column field="actions" :header="$t('action')" style="width: 10rem">
      <template #body="slotProps">
        <div class="flex justify-center">
          <Button type="button" text class="text-blue3" icon="pi pi-ellipsis-h" @click="toggle($event, slotProps.data.id)" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" :model="actionsMenu" class="bg-white" id="overlay_menu" :popup="true" />
        </div>
      </template>
    </Column>
  </DataTable>
  <addEditPersonListedinEvent v-if="visible" :id="selectedId" @close-modal="closeModal" @submit="refresh" />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
const addEditPersonListedinEvent = defineAsyncComponent(() => import('./add-edit-personListedinEvent.vue'));

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const localePath = useLocalePath();

const menu = ref();
const selectedId = ref();

let visible = ref(false);
let perPage = ref(10);
let currentPage = ref(1);

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const { pending, data, refresh } = useGetApi(`event-persons`, {
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

const onRowClick = (event) => {
  navigateTo(localePath(`/personListedinEvent/details/${event.data.id}`));
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
        await useDeleteApi(`event-persons/${selectedId.value}`);
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
