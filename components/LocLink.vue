<template>
  <NuxtLink :to="localePath(to)"><slot /></NuxtLink>
</template>

<script setup>
defineProps(['to']);
const localePath = useLocalePath();
</script>
