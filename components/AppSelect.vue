<template>
  <label :for="name">{{ label }}</label>
  <Field :name="name" :modelValue="modelValue" :rules="rules">
    <Dropdown :modelValue="modelValue" :name="name" @update:modelValue="updateValue" :options="options" :optionLabel="optionLabel" :optionValue="optionValue" :placeholder="$t('select')" :invalid="errors[name]" />
    <ErrorMessage :name="name" class="text-red-500 text-sm" />
  </Field>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {},
  options: {},
  name: {},
  label: {},
  rules: {},
  errors: {},
  optionLabel: {},
  optionValue: {}
});

function updateValue(value) {
  emit('update:modelValue', value);
}
</script>
