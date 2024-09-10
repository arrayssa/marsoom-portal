<template>
  <Dialog
      :visible="true"
      @update:visible="closeModal"
      modal
      :header="id ? $t('editForm', { name: $t('book') }) : $t('addNewForm.feminine', { name: $t('books') })"
      :style="{ width: '50rem' }"
      :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ProgressSpinner v-if="pending && props.id" class="flex justify-content-center"/>
    <Form @submit="onSubmit" v-slot:default="{ errors }" v-else>
      <div class="flex justify-between mb-8 gap-9">

        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="bookForm.rdmk" :name="'rdmk'" :label="$t('RDMK')" :errors="errors"
                            :rules="'required'"/>
        </div>
      <div class="flex flex-col basis-2/4">
        <CustomeTextInput v-model="bookForm.title" :name="'title'" :label="$t('title')" :errors="errors"
                          :rules="'required'"/>
      </div>
      </div>
      <div class="flex justify-between mb-8 gap-9">

      <div class="flex flex-col basis-2/4">
        <CustomeTextInput v-model="bookForm.author" :name="'author'" :label="$t('Author')" :errors="errors"
                          :rules="'required'"/>
      </div>



        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="bookForm.author_nationality" :name="'author_nationality'"
                            :label="$t('Author Nationality')" :errors="errors" :rules="'required'"/>
        </div>
      </div>

        <div class="flex justify-between mb-8 gap-9">


          <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="bookForm.book_language" :name="'book_language'" :label="$t('Book Language')"
                            :errors="errors" :rules="'required'"/>
        </div>



          <div class="flex flex-col basis-2/4">
          <!--            <AppInput v-model="bookForm.issue_date" :name="'issue_date'" :label="$t('Issue Date')" :errors="errors"-->
          <!--                      :rules="'required'"/>-->
          <label for="issue_date" style="    margin-bottom: 17px;">{{ $t('Issue Date') }}</label>
          <!--            <Calendar v-model="bookForm.issue_date"  inputId="date1" dateFormat="dd/mm/yy" :name="'issue_date'" :label="$t('Issue Date')" :errors="errors" :rules="'required'" />-->
          <!--            <Calendar inputId="date1" v-model="eventForm.start_date" dateFormat="dd/mm/yy" :errors="errors" :rules="'required'" />-->
          <Calendar inputId="date1" v-model="bookForm.issue_date" dateFormat="dd/mm/yy" :errors="errors"
                    :rules="'required'"/>

        </div>
      </div>

      <div class="flex justify-between mb-8 gap-9">

        <div class="flex flex-col basis-2/4">
          <CustomeTextInput v-model="bookForm.publisher_name" :name="'publisher_name'" :label="$t('Publisher Name')"
                            :errors="errors"
                            :rules="'required'"/>
        </div>
      </div>

      <div class="flex justify-center">
        <Button type="submit" :loading="submiting" class="bg-primary w-9/12 h-54 font-normal text-xl mt-4" :label=" props.id ? $t('common.edit') : $t('common.create')" />
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
const {t} = useI18n();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  id: {
    default: ''
  }
});

let bookForm = ref({
  rdmk: '',

});

const {pending, execute} = useApi(`books/${props.id}`, {
  immediate: false,
  transform: (res) => {
    bookForm.value = res.data
  }
})

onMounted(() => {
  if (props.id) {
    execute();
  }
});

const onSubmit = async (value) => {
  submiting.value = true;
  //console.log(bookForm.value.issue_date);
  value.issue_date = bookForm.value.issue_date
  try {
    if (props.id) {
      await use$Fetch(`books/${props.id}`, {method: 'PUT', body: value})

      closeModal();
      emit('submit');
    } else {
      await use$Fetch(`books`, {method: 'POST', body: value})

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
    toast.add({severity: 'error', summary: 'Error Message', detail: error, life: 3000});
  } finally {
    submiting.value = false;
  }
};
</script>

<style></style>
