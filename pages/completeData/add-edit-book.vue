<template>
  <Dialog :visible="true" @update:visible="closeModal" modal
    :header="id ? $t('editForm', { name: $t('book') }) : $t('addNewForm.feminine', { name: $t('books') })"
    :style="{ width: '50rem' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <ProgressSpinner v-if="!props.book" class="flex justify-content-center" />
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="flex justify-between mb-8 gap-9">

        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="props.book.quantity" :name="'quantity'" :label="$t('quantity')" :errors="errors"
            :rules="'required'" />
        </div>
        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="props.book.price" :name="'price'" :label="$t('price')" :errors="errors"
            :rules="'required'" />
        </div>
      </div>
      <div class="flex justify-between mb-8 gap-9">

        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="props.book.barcode" :name="'barcode'" :label="$t('barcode')" :errors="errors"
            :rules="'required'" />
        </div>
      </div>
      
      <div class="flex justify-center">
        <Button type="button" :loading="submiting" class="bg-primary w-9/12 h-54 font-normal text-xl mt-4"
          :label="$t('common.add')" />
      </div>
      <div class="flex justify-between mb-8 gap-9" v-for="(package_number, index) in packages" :key="index">
        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="package_number.number" :name="'package_number'" :label="$t('Package Number')" :errors="errors"
            :rules="'required'" />
        </div>
      </div>

      <div class="flex justify-center">
        <Button type="submit" :loading="submiting" class="bg-primary w-9/12 h-54 font-normal text-xl mt-4"
          :label="props.book ? $t('common.edit') : $t('common.create')" />
      </div>
    </Form>
  </Dialog>
</template>

<script setup>
const emit = defineEmits(['close-modal', 'submit']);
const closeModal = () => {
  emit('close-modal');
};

let submiting = ref(false);
const toast = useToast();
const { t } = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  book: {
    default: ''
  }
});

let bookForm = ref({});
let packages = ref([])

const onSubmit = async (value) => {
  submiting.value = true;
  //console.log(bookForm.value.issue_date);
  value.issue_date = bookForm.value.issue_date
  try {
    if (props.id) {
      await use$Fetch(`books/${props.id}`, { method: 'PUT', body: value })

      closeModal();
      emit('submit');
    } else {
      await use$Fetch(`books`, { method: 'POST', body: value })

      // await usePostApi('books', value);
      closeModal();
      emit('submit');
    }
    toast.add({
      severity: 'success',
      summary: t('Successful'),
      detail: props.id ? t('UpdatedSuccessfully') : t('CreatedSuccessfully'),
      life: 3000
    });
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: error, life: 3000 });
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
