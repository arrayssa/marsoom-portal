<template>
  <Dialog :visible="true" @update:visible="closeDetilsModal" modal :header="$t('invoiceDetails')" :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center" />
    <div class="grid">
      <div class="col-12"></div>
    </div>
  </Dialog>
</template>

<script setup>
const emit = defineEmits(['close-details-modal', 'submit']);
const closeDetilsModal = () => {
  emit('close-details-modal');
};

const { t } = useI18n();

const props = defineProps({
  visibleDetails: {
    type: Boolean,
    default: false
  },
  id: {
    default: ''
  }
});

const { pending, execute } = useGetApi(
  `invoices/${props.id}`,
  {},
  {
    immediate: false
  }
);

onMounted(() => {
  if (props.id) {
    execute();
  }
});
</script>
