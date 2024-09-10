<template>
  <label :for="name">{{ label }}</label>
  <Field as="Textarea" v-model="model" :name="name" :rows="rows" :placeholder="placeholder || $t('enterForm', { name: label })" :rules="rules" :invalid="errors[name]" />
  <ErrorMessage :name="name" class="text-red-500 text-sm" />
</template>

<script setup>
const model = defineModel();

defineProps({
  name: {},
  label: {},
  rules: {},
  errors: {},
  placeholder: {},
  rows: {
    type: Number,
    default: 5
  }
});
</script>
