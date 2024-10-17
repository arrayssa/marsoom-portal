<script setup>
  const model = defineModel();

  defineProps({
    name: {
      
    },
    label: {
      
    },
    rules: {
      
    },
    errors: {
      
    },
    placeholder: {

    }
    
})

</script>

<template>
  <label :for="name" class="text-xl font-medium text-label mb-4">{{ label }}</label>
  <Field as="InputText" v-model="model" 
    :name="name" 
    :label="label"
    :placeholder="placeholder || $t('common.enterForm', {name: label})" 
    :rules="rules" 
    :invalid="errors?.[name]"/>  
  <ErrorMessage :name="name" class="text-red-500 mt-2"/>
</template>