<template>
  <label :for="name">{{ label }}</label>
  <Field as="InputText" v-model="model" :name="name" :placeholder="placeholder || $t('enterForm', { name: label })" :rules="rules" :invalid="errors[name]" />
  <ErrorMessage :name="name" class="text-red-500 text-sm" />
</template>

<script setup>
const model = defineModel();

defineProps({
  name: {},
  label: {},
  rules: {},
  errors: {},
  placeholder: {}
});
</script>
