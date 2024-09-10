<template>
  <div class="">
    <div class="flex justify-between items-center mb-10">
      <p class="font-medium text-blue10 text-xl capitalize">{{ $t('Pending Books') }}</p>
      <Button :label="$t('common.addNew')" icon="pi pi-plus" class="bg-primary text-base h-42" @click="visible = true; selectedId = ''"/>
    </div>
  <DataTable :loading="pending" :value="data?.data?.rows" lazy paginator :totalRecords="data?.data?.meta.total" :rows="perPage" @page="handlePageChange" tableStyle="min-width: 50rem">
    <Column field="rdmk" :header="$t('RDMK')"></Column>
    <Column field="title" :header="$t('title')"></Column>
    <Column field="author" :header='$t("Writer name")'></Column>
    <Column field="author_nationality" :header='$t("Nationality")'></Column>
    <Column field="publisher_name" :header='$t("Publishing")'></Column>
    <Column field="book_language" :header='$t("book_language")'></Column>
<!--    <Column field="countries" :header='$t("country")'></Column>-->
    <Column field="issue_date" :header='$t("issue_date")'></Column>

<!--    <Column :field="'date'" :header="$t('Issue Date')">-->
<!--      <template #body="slotProps">-->
<!--        {{ $formatDate(slotProps.data.issue_date) }}-->
<!--      </template>-->
<!--    </Column>-->
    <Column field="actions" :header="$t('action')" style="width: 10rem">
      <template #body="slotProps">
        <div class="flex justify-center">

          <Button type="button" text class="text-blue3" icon="pi pi-ellipsis-h" @click="toggle($event, slotProps.data.id)" aria-haspopup="true" aria-controls="overlay_menu" />
          <Menu ref="menu" :model="actionsMenu" class="bg-white" id="overlay_menu" :popup="true" />
        </div>
      </template>
    </Column>
  </DataTable>
  </div>
  <Form v-if="visible" @close-modal="closeModal" :id="selectedId" @submit="refresh"/>

  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
// const addEditInterest = defineAsyncComponent(() => import('./add-edit-book.vue'));
import Form from './add-edit-book.vue'

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

const { pending, data, refresh } = useApi(`new_book`, {
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
</script>

<style></style>
