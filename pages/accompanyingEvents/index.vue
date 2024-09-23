<template>
  <div class="flex align-items justify-content-between mt-5 mb-3">
    <h2 class="text-xl">{{ $t('accompanyingEvents') }}</h2>
    <LocLink :to="'/accompanyingEvents/add-edit'">
      <Button :label="$t('addNew')" icon="pi pi-plus" class="text-base" />
    </LocLink>
  </div>
  <DataTable :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" @row-click="onRowClick" tableStyle="min-width: 50rem">
    <Column field="id" :header="$t('id')"></Column>
    <Column field="email" :header="$t('email')"></Column>
    <Column field="street_address" :header="$t('streetAddress')"></Column>
    <Column field="phone1" :header="$t('phone')"></Column>
    <Column field="event_start_date" :header="$t('date')"></Column>
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
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const localePath = useLocalePath();

const menu = ref();
const selectedId = ref();

let perPage = ref(10);
let currentPage = ref(1);

const handlePageChange = (event) => {
  currentPage.value = event.page + 1;
};

const { pending, data, refresh } = useGetApi(`accompanying-event`, {
  limit: perPage,
  page: currentPage
});

const actionsMenu = computed(() => [
  {
    type: 'edit',
    label: t('edit'),
    icon: 'pi pi-pencil',
    command: () => {
      navigateTo(localePath(`/accompanyingEvents/add-edit/${selectedId.value}`));
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

const onRowClick = (event) => {
  navigateTo(localePath(`/accompanyingEvents/details/${event.data.id}`));
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
        await useDeleteApi(`accompanying-event/${selectedId.value}`);
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
