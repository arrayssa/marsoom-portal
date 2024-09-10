<template>
  <label :for="inputId">{{ label }}</label>
  <Field :name="inputId" :modelValue="modelValue" :rules="rules">
    <Checkbox :modelValue="modelValue" :name="name" :inputId="inputId" @update:modelValue="updateValue" :binary="binary" :value="value" :invalid="errors[name]" />
    <ErrorMessage :name="inputId" class="text-red-500 text-sm" />
  </Field>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);

defineProps({
  modelValue: {},
  name: {},
  label: {},
  rules: {},
  errors: {},
  inputId: {},
  binary: {
    type: Boolean,
    default: true
  },
  value: {
    type: Boolean,
    default: true
  }
});

function updateValue(value) {
  emit('update:modelValue', value);
}
</script>
